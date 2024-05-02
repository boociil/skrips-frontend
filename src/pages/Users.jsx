import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../components/buttonAdd";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Users() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ dataUsers ,setDataUsers ] = useState();
    const [ loadingData, setLoadingData ] = useState(true);
    const [ len, setLen ] = useState();

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

    const data = [
        {username:"ryan123", firstName:"Ryan", lastName:"Ardiansyah",Role:"Admin", status:"1"},
        {username:"opss3", firstName:"Ryan", lastName:"Ardiansyah",Role:"Operator", status:"1"},
        {username:"haha12", firstName:"Ryan", lastName:"Ardiansyah",Role:"Pengawas", status:"1"},
        {username:"Fate222", firstName:"Ryan", lastName:"Ardiansyah",Role:"admin", status:"0"},
    ]

    function getClassByRole(Role) {
        if(Role.toLowerCase() === 'admin'){
            return 'bg-[#FFCAF6] text-[#FF00C7]';
        }else if(Role.toLowerCase() === 'operator'){
            return 'bg-[#CAE9FF] text-[#0075FF]';
        }else{
            return 'bg-[#FFE3CA] text-[#CA7900]';
        }
    }


    return (
        <>
            <ToastContainer />
            <TopNavAdmin />
            { loadingData ? (
                <div>
                    {/* Ketika komponen sedang loading, tambahkan animasi disini */}
                    Lagi Loading
                </div>
            ) : (
                <div className="font-poppins md:mt-28 mx-auto max-w-4xl">
                <h2 className="ml-6 mt-6 text-xl">Users Management</h2>

                <div className="the-table mx-auto mt-4 md:mt-8 ml-4">
                    <div className="title mx-auto grid grid-cols-3 md:grid-cols-5 text-slate-600 text-xs mb-4">
                        <div className="col-start-1">username</div>
                        <div className=" hidden md:block md:col-start-2">Full Name</div>
                        <div className="col-start-2 md:col-start-3">Role</div>
                        <div className="hidden md:col-start-4 md:block">Status</div>
                        <div className="col-start-3 md:col-start-5">Action</div>
                    </div>
                    <div className="content  text-slate-600 text-sm md:grid-cols-5">
                        {dataUsers.map(item => (
                            <div key={item.username} className="my-1 grid grid-cols-3 md:grid-cols-5">
                                <div className="cols-start-1">{item.username}</div>
                                <div className="cols-start-2">{item.firstName + " " +item.lastName} </div>
                                <div className={"cols-start-3 w-fit p-1 rounded-lg " + getClassByRole(item.role)}>{item.role}</div>
                                <div className="hidden md:block md:cols-start-4"><span className={item.status === 1 ? "lingkaran inline-block w-2 h-2 rounded-full bg-[#00FF57] mr-1" : "lingkaran inline-block w-2 h-2 rounded-full bg-[#FF6056] mr-1"}></span>{item.status === 1 ? "Online" : "Offline"}</div>
                                <div>
                                    <div className="flex cursor-pointer hover:bg-slate-500 hover:text-white transition duration-300 w-fit p-1 rounded-sm"
                                        onClick={() => onDeleteClick(item.username)}
                                        >
                                            Delete
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div>
                </div>
                <ButtonAdd click = {handleClick} />
            </div>
            )}
            
        </>
        
    )
}

export default Users;