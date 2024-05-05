import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../components/buttonAdd";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ListBuble from "../components/listBuble";
import ListUsers from "../components/listUsers"

function Users() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ dataUsers ,setDataUsers ] = useState();
    const [ loadingData, setLoadingData ] = useState(true);
    const [ len, setLen ] = useState();
    const [ searchItem, setSearchItem ] = useState('');

    // let l = dataUsers.length;
    const getUsersData = () => {

        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json', 
                'token' : cookies["token"],
            }
        };
        
        fetch('http://localhost:3001/get_all_users', requestOptions)
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


    const onSearchChange = (event) => {
        setSearchItem(event.target.value);
    }


    return (
        <>
            <ToastContainer />
            <TopNavAdmin />
        <div className="mb-10 mx-4">
            
            { loadingData ? (
                <div>
                    {/* Ketika komponen sedang loading, tambahkan animasi disini */}
                    Lagi Loading
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