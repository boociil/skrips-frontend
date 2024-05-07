import { Outlet,  NavLink, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function TopNavAdmin(props = {active : 'home'}) {


    const [openStatus, setOpenStatus] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [ showOption, setShowOption ] = useState(false);

    
    const logout = () => {
        
        return new Promise((resolve,reject) => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan,
                    'token' : cookies["token"],
                }
            };
            
            fetch('http://localhost:3001/logout', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.msg === "Success"){
                    resolve(true);
                }else{
                    reject(data.msg);
                }
            });
        })
    }

    const onShowClick = () => {
        if (showOption){
            setShowOption(false);
        }else{
            setShowOption(true);
        }
        
    }

    const closeSideMenu = () => {
        setOpenStatus(true)
        const burger = document.querySelector('#burger')
        burger.click();
        const menu = document.querySelector('.the-menu');
        menu.classList.remove('translate-x-full')
    }

    const handleChange = (e) => {
        if (openStatus === true){
            // Menutup
            setOpenStatus(false);
            const menu = document.querySelector('.the-menu');
            menu.classList.remove('translate-x-full')
        }else{
            // Membuka
            setOpenStatus(true)
            const menu = document.querySelector('.the-menu');
            menu.classList.add('translate-x-full')
        }
    }

    const removeAllCookie = async () => {
        // console.log(cookies["token"]);
        await logout()
        .then(success => {
            removeCookie('user');
            removeCookie('role')
            removeCookie('token')
            removeCookie('isLogin')
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
    }

    let isAdmin = false;

    if(cookies.role === 'Admin'){
        isAdmin = true;
    }

    let isPeng = false;

    if(cookies.role === 'Admin' || cookies.role === 'Pengawas'){
        isPeng = true;
    }
    
    return (
        <div className="font-poppins">
            <ToastContainer />
            <div className="navbar-medium-top z-50 hidden top-0 navbar-top-admin fixed md:flex mx-auto bg-white shadow-lg w-full">
                <div className="mx-auto items-center font-semibold">
                    <ul className="flex">
                        <li className="home mx-4 my-1 flex p-3">
                            <NavLink to="/Home" className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 flex pb-2": 'hover:scale-105 transition duration-500 hover:border-b-[#418EC6] hover:border-b-4 pb-2 flex'}><span className="material-symbols-outlined mx-1">
                                Dashboard
                            </span>Dashboard</NavLink>
                        </li>
                        
                        
                        {
                            isPeng ? (
                                <>
                                    <li className="home mx-4 my-1 flex p-3">
                                        <NavLink to="/Rekap" className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 flex pb-2": 'hover:scale-105 transition duration-500 hover:border-b-[#418EC6] hover:border-b-4 pb-2 flex'}><span className="material-symbols-outlined mx-1">
                                            article_shortcut
                                        </span>Rekap</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                        {
                            isPeng ? (
                                <>
                                    <li className="home mx-4 my-1 flex p-3">
                                        <NavLink to="/Mitra" className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 flex pb-2": 'hover:scale-105 transition duration-500 hover:border-b-[#418EC6] hover:border-b-4 pb-2 flex'}>
                                        <span className="material-symbols-outlined mx-1">
                                            handshake
                                        </span>Mitra</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                        {
                            isAdmin ? (
                                <>
                                    <li className="home mx-4 my-1 flex p-3">
                                        <NavLink to="/Users" className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 flex pb-2": 'hover:scale-105 transition duration-500 hover:border-b-[#418EC6] hover:border-b-4 pb-2 flex'}><span className="material-symbols-outlined mx-1">
                                            group
                                        </span>Users</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                    </ul>
                </div>
                <div className="p-3 cursor-pointer flex group" onClick={onShowClick}>
                    <div className="tulisan">
                        <div className="Username text-right group-hover:translate-y-2 transition duration-500">Hi, {cookies['username']}</div>
                        <div className="Role text-xs text-slate-500 text-right group-hover:opacity-0 transition duration-500">{cookies['role']}</div>
                    </div>
                    <div className="arrow mt-2 ml-1">
                        <span className={`material-symbols-outlined group-hover:scale-125 transition duration-500 ${showOption ? ('rotate-180') : ('')}`}>
                            keyboard_arrow_down
                        </span>
                    </div>
                </div>

                { showOption ? (
                    <div className="user-option fixed bg-white right-2 top-20 p-2 rounded-xl shadow-lg" id="user-option">
                        <div className="option flex gap-3">
                            <div className="my-account flex flex-col items cursor-pointer hover:bg-[#F5F4F4] p-1 rounded-lg group">
                                <span className="material-symbols-outlined mx-auto group-hover:opacity-0 transition duration-500">
                                    person
                                </span>
                                <div className="text-xs text-slate-500 group-hover:-translate-y-3 group-hover:text-black transition duration-500">
                                    My Info
                                </div>
                            </div>
                            <div className="logout flex flex-col items cursor-pointer hover:bg-red-500 p-1 rounded-lg group" onClick={() => removeAllCookie()}>
                                <span className="material-symbols-outlined mx-auto text-red-400 group-hover:opacity-0 transition duration-500">
                                    power_settings_new
                                </span>
                                <div className="text-xs text-slate-500 group-hover:-translate-y-3 group-hover:text-white transition duration-500">
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>



            
            <div className="mobile-navigation z-50 md:hidden w-full">
                <div className="burger-menu w-fit p-4 rounded">
                    <div className="the-burger">
                        <label className="burger" htmlFor="burger">
                            <input type="checkbox" id="burger" value={openStatus} onChange={handleChange}/>
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                </div>
                <nav className="the-menu fixed rounded-tr-3xl bg-white -left-1/2  w-1/2 h-full border-2 -translate-x-1/2 transition duration-700 flex">
                    <div className="garis ml-3 h-full w-1 bg-black"></div>
                    <ul className=" mt-10 relative">
                        <li className="title-menu mx-4 my-1 text-3xl font-semibold border-b-2 border-b-black w-fit">Menu</li>
                        <li className="home ml-4 my-1 flex p-3 group">
                            <NavLink to="/Home" onClick={closeSideMenu} className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 group flex translate-x-4 pb-1": 'group-hover:translate-x-4 transition flex'}>
                                <span className="material-symbols-outlined mx-1">
                                    dashboard
                                </span>
                            Dashboard</NavLink>
                        </li>
                        <li className="home ml-4 my-1 flex p-3 group ">
                            <NavLink to="/Rekap" onClick={closeSideMenu} className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 group flex translate-x-4 pb-1": 'group-hover:translate-x-4 transition flex'}>
                                <span className="material-symbols-outlined mx-1">
                                    article_shortcut
                                </span>
                            Rekap</NavLink>
                        </li>
                        <li className="home ml-4 my-1 flex p-3 group ">
                            <NavLink to="/Mitra" onClick={closeSideMenu} className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 group flex translate-x-4 pb-1": 'group-hover:translate-x-4 transition flex'}>
                                <span className="material-symbols-outlined mx-1">
                                    handshake
                                </span>
                            Mitra</NavLink>
                        </li>
                        <li className="home ml-4 my-1 flex p-3 group ">
                            <NavLink to="/Users" onClick={closeSideMenu} className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 group flex translate-x-4 pb-1": 'group-hover:translate-x-4 transition flex'}>
                                <span className="material-symbols-outlined mx-1">
                                    group
                                </span>
                            Users</NavLink>
                        </li>
                        <li className="acc mx-4 absolute bottom-20 left-0 p-4 underline" onClick={() => removeAllCookie()}>Logout</li>
                    </ul>

                </nav>
            </div>
        </div>
    )
}

export default TopNavAdmin;