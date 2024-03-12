import loginImg from '../img/login.png'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Login() {
    
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [formData, setFormData] = useState({
        // inisialisasi state untuk menyimpan data form
        username: '',
        pass: '',
      });

    const check_empty = () => {
        if (formData.username === ""){
            return false;
        }
        if (formData.pass === ""){
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        // mengubah state saat nilai input berubah
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendData = ( loginData ) => {

        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
            },
            body: JSON.stringify({ 
                "username" : loginData.username,
                "password" : loginData.pass,
             }) 
        };
        
        fetch('http://localhost:3001/Login', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.msg === "Success"){
                setCookie('token',data.accessToken)
                setCookie('role',data.role)
                setCookie('isLogin', true)
                navigate('/Home');
            }else{
                alert("Password atau Username tidak benar");
            }
        });
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const checkFill = check_empty();
        if (checkFill){
            // console.log(formData);
            sendData(formData)
        }else{
            alert("Form tidak boleh kosong");
        } 
    }

    console.log("cookies : ", cookies.isLogin);
    return (
        <div className="mx-4 mt-32 font-poppins bg-white shadow-2xl rounded-xl overflow-hidden md:flex md:container md:mx-auto sm:max-w-3xl lg:max-w-4xl">
            <div className="bagian-kiri px-3 box-border container">
                <div className='form'>
                    <div className='title-content container mx-auto pb-2.5 md:pb-16 lg:pb-24 ml-2'>
                        <p className='text-3xl pt-3 mb-2'>Welcome to Monitoring Site</p>
                        <p className='text-sm mb-3'>Tell us who you are...</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label className='text-sm block ml-1'>
                            <input
                                className='bg-[#F6F6F9] text-xs px-3 md:mx-0 lg:mx-auto mx-auto py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-80 '
                                name="username"
                                type="text" 
                                placeholder='Username'
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </label>
                        <label className='text-sm block ml-1'>
                            <input
                                className='bg-[#F6F6F9] md:mb-20 text-xs px-3 md:mx-0 lg:mx-auto mx-auto py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-80'
                                name="pass"
                                type="password" 
                                placeholder='Password'
                                value={formData.pass}
                                onChange={handleChange}
                            />
                        </label>
                        <button className="block mb-8 bg-[#418EC6] hover:bg-sky-500 transition duration-300 px-3 py-2 rounded-lg mx-auto my-2 text-white text-xs md:text-sm md:w-24" type="submit">Login</button>
                    </form>
                </div>
            </div>
            <div className="bagian-kanan bg-[#FFA1A1] hidden md:block min-w-96">
                <img src={loginImg} alt='Gambar yang melambangkan monitoring' className='h-auto items-center object-cover w-full'></img>
                <div className='version place-items-center'><span className='text-white ml-2 text-xs'>ver. 1.0.0</span></div>
            </div>
        </div>
        
    );
}

export default Login;