import { useState } from "react";
import { useCookies } from "react-cookie";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./Loading";

function GantiInfoUser({ username, role, isMyProfile, onClose }) {

    const [ showError, setShowError ] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [ msgError, setMsgError ] = useState();
    const [ loading, setLoading ] = useState(false);
    const [formData, setFormData] = useState({
        old: '',
        new: '',
        confNew: '',
        role: role,
    });
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    let role_arry = ["Admin", "Pengawas", "Operator"]
    let index = role_arry.indexOf(role);

    if (index !== -1) {
        role_arry.splice(index, 1);
    }

    const fetchChangeRole = () => {
        setLoading(true);
        return new Promise ((resolve,reject) => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json', 
                    'token' : cookies["token"],
                },
                body: JSON.stringify({ 
                    "username" : username,
                    "role" : formData.role
                 }) 
            };
            
            fetch(backendUrl + 'update_role_users', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.msg === "Success"){
                    resolve(data)
                }else{
                    reject(data.msg);
                }
                setLoading(false);
            });
        })
    }

    const fetchChangePassword = () => {
        return new Promise ((resolve,reject) => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json', 
    
                },
                body: JSON.stringify({ 
                    "username" : cookies.username,
                    "password" : formData.old,
                    "newPass" : formData.new
                 }) 
            };
            
            fetch(backendUrl + 'update_password_users', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.msg === "Success"){
                    resolve(data)
                }else{
                    reject(data.msg);
                }
            });
        })
    }

    const validatePass = () => {
        if(formData.new === ""){
            return false;
        }
        if(formData.confNew === ""){
            return false;
        }
        if(formData.new !== formData.confNew){
            return false;
        }
        return true;
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        setShowError(false);
        setMsgError('')
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isMyProfile){
            if(validatePass()){
                fetchChangePassword()
                .then(success => {
                    toast.success("Ganti Password Berhasil", {
                        position: "bottom-right",
                        hideProgressBar: true,
                        autoClose: 1000,
                        closeOnClick: true,
                        theme: "light",
                        transition: Bounce,
                        pauseOnHover: false,
                    })
                    onClose();
                })
                .catch(reject => {
                    setMsgError(reject)
                    setShowError(true);
                })
            }else{
                setShowError(true);
                setMsgError('Password Tidak Cocok')
            }
        }else{
            // fetch ke backend untuk ganti role
            if (formData.role !== role){
                fetchChangeRole()
                .then(success => {
                    toast.success("Ganti Role Berhasil", {
                        position: "bottom-right",
                        hideProgressBar: true,
                        autoClose: 1000,
                        closeOnClick: true,
                        theme: "light",
                        transition: Bounce,
                        pauseOnHover: false,
                    })
                    onClose();
                    
                })
            }else{
                onClose();
            }
        }
        
    };

    return(
        <div className="the-blur fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 font-poppins">
            <div className="container fixed z-50 flex justify-center items-center mt-40 ">
                <div className=" bg-white m-auto px-5 py-2 absolute top-0 rounded-lg min-w-96 mx-auto ">
                    <div className="x-button px-2 transition duration-500 absolute right-3 cursor-pointer text-lg rounded-md font-bold bg-[#F5F4F4] hover:bg-red-500 hover:text-white" onClick={onClose}>x</div>
                    <div className="title mt-10">
                        <h2 className="text-center mb-8 font-medium text-xl">
                                {
                                    isMyProfile ? (
                                        <>Ganti Password</>
                                    ) : (
                                        <>Penyesuaian Role</>
                                    )
                                }
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="">
                        {
                            isMyProfile ? (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="old" className="ml-2">Password Lama :</label><br />
                                        <input type="password" className="old-password bg-[#F5F4F4] rounded-md ml-1 p-1" name="old" value={formData.old} onChange={handleChange}/>

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPass" className="ml-2">Password Baru : </label><br />
                                        <input type="password" className="new-password bg-[#F5F4F4] rounded-md ml-1 p-1" name="new" value={formData.new} onChange={handleChange} />
                                    </div>
                                    <div className={`${showError ? ('mb-3') : ('mb-8')}`}>
                                        <label htmlFor="confNew" className="ml-2">Konfirmasi Password : </label><br />
                                        <input type="password" className="conf-password bg-[#F5F4F4] rounded-md ml-1 p-1" name="confNew" value={formData.confNew} onChange={handleChange} />
                                    </div>
                                    <div className={`msg-error ${showError ? ('') : ('hidden')}`}>
                                        <span className="text-red-500 text-xs">*{msgError}</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                        

                        {
                            !isMyProfile ? (
                                <div className="min-w-80">
                                    <label htmlFor="role" className="ml-1 w-full">Role : </label>
                                    <select name="role" id="role" className="bg-[#F5F4F4] rounded-md p-1" onChange={handleChange}>
                                        <option value={role} key={0}>{role}</option>
                                        {
                                            role_arry.map((item,index) => (
                                                <option value={item} key={index}>{item}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            ) : (<></>)
                        }
                        <div className="button-div flex justify-center mb-1 mt-4">
                            <button type="submit" className="px-2 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 hover:text-white transition-all duration-300">
                                {
                                    loading ? (
                                        <><Loading/></>
                                    ) : (
                                        <>Submit</>
                                    )
                                }
                            </button>
                            <button className="px-2 py-1  text-white rounded-lg ml-2 hover:bg-red-400 bg-red-500 hover:text-white transition-all duration-300" onClick={onClose}>Close</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default GantiInfoUser;