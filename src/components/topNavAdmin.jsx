import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';


function TopNavAdmin(props = {active : 'home'}) {

    const [classActive, setClassActive] = useState('home');

    useEffect(() => {
        const homeListItem = document.querySelector('li.' + classActive);
        // Lakukan sesuatu dengan homeListItem
        homeListItem.classList.add('border-b-4','border-b-[#418EC6]');
    }, [classActive]);

    // const handleButtonClick = (class_name) => {
    //     setClassActive(class_name);
    // };
    
    return (
        <div className="hidden top-0 navbar-top-admin fixed md:flex mx-auto bg-white shadow-lg w-full">
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
    )
}

export default TopNavAdmin;