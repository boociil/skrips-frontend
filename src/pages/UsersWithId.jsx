import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading"


function UsersWithId() {

    const { username } = useParams();

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ dataUsers ,setDataUsers ] = useState();
    const [ infoUsers, setInfoUsers ] = useState({});
    const [ loadingData, setLoadingData ] = useState(true);
    const [ loadingInfoUsers, setLoadingInfoUsers ] = useState(true);
    const [ len, setLen ] = useState();


    // console.log(cookies['token']);

    const getUsersData = () => {

        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json', 
                'token' : cookies["token"],
            }
        };
        
        fetch('http://localhost:3001/get_user_activity/' + username, requestOptions)
        .then(response => response.json())
        .then(data => {
            setLen(data.length)
            setDataUsers(data);
            setLoadingData(false);
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
        
        fetch('http://localhost:3001/get_users_info/' + username, requestOptions)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setInfoUsers(data);
            setLoadingInfoUsers(false);
        });
    }

    useEffect(() => {
        getUsersData()
        getInfoUsers()
    }, [len]);

    const delet_user = (username) => {
        return new Promise ((resolve,reject) => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan,
                    'token' : cookies["token"],
                }
            };
            
            fetch('http://localhost:3001/delete_user/' + username, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.msg === "Success"){
                    resolve(true);
                }else{
                    reject(data.msg);
                }
            });
        })
    }

    const onDeleteClick = async (username) => {
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
            // toast success
        })
        .catch(error => {
            // toast gagal
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


    return (
        <>
            <ToastContainer />
            <TopNavAdmin />
        <div className="mb-10 mx-4">
            
                <div className="font-poppins md:mt-28 max-w-4xl mx-auto">
                    
                    <div className="bagian-info-user">
                        <div className="username">Username : {loadingInfoUsers ? (<><Loading/></>) : (<>{infoUsers[0].username}</>)}</div>
                        <div className="username">Full Name : {loadingInfoUsers ? (<><Loading/></>) : (<>{infoUsers[0].firstName} {infoUsers[0].lastName}</>)}</div>
                        <div className="username">Role : {loadingInfoUsers ? (<><Loading/></>) : (<>{infoUsers[0].role}</>)}</div>
                    </div>

                    <div className="the-table mx-auto">
                        <h2 className="mt-6 text-xl mb-4 md:mb-8">List Activity : </h2>
                        <div className="content  text-slate-600 text-sm md:grid-cols-5">
                            {  loadingData ? (
                                    <Loading/>
                                ) : (
                                    dataUsers.slice(0,20).map((item,index) => (
                                        <div className="flex gap-10" key={index}>
                                            <div className="w-20">{item.last_activity}</div>
                                            <div>{item.time.slice(0,10)} {item.time.slice(11,19)}</div>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
          
        </div>
        </>
    )
}

export default UsersWithId;