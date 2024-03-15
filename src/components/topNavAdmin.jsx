import { Outlet,  NavLink, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useCookies } from "react-cookie";


function TopNavAdmin(props = {active : 'home'}) {


    const [openStatus, setOpenStatus] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    

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
    // const handleButtonClick = (class_name) => {
    //     setClassActive(class_name);
    // };

    const removeAllCookie = () => {
        removeCookie('user');
        removeCookie('role')
        removeCookie('token')
        removeCookie('isLogin')
        navigate('/');
    }

    let isAdmin = false;

    if(cookies.role === 'admin'){
        isAdmin = true;
    }
    
    return (
        <div className="font-poppins">
            <div className="navbar-medium-top z-50 hidden top-0 navbar-top-admin fixed md:flex mx-auto bg-white shadow-lg w-full">
                <div className="mx-auto items-center font-semibold">
                    <ul className="flex">
                        <li className="home mx-4 my-1 flex p-3">
                            <NavLink to="/Home" className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 flex pb-2": 'hover:scale-105 transition duration-500 hover:border-b-[#418EC6] hover:border-b-4 pb-2 flex'}><span className="material-symbols-outlined mx-1">
                                Dashboard
                            </span>Dashboard</NavLink>
                        </li>
                        <li className="home mx-4 my-1 flex p-3">
                            <NavLink to="/Rekap" className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 flex pb-2": 'hover:scale-105 transition duration-500 hover:border-b-[#418EC6] hover:border-b-4 pb-2 flex'}><span className="material-symbols-outlined mx-1">
                                article_shortcut
                            </span>Rekap</NavLink>
                        </li>
                        <li className="home mx-4 my-1 flex p-3">
                            <NavLink to="/Mitra" className={({ isActive }) => isActive? "border-b-[#418EC6] border-b-4 flex pb-2": 'hover:scale-105 transition duration-500 hover:border-b-[#418EC6] hover:border-b-4 pb-2 flex'}>
                            <span className="material-symbols-outlined mx-1">
                                handshake
                            </span>Mitra</NavLink>
                        </li>
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
                <div className="p-3 underline cursor-pointer" onClick={() => removeAllCookie()}>
                    Logout
                </div>
            <Outlet />
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