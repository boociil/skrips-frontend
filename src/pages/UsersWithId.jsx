import { useContext, useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/Navbar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading"
import ListActivity from "../components/ListActivity";
import GantiInfoUser from "../components/GantiInfoUser";
import ConfirmCard from "../components/ConfirmCard";
import { AuthContext } from "../components/AuthContext";

function UsersWithId() {

    const { username } = useParams();
    const { isOpen, setIsOpen } = useContext(AuthContext);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ dataUsers ,setDataUsers ] = useState();
    const [ infoUsers, setInfoUsers ] = useState({});
    const [ loadingData, setLoadingData ] = useState(true);
    const [ loadingInfoUsers, setLoadingInfoUsers ] = useState(true);
    const [ len, setLen ] = useState();
    const [ count, setCount ] = useState();
    const [ isMyProfile, setIsMyProfile ] = useState(false);
    const [ showGantiInfo, setShowGantiInfo ] = useState(false);
    const [ showConfirmCard, setShowConfirmCard ] = useState();
    const [ isChange, setIsChange ] = useState(false);
    const navigate = useNavigate();
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    if (username === cookies['username']){
        navigate('/MyProfile');
    }

    const getUsersData = () => {

        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json', 
                'token' : cookies["token"],
            }
        };
        
        fetch(backendUrl + 'get_user_activity/' + username, requestOptions)
        .then(response => response.json())
        .then(data => {
            const l = data.length
            setLen(l)
            setDataUsers(data);
            setLoadingData(false);
            if(l != 0){
                if (l < 15){
                    setCount(l)
                }else{
                    setCount(15)
                }
            }
        });
    }

    const getInfoUsers = () => {

        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json', 
                'token' : cookies["token"],
            }
        };
        
        fetch(backendUrl + 'get_users_info/' + username, requestOptions)
        .then(response => response.json())
        .then(data => {
            setInfoUsers(data);
            setLoadingInfoUsers(false);
        });
    }

    useEffect(() => {
        getUsersData();
        getInfoUsers();
        
    }, [isChange,username]);

    const delet_user = (username) => {
        return new Promise ((resolve,reject) => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan,
                    'token' : cookies["token"],
                }
            };
            
            fetch(backendUrl + 'delete_user/' + username, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.msg === "Success"){
                    resolve(true);
                }else{
                    reject(data.msg);
                }
            });
        });
    };

    const onCountChange = (e) => {
        if(e.target.value > len){
            setCount(len)    
        }else if(e.target.value <= 0){
            setCount(1)
        }else{
            setCount(e.target.value)
        }
    }

    const onNo = () => {
        setShowConfirmCard(false);
    }

    const onYes = async (username) => {
        // alert(username)
        await delet_user(username)
        .then(success => {
            setLen(len - 1)
            toast.success("Hapus User Berhasil", {
                position: "bottom-right",
                hideProgressBar: true,
                autoClose: 1000,
                closeOnClick: true,
                theme: "light",
                transition: Bounce,
                pauseOnHover: false,
            })
            navigate("/Users")
        })
        .catch(error => {
            toast.success("Error : " + error, {
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

    const onDelClick = () => {
        setShowConfirmCard(true);
    }

    const onGantiInfoClick = () => {
        setShowGantiInfo(true);
    }

    const onClose = () => {
        setShowGantiInfo(null);
        setIsChange(true);
    }

    return (
        <>
            <TopNavAdmin />
            {
                showConfirmCard && (
                    <>
                        <ConfirmCard message={`Hapus User ${username} ?`} onCancel={onNo} onConfirm={() => onYes(username)}/>
                    </>
                ) 
            }
            <div className="mb-10 mx-4" onClick={() => setIsOpen(false)}>
                <div className="font-poppins md:mt-28 max-w-4xl mx-auto">
                    
                    <div className="bagian-info-user bg-white p-2 rounded-lg shadow-lg mb-8 relative">
                        <h3 className="title font-semibold text-lg mb-4">Information</h3>
                        <div className=" ">
                            <div className="username text-xs w-24 sm:text-base inline-block">Username</div> 
                            <div className="text-xs sm:text-base inline-block">: {loadingInfoUsers ? (<><Loading/></>) : (<>{infoUsers[0].username}</>)}</div> 
                            <div></div>
                            <div className="full-name text-xs sm:text-base w-24 inline-block">Full Name</div> 
                            <div className="text-xs sm:text-base inline-block">: {loadingInfoUsers ? (<><Loading/></>) : (<>{infoUsers[0].firstName} {infoUsers[0].lastName}</>)}</div> 
                            <div></div>
                            <div className="Role text-xs sm:text-base inline-block w-24">Role</div> 
                            <div className="text-xs sm:text-base inline-block">: {loadingInfoUsers ? (<><Loading/></>) : (<>{infoUsers[0].role}</>)}</div> 
                            <div></div>
                            {/* Fitur delete users difreeze sementara karena bisa menyebabkan Bug */}
                            <div className={`absolute right-2 top-2 rounded-lg p-1 bg-[#F5F4F4] hover:bg-red-500 text-xs group cursor-pointer ${isMyProfile ? ('hidden') : ('hidden')}`} onClick={onDelClick}>
                                <span className="text-center text-red-500 material-symbols-outlined px-1 hidden md:block group-hover:opacity-0 transition duration-500">
                                    delete
                                </span>
                                <div className="text-slate-400 text-xs md:group-hover:-translate-y-3 group-hover:text-white transition duration-500">
                                    Delete
                                </div>
                            </div>
                            {loadingInfoUsers ? (<><Loading/></>) : (<><button className="bg-emerald-500 py-1 px-2 rounded-lg text-white mb-2 mt-4 ml-2" onClick={onGantiInfoClick}>Ganti Role</button></>)}
                            
                            {
                                showGantiInfo && (
                                    <>
                                        
                                        <GantiInfoUser onClose={onClose} isMyProfile={false} username={infoUsers[0].username} role={infoUsers[0].role}/>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    
                    
                    {  
                        loadingData ? (
                            <div className="w-full flex justify-center items-center">
                                <Loading />
                            </div>
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

                                            <div className="content text-slate-600 text-sm md:grid-cols-5"></div>
                                            <div className="tile cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-3 md:grid-cols-4 transition duration-500 min-w-full max-w-5xl md:mx-auto">
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
                                                <div className="keterangan hidden md:block px-3 py-2">
                                                    <div className="text-center">Keterangan</div>
                                                </div>
                                            </div>
                                            {
                                                dataUsers.slice(0,count).map((item,index) => (
                                                    <div className="flex gap-10" key={index}> 
                                                        <>
                                                            <ListActivity activity={item.last_activity} position={index !== 0 ? (index === count-1 ? 'BOT' : 'MID' ) : 'TOP'} time={item.time} ket={item.Keterangan} />
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

export default UsersWithId;