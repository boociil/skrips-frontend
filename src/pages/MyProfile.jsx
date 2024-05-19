import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";
import GantiInfoUser from "../components/GantiInfoUser";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading"
import ListActivity from "../components/ListActivity";


function MyProfile() {

    
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ dataUsers ,setDataUsers ] = useState();
    const [ loadingData, setLoadingData ] = useState(true);
    const [ len, setLen ] = useState();
    const [ count, setCount ] = useState();
    const [ showGantiInfo, setShowGantiInfo ] = useState(false);



    const getUsersData = () => {

        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json', 
                'token' : cookies["token"],
            }
        };
        
        fetch('http://localhost:3001/get_user_activity/' + cookies.username, requestOptions)
        .then(response => response.json())
        .then(data => {
            setLen(data.length)
            setDataUsers(data);
            setLoadingData(false);
            if(len != 0){
                if (len < 15){
                    setCount(len)
                }else{
                    setCount(15)
                }
            }
        });
    }

    useEffect(() => {
        getUsersData()
        
    }, [len]);

    const onCountChange = (e) => {
        if(e.target.value > len){
            setCount(len)    
        }else if(e.target.value <= 0){
            setCount(1)
        }else{
            setCount(e.target.value)
        }
    }

    const onGantiInfoClick = () => {
        setShowGantiInfo(true);
    }

    const onClose = () => {
        setShowGantiInfo(null);
    }


    return (
        <>
            <TopNavAdmin />
            <div className="mb-10 mx-4 ">
                <div className="font-poppins  md:mt-28 max-w-4xl mx-auto">
                    
                    <div className="bagian-info-user z-10 bg-white p-2 rounded-lg shadow-lg mb-8 relative">
                        <h3 className="title font-semibold text-lg mb-4">Information</h3>
                        <div className=" ">
                            <div className="username text-xs w-24 sm:text-base inline-block">Username</div> 
                            <div className="text-xs sm:text-base inline-block">: {cookies.username}</div> 
                            <div></div>
                            <div className="full-name text-xs sm:text-base w-24 inline-block">Full Name</div> 
                            <div className="text-xs sm:text-base inline-block">: {cookies.fullName}</div> 
                            <div></div>
                            <div className="Role text-xs sm:text-base inline-block w-24">Role</div> 
                            <div className="text-xs sm:text-base inline-block">: {cookies.role}</div> 
                            <div></div>
 
                            <button className="bg-emerald-500 py-1 px-2 rounded-lg text-white mb-2 mt-4 ml-2" onClick={onGantiInfoClick}>Ganti Password</button>
                            {
                                showGantiInfo ? (
                                    <>
                                        <GantiInfoUser onClose={onClose} isMyProfile={true} username={cookies.username}/>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    
                    
                    {  
                        loadingData ? (
                            <Loading/>
                        ) : (
                            <>
                                {
                                    len ? (
                                        <div className="the-table mx-auto">

                                            <div className="input-number mb-4">
                                                <label htmlFor="count" className="mr-2 text-sm">Showing</label>
                                                <input type="number" name="count" value={count} className="w-12 text-center rounded-lg shadow-lg" onChange={onCountChange}/>
                                                <span className="text-sm ml-1"> of {len} total activity</span>
                                            </div>

                                            
                                            <div className="content  text-slate-600 text-sm md:grid-cols-5"></div>
                                            <div className="tile cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-3 transition duration-500 min-w-full max-w-5xl md:mx-auto">
                                            <div className="title px-3 py-2 w-full" >
                                                <div className="">Activity</div>
                                            </div>
                                            <div className="tanggal px-3 py-2">
                                                <div className="text-center">Tanggal</div>
                                            </div>
                                            <div className="status sm:block px-3 py-2">
                                                <div className="flex">
                                                    <div className="flex-grow text-center">
                                                        <div>Jam</div>
                                                    </div>
                                                </div>
                                            </div>   
                                            </div>
                                            {
                                                dataUsers.slice(0,count).map((item,index) => (
                                                    <div className="flex gap-10" key={index}> 
                                                        <>
                                                            <ListActivity activity={item.last_activity} position={index !== 0 ? (index === count-1 ? 'BOT' : 'MID' ) : 'TOP'} time={item.time} />
                                                        </>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="mt-32 text-xl text-center text-slate-500">Belum ada Aktivitas</h2>
                                        </>
                                    )
                                }
                            </>  
                        )
                    }
                    
                </div>
            </div>
        </>
    )
}

export default MyProfile;