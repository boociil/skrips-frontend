import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/Navbar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Alert from "../components/Alert"


function AddMitra() {

    const backendUrl = process.env.REACT_APP_BACKEND_URL
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ loadingForm, setIsLoadingForm ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);
    const { id,nama, status, start, end } = useParams();
    const [ isValidated, setIsValidated ] = useState(false);
    const [formData, setFormData] = useState({
        // inisialisasi state untuk menyimpan data form
        nama: nama,
        tugas: status,
        start: start,
        end: end,
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
                    "id" : id
                }) 
            };
    
            fetch(backendUrl + 'edit_mitra' , requestOptions)
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

      const validate = () => {
        const dateStart = new Date(formData.start);
        const dateEnd = new Date(formData.end);

        if (dateEnd.getTime() < dateStart.getTime()){
            return false;
        }

        return true;
    }

      const handleSubmit = async (event) =>{

        if(check_empty()){
            if(validate()){
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
            }else{
                setIsValidated(true);
            }
            setIsLoadingForm(false)
        }else{
            setShowAlert(true);
        }

    }

    return (
        <>
            <TopNavAdmin />
            <Alert open={showAlert} setOpen={setShowAlert} isConfirm={false} msg={"Masih ada isian kosong!"} subMsg={"Silahkan lengkapi form tambah mitra dengan benar."}/>
            <Alert open={isValidated} setOpen={setIsValidated} isConfirm={false} msg={"Form Error!"} subMsg={"Silahkan isi form tambah mitra dengan benar."}/>
            <div className="font-poppins parent-form my-4 md:mt-24 mx-4 p-3 shadow-xl bg-white rounded-3xl lg:mt-32 lg:max-w-4xl md:container md:mx-auto max-w-5xl">
                <h1 className="text-2xl font-semibold mb-4 sm:mb-8 text-center">Edit Mitra</h1>
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
                                    <option value="Edcod" key="E">Editing Coding</option>
                                    <option value="Entri" key="C">Entri</option>
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