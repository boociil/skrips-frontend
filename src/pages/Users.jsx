import { useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../components/ButtonAdd";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/Navbar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ListUsers from "../components/ListUsers"
import { AuthContext } from "../components/AuthContext";
import Loading from "../components/Loading"

function Users() {

    const { isOpen, setIsOpen } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ dataUsers ,setDataUsers ] = useState();
    const [ loadingData, setLoadingData ] = useState(true);
    const [ len, setLen ] = useState();
    const [ searchItem, setSearchItem ] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    // let l = dataUsers.length;
    const getUsersData = () => {

        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json', 
                'token' : cookies["token"],
            }
        };
        
        fetch(backendUrl + 'get_all_users', requestOptions)
        .then(response => response.json())
        .then(data => {
            
            setLen(data.length)
            setDataUsers(data);
            setLoadingData(false);
        });
    }

    const handleClick = () => {
        navigate('Register');
    }

    useEffect(() => {
        getUsersData()
        
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
            
            fetch(backendUrl + 'delete_user/' + username, requestOptions)
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


    const onSearchChange = (event) => {
        setSearchItem(event.target.value);
    }


    return (
        <>
            <ToastContainer />
            <TopNavAdmin />
        <div className="mb-10 mx-4" onClick={() => setIsOpen(false)}>
            
            { loadingData ? (
                <div className="mt-10 md:pt-28 h-full font-poppins flex items-center justify-center" onClick={() => setIsOpen(false)}>
                    <Loading/>
                </div>
            ) : (
                <div className="font-poppins md:mt-28 max-w-4xl mx-auto">
                    <h2 className="mt-6 text-xl mb-4 md:mb-8">Users Management</h2>

                    <div className="max-w-5xl md:mx-auto">
                        <input type="text" className="mb-4 rounded-md sm:w-96 w-60 h-6 p-4 lg:mx-auto" placeholder="Search..." onChange={onSearchChange}/>
                    </div>

                    <div className="the-table mx-auto">
                        
                        <div className="content  text-slate-600 text-sm md:grid-cols-5">
                            {dataUsers

                            .filter(item => {
                                if(typeof item.username === 'string'){
                                    return item.username.toLowerCase().includes(searchItem.toLowerCase());
                                }
                                return false;
                            })
                            
                            .map((item,index) => (
                                <div key={index}>
                                    <ListUsers key={item.username} position={index !== 0 ? (index === len-1 ? 'BOT' : 'MID' ) : 'TOP'} name={item.firstName + " " + item.lastName} username={item.username} status={item.status} role={item.role} del={onDeleteClick}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ButtonAdd click = {handleClick} />
                </div>
            )}
            
        </div>
        </>
    )
}

export default Users;