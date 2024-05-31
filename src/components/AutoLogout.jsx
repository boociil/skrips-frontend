import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AutoLogout = ({ timeout = 300000 }) => { // default timeout 5 menit
  const [lastActivity, setLastActivity] = useState(Date.now());
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const logout = () => {
    return new Promise((resolve,reject) => {
        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan,
                'token' : cookies["token"],
            }
        };
        
            fetch(backendUrl + 'logout', requestOptions)
            .then(response => response.json())
            .then(data => {

                if (data.msg === "Success"){
                    resolve(true);
                }else{
                    reject(data.msg);
                }
            });
        })
    }

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'touchstart'];
    
    const resetTimer = () => {
      const currentTime = Date.now();
      setLastActivity(currentTime);
      localStorage.setItem('lastActivity', currentTime);
    };
    
    events.forEach(event => window.addEventListener(event, resetTimer));
    
    const storedLastActivity = localStorage.getItem('lastActivity');
    if (storedLastActivity) {
      const timeSinceLastActivity = Date.now() - storedLastActivity;
      if (timeSinceLastActivity > timeout) {
        handleLogout();
      } else {
        setLastActivity(parseInt(storedLastActivity));
      }
    }

    const interval = setInterval(() => {
      if (Date.now() - lastActivity > timeout) {
        handleLogout();
      }
    }, 1000);
    
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearInterval(interval);
    };
  }, [lastActivity, timeout]);
  
  const handleLogout = async () => {
    await logout()
        .then(success => {
            removeCookie('user');
            removeCookie('role');
            removeCookie('token');
            removeCookie('isLogin');
            localStorage.removeItem('lastActivity');
            navigate('/');
        })
        .catch(error => {
            toast.error("" + error, {
                position: "bottom-right",
                hideProgressBar: true,
                autoClose: 1000,
                closeOnClick: true,
                theme: "light",
                transition: Bounce,
                pauseOnHover: false,
            })
        })
  };

  return (
    <div>
      {/* Komponen lainnya */}
    </div>
  );
};

export default AutoLogout;
