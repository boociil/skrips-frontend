import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function AddMitra() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ loadingForm, setIsLoadingForm ] = useState(false);
    const [formData, setFormData] = useState({
        // inisialisasi state untuk menyimpan data form
        nama: '',
        tugas: 'Editing',
        start: '',
        end: ''
      });

    
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
                    "nama" : formData.nama,
                    "tugas" : formData.tugas,
                    "start" : formData.start,
                    "end" : formData.end,
                }) 
            };
    
            fetch('http://localhost:3001/register_mitra' , requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.msg === "Berhasil") {
                    console.log("Sukses");
                    resolve(true);
                } else {
                    reject(data.msg);
                    console.log(data.msg);
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    };

    const check_empty = () => {
        if (formData.nama === ""){
            return false;
        }
        if (formData.start === ""){
            return false;
        }
        if (formData.end === ""){
            return false;
        }

        return true;
    }

      const handleChange = (e) => {
        // mengubah state saat nilai input berubah
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (event) =>{
        console.log(check_empty());
        alert(JSON.stringify(formData))
        if(check_empty()){
            event.preventDefault();
            await sendData()
            .then(success => {
                toast.success("Register Mitra Berhasil", {
                    position: "bottom-right",
                    hideProgressBar: true,
                    autoClose: 1000,
                    closeOnClick: true,
                    theme: "light",
                    transition: Bounce,
                    pauseOnHover: false,
                })
                navigate("/Mitra")
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
            setIsLoadingForm(false)
        }else{
            alert("Masih ada inputan kosong")
        }

    }

    return (
        <>
            {/* <ToastContainer /> */}
            <TopNavAdmin />
            <div className="font-poppins parent-form my-4 md:mt-24 mx-4 p-3 shadow-xl bg-white rounded-3xl lg:mt-32 lg:max-w-4xl md:container md:mx-auto max-w-5xl">
                <h1 className="text-2xl font-semibold mb-4 sm:mb-8 text-center">Tambah Mitra Editing/Coding</h1>
                <div className="the-form ">
                    

                    <div className="jenis-koseka sm:grid sm:grid-cols-2">
                        <div className="sm:ml-6 md:ml-3 ml-3 ">
                            <label className="text-sm"> Nama
                                <input 
                                    className='bg-[#F6F6F9]  mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                    name="nama"
                                    id="username"
                                    type="text" 
                                    placeholder='Nama'
                                    value={formData.nama}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>

                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Tugas
                                <select value={formData.tugas} className='bg-[#F6F6F9] mt-1 text-xs px-3 sm:ml-0 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72' name="tugas" 
                                    onChange={handleChange}>
                                    <option value="Editing" key="E">Editing</option>
                                    <option value="Coding" key="C">Coding</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="mulai-selesai sm:grid sm:grid-cols-2">
                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Mulai Kontrak
                                <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                    name="start"
                                    type="date" 
                                    value={formData.start}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>
                        
                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Selesai Kontrak
                                <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                    name="end"
                                    type="date" 
                                    value={formData.end}
                                    onChange={handleChange} 
                                />
                            </label>
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

export default AddMitra;