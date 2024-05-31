import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AutoLogout = ({ timeout }) => { // default timeout 5 menit
  const [lastActivity, setLastActivity] = useState(Date.now());
  const lastActivityRef = useRef(lastActivity); // Menggunakan useRef
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const logout = () => {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'POST', // Metode HTTP
        headers: {
          'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan,
          'token': cookies["token"],
        }
      };

      fetch(backendUrl + 'logout', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.msg === "Success") {
            resolve(true);
          } else {
            reject(data);
          }
        });
    })
  }

  const handleLogout = async () => {
    localStorage.setItem('lastActivity', null);
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

  const validate = () => {
    if(!cookies['isLogin']){
      return true;
    }else{
      return false;
    }
  }

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'touchstart'];

    const resetTimer = () => {
      const currentTime = Date.now();
      setLastActivity(currentTime);
      lastActivityRef.current = currentTime; // Update useRef
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
        lastActivityRef.current = parseInt(storedLastActivity); // Update useRef
      }
    }

    const interval = setInterval(() => {
      if (Date.now() - lastActivityRef.current > timeout) {
        if(cookies['isLogin']){
          handleLogout();
        }
      }
    }, 1000);

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearInterval(interval);
    };
  }, [timeout]);

  return (
    <div>
      <ToastContainer />
      {/* Komponen lainnya */}
    </div>
  );
};

export default AutoLogout;
