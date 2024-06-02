import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/Navbar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../components/AuthContext";
import Alert from "../components/Alert"

function AddKegiatan() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ loadingForm, setIsLoadingForm ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ showAlert2, setShowAlert2 ] = useState(false);
    const { isOpen, setIsOpen } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        // inisialisasi state untuk menyimpan data form
        username: '',
        fn: '',
        ln: '',
        pass: '',
        gender:'1',
        confpass:'',
        role:'Operator',
        status:''
      });

      const backendUrl = process.env.REACT_APP_BACKEND_URL
    
      const sendData = () => {
        setIsLoadingForm(true)
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan
                    'token' : cookies["token"],
                },
                body: JSON.stringify({ 
                    "username" : formData.username,
                    "password" : formData.pass,
                    "firstName" : formData.fn,
                    "lastName" : formData.ln,
                    "gender" : formData.gender,
                    "role" : formData.role,
                    "status" : 0
                }) 
            };
    
            fetch(backendUrl + 'register' , requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.msg === "Berhasil") {

                    resolve(true);
                } else {
                    reject(data.msg);
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    };

    const check_empty = () => {
        if (formData.username === ""){
            return false;
        }
        if (formData.pass === ""){
            return false;
        }
        if (formData.confpass === ""){
            return false;
        }
        if (formData.ln === ""){
            return false;
        }
        if (formData.fn === ""){
            return false;
        }
        if (formData.role === ""){
            return false;
        }
        if (formData.gender === ""){
            return false;
        }
        if (formData.pass !== formData.confpass){
            return false;
        }
        return true;
    }

      const handleChange = (e) => {
        // mengubah state saat nilai input berubah
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "username"){
            const username_input = document.getElementById('username');
            const ket_username = document.getElementById('ket-username');
            if(username_input.classList.contains("border-red-500")){
                username_input.classList.remove("border-red-500")
                username_input.classList.remove("border-2")
                ket_username.classList.add("hidden")
            }
        }
      };

      const handleSubmit = async (event) =>{
        if(check_empty()){
            event.preventDefault();
            await sendData()
            .then(success => {
                toast.success("Register User Berhasil", {
                    position: "bottom-right",
                    hideProgressBar: true,
                    autoClose: 1000,
                    closeOnClick: true,
                    theme: "light",
                    transition: Bounce,
                    pauseOnHover: false,
                })
                navigate("/users")
            })
            .catch(error => {
                // Jika error
                const username_input = document.getElementById('username');
                const ket_username = document.getElementById('ket-username');
                ket_username.classList.remove("hidden")
                username_input.classList.add("border-2")
                username_input.classList.add("border-red-500")
                toast.error(error, {
                    position: "bottom-right",
                    hideProgressBar: true,
                    autoClose: 1000,
                    closeOnClick: true,
                    theme: "light",
                    transition: Bounce,
                    pauseOnHover: false,
                })
            });
            setIsLoadingForm(false);
        }else{
            if (formData.pass !== formData.confpass){
                setShowAlert2(true);
            }else{
                setShowAlert(true);
            }
        }

    }

    return (
        <>
            <ToastContainer />
            <Alert open={showAlert} setOpen={setShowAlert} isConfirm={false} msg={"Masih ada isian kosong!"} subMsg={"Silahkan lengkapi form User dengan benar."}/>
            <Alert open={showAlert2} setOpen={setShowAlert2} isConfirm={false} msg={"Password tidak konsisten!"} subMsg={"Silahkan perbaiki password anda."}/>
            <TopNavAdmin/>
            <div className="font-poppins parent-form my-4 md:mt-24 mx-4 p-3 shadow-xl bg-white rounded-3xl lg:mt-32 lg:max-w-4xl md:container md:mx-auto max-w-5xl" onClick={() => setIsOpen(false)}>
                <h1 className="text-2xl font-semibold mb-4 sm:mb-8 text-center">Tambah User</h1>
                <div className="the-form ">
                    <div className="nama-id md:grid md:grid-cols-2 place-content-center items-center">
                        <div className="sm:ml-6 md:ml-3 ml-3 ">
                            <label className="lg:col-start-2 text-sm"> First name
                                <input 
                                        className='bg-[#F6F6F9]  mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                        name="fn"
                                        type="text" 
                                        placeholder='First name'
                                        value={formData.fn}
                                        onChange={handleChange} 
                                />
                            </label>
                        </div>

                        <div className="id-kegiatan mb-3">
                            <div className="sm:ml-6 md:ml-3 ml-3">
                                <label className="lg:col-start-2 text-sm"> Last Name
                                    <input 
                                            className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                            name="ln"
                                            type="text" 
                                            placeholder='Last name'
                                            value={formData.ln}
                                            onChange={handleChange} 
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="username mb-3">
                        <div className="sm:ml-6 md:ml-3 ml-3 ">
                            <label className="text-sm"> Username
                                <input 
                                    className='bg-[#F6F6F9]  mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                    name="username"
                                    id="username"
                                    type="text" 
                                    placeholder='Username'
                                    value={formData.username}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>
                        <div className="keterangan-username sm:ml-6 md:ml-3 ml-3 text-xs text-red-400 hidden" id="ket-username">
                            *username telah digunakan
                        </div>
                    </div>

                    
                
                    <div className="jenis-koseka md:grid md:grid-cols-2">
                        <div className="sm:ml-6 md:ml-3 ml-3">
                        <label className="text-sm"> Jenis Kelamin
                            <select value={formData.gender} className='bg-[#F6F6F9] mt-1 text-xs px-3 sm:ml-0 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72' name="gender" onChange={handleChange}>
                                <option value="1" key="1">Laki-laki</option>
                                <option value="0" key="0">Perempuan</option>
                            </select>
                        </label>
                        </div>

                        <div className="sm:ml-6 md:ml-3 ml-3">
                        <label className="text-sm"> Role
                            <select value={formData.role} className='bg-[#F6F6F9] mt-1 text-xs px-3 sm:ml-0 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72' name="role" onChange={handleChange}>
                                <option value="Operator" key="Operator">Operator</option>
                                <option value="Pengawas" key="Pengawas">Pengawas</option>
                                <option value="Admin" key="Admin">Admin</option>
                            </select>
                        </label>
                        </div>
                    </div>

                    <div className="nama-id md:grid md:grid-cols-2 ">
                        <div className="sm:ml-6 md:ml-3 ml-3 ">
                            <label className="lg:col-start-2 text-sm"> Password
                                <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                    name="pass"
                                    type="password" 
                                    placeholder='Password'
                                    value={formData.pass}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>

                        <div className="id-kegiatan mb-3">
                            <div className="sm:ml-6 md:ml-3 ml-3">
                                <label className="lg:col-start-2 text-sm"> Confirm Password
                                    <input 
                                        className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                        name="confpass"
                                        type="password" 
                                        placeholder='Confirm Password'
                                        value={formData.confpass}
                                        onChange={handleChange} 
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    
                    <button onClick={handleSubmit} className="bg-[#418EC6] block mt-6 mx-auto w-28 text-white p-3 rounded-lg">
                        { loadingForm ? (
                            <>
                                Loading
                            </>
                        ) : (
                            <>
                                Tambah
                            </>
                        )}
                    </button>
                </div>
            </div>
        </>
        
    )
}

export default AddKegiatan