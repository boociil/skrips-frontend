import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';


function TopNavAdmin(props = {active : 'home'}) {

    const [classActive, setClassActive] = useState('home');
    const [openStatus, setOpenStatus] = useState(0);

    useEffect(() => {
        const homeListItem = document.querySelector('li.' + classActive);
        // Lakukan sesuatu dengan homeListItem
        homeListItem.classList.add('border-b-4','border-b-[#418EC6]');
    }, [classActive]);

    const closeSideMenu = () => {
        setOpenStatus(1)
        const menu = document.querySelector('.the-menu');
        menu.classList.remove('translate-x-full')
        console.log('closeside jalan');
    }

    const handleChange = (e) => {
        if (openStatus === 1){
            // Menutup
            setOpenStatus(0);
            const menu = document.querySelector('.the-menu');
            menu.classList.remove('translate-x-full')
        }else{
            //Membuka
            setOpenStatus(1)
            const menu = document.querySelector('.the-menu');
            menu.classList.add('translate-x-full')
        }
    }
    // const handleButtonClick = (class_name) => {
    //     setClassActive(class_name);
    // };
    
    return (
        <div>
            <div className="navbar-medium-top hidden top-0 navbar-top-admin fixed md:flex mx-auto bg-white shadow-lg w-full">
                <div className="mx-auto items-center font-semibold">
                    <ul className="flex">
                        <li className="home mx-4 my-1 flex p-3 hover:border-b-[#418EC6] hover:border-b-4">
                            <span className="material-symbols-outlined mx-1">
                                home
                            </span>
                            <Link to="/" >Home</Link>
                        </li>
                        <li className="rekap mx-4 my-1 p-3 flex  hover:border-b-[#418EC6] hover:border-b-4">
                            <span className="material-symbols-outlined mx-1">
                                article_shortcut
                            </span>
                            <Link to="/Login" className="">Rekap</Link>
                        </li>
                        <li className="mitra mx-4 my-1 p-3 flex hover:border-b-[#418EC6] hover:border-b-4">
                            <span className="material-symbols-outlined mx-1">
                                handshake
                            </span>
                            <Link to="/Hello">Mitra</Link>
                        </li>
                        <li className="users mx-4 my-1 p-3 flex hover:border-b-[#418EC6] hover:border-b-4">
                            <span className="material-symbols-outlined mx-1">
                                group
                            </span>
                            <Link to="/Register">Users</Link>
                        </li>
                    </ul>
                </div>
            <Outlet />
            </div>
            <div className="mobile-navigation md:hidden w-full">
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
                <div className="the-menu fixed rounded-tr-3xl bg-white -left-1/2  w-1/2 h-full border-2 -translate-x-1/2 transition duration-700">
                    <ul className="">
                        <li className="home mx-4 my-1 flex p-3 hover:border-b-[#418EC6] hover:border-b-4">
                            <span className="material-symbols-outlined mx-1">
                                home
                            </span>
                            <Link to="/" onClick={closeSideMenu}>Home</Link>
                        </li>
                        <li className="rekap mx-4 my-1 p-3 flex  hover:border-b-[#418EC6] hover:border-b-4">
                            <span className="material-symbols-outlined mx-1">
                                article_shortcut
                            </span>
                            <Link to="/Login" className="" onClick={closeSideMenu}>Rekap</Link>
                        </li>
                        <li className="mitra mx-4 my-1 p-3 flex hover:border-b-[#418EC6] hover:border-b-4">
                            <span className="material-symbols-outlined mx-1">
                                handshake
                            </span>
                            <Link to="/Hello" onClick={closeSideMenu}>Mitra</Link>
                        </li>
                        <li className="users mx-4 my-1 p-3 flex hover:border-b-[#418EC6] hover:border-b-4">
                            <span className="material-symbols-outlined mx-1">
                                group
                            </span>
                            <Link to="/Register" onClick={closeSideMenu}>Users</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopNavAdmin;