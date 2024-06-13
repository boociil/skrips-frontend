import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/Navbar";
import Alert from "../components/Alert";
import { AuthContext } from "../components/AuthContext";

function UpdateKegiatan() {
    
    const id = useParams()
    const { isOpen, setIsOpen } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ cookies, setCookie, removeCookie ] = useCookies(['token']);
    const [ chekedId, setChekedId ] = useState();
    const [ loading, setIsLoading ] = useState(false);
    const [ dataKegiatan, setDataKegiatan ] = useState();
    const [ isValidated, setIsValidated ] = useState(false);
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const [formData, setFormData] = useState({
        // inisialisasi state untuk menyimpan data form
        namaKegiatan: '',
        idKegiatan: '',
        jenisKegiatan: '',
        tanggalMulai : '',
        targetSelesai: '',
        targetRB : '',
        targetEdcod: '',
        targetEntri : '',
        targetPemutakhiran: '',
        targetPencacahan: '',
        koseka:'',
      });

      const formatDate = (date) => {
        const d = new Date(date);
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
      };

      useEffect(() => {

        const fetchData = () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
            
            fetch(backendUrl + 'get_info/' + id.id , requestOptions)
            .then(response => response.json())
            .then(data => {
                setDataKegiatan(data);
                const tanggalMulai = formatDate(data[0].tanggal_mulai)
                const targetSelesai = formatDate(data[0].target_selesai)
                const targetRB = formatDate(data[0].target_pengdok)
                const targetEdcod = formatDate(data[0].target_edcod)
                const targetEntri = formatDate(data[0].target_entri)
                setFormData(prevState => ({
                    ...prevState,
                    namaKegiatan: data[0].nama,
                    idKegiatan: data[0].id,
                    jenisKegiatan: data[0].jenis,
                    tanggalMulai: tanggalMulai,
                    targetSelesai: targetSelesai,
                    targetRB: targetRB,
                    targetEdcod: targetEdcod,
                    targetEntri: targetEntri,
                    targetPemutakhiran: data[0].targetPemutakhiran,
                    targetPencacahan: data[0].targetPencacahan,
                    koseka: data[0].koseka,
                  }));
            });
        }
        
        fetchData();
      }, []);


      const validate = () => {
        const dateStart = new Date(formData.tanggalMulai);
        const dateEnd = new Date(formData.targetSelesai);
        
        const dateRB = new Date(formData.targetRB)
        const dateEdcod = new Date(formData.targetEdcod)
        const dateEntri = new Date(formData.targetEntri)

        if (dateEnd.getTime() < dateStart.getTime()){
            return false;
        }

        if (dateEdcod.getTime() < dateRB.getTime()){
            return false;
        }

        if (dateEntri.getTime() < dateRB.getTime() || dateEntri.getTime() < dateEdcod.getTime()){
            return false;
        }

        if (dateEnd.getTime() < dateRB.getTime() || dateEnd.getTime() < dateEdcod.getTime() || dateEnd.getTime() < dateEntri.getTime()){
            return false;
        }

        return true;
    }

    const sendData = () => {
        setIsLoading(true);
        return new Promise((resolve,reject) => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan,
                    'token' : cookies["token"],
                },
                body: JSON.stringify({ 
                    "id" : formData.idKegiatan,
                    "nama" : formData.namaKegiatan,
                    "jenis" : formData.jenisKegiatan,
                    "tanggal_mulai" : formData.tanggalMulai,
                    "target_selesai": formData.targetSelesai,
                    "koseka" : formData.koseka,
                    "target_pengdok" : formData.targetRB,
                    "target_edcod" : formData.targetEdcod,
                    "target_entri" : formData.targetEntri,
                    }) 
            };
            
            fetch( backendUrl + 'update_kegiatan', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.msg === "Success") {
                    resolve(true);
                } else {
                    reject(data.msg);
                }
            });
        })
    }

    const check_empty = () => {
        if (formData.namaKegiatan === ""){
            return false;
        }
        if (formData.idKegiatan === ""){
            return false;
        }
        if (formData.jenisKegiatan === ""){
            return false;
        }
        if (formData.tanggalMulai === ""){
            return false;
        }
        if (formData.targetSelesai === ""){
            return false;
        }
        if (formData.targetRB === ""){
            return false;
        }
        if (formData.targetEdcod === ""){
            return false;
        }
        if (formData.targetEntri === ""){
            return false;
        }
        return true;
    }
       
      const handleChange = (e) => {

        function isAllDigits(str) {
            // Mengecek apakah string hanya terdiri dari angka 0-9
            return /^\d+$/.test(str);
        }

        // mengubah state saat nilai input berubah
        setFormData(prevState => ({
            ...prevState, // Menyalin state formData yang ada
            [e.target.name]: e.target.value // Mengatur nilai idKegiatan ke newValue
          }));
      };

      const handleSubmit = async (event) =>{
        if (check_empty()){
            if (validate()){
                event.preventDefault();
                await sendData()
                .then(success => {
                    navigate("/Rekap" );
                })
                .catch(error => {
    
                })
                setIsLoading(false);
            }else{
                setIsValidated(true);
            }
        }else{
            alert("Masih ada isian kosong")
        }
    }

    return (
        <>
            <TopNavAdmin/>
            <Alert open={isValidated} setOpen={setIsValidated} isConfirm={false} msg={"Form Error!"} subMsg={"Silahkan isi form update kegiatan dengan benar."}/>
            <div className="font-poppins parent-form my-4 md:mt-24 mx-4 p-3 shadow-xl bg-white rounded-3xl lg:mt-32 lg:max-w-4xl md:container md:mx-auto max-w-5xl" onClick={() => setIsOpen(false)}>
                <h1 className="text-2xl font-semibold mb-4 sm:mb-8 text-center">Edit Kegiatan</h1>
                
                    <div className="nama-id md:grid md:grid-cols-2 ">
                        <div className="sm:ml-6 md:ml-3 ml-3 ">
                            <label className="lg:col-start-2 text-sm"> Nama kegiatan
                                <input 
                                        className='bg-[#F6F6F9] opacity-50 mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                        name="namaKegiatan"
                                        type="text" 
                                        placeholder='nama'
                                        value={formData.namaKegiatan}
                                        onChange={handleChange} 
                                        disabled
                                />
                            </label>
                        </div>

                        <div className="id-kegiatan mb-3">
                            <div className="sm:ml md:ml-3-6 ml-3">
                                <label className="text-sm w-full"> ID kegiatan
                                    <input 
                                        className='bg-[#F6F6F9] opacity-50 mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72'
                                        name="idKegiatan"
                                        id="idKegiatan"
                                        type="text" 
                                        placeholder='ID'
                                        value={formData.idKegiatan}
                                        onChange={handleChange} 
                                        disabled
                                    />
                                </label>    
                                <div className="ket-id text-xs text-red-500 hidden" id="ket-id"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="jenis-koseka grid grid-cols-2">
                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Jenis kegiatan
                                <select value={formData.jenisKegiatan} className='bg-[#F6F6F9] opacity-50 mt-1 text-xs px-3 sm:ml-0 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  ' name="jenisKegiatan" onChange={handleChange} disabled>
                                    <option value="1" key="Sensus">Sensus</option>
                                    <option value="2" key="Survei">Survei</option>
                                </select>
                            </label>
                        </div>
                        

                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Koseka
                                <select value={formData.koseka} className='bg-[#F6F6F9] opacity-50 mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  ' name="koseka" onChange={handleChange} disabled>
                                    <option value="Ada" key="Ada">Ada</option>
                                    <option value="Tidak Ada" key="Tidak Ada">Tidak Ada</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="mulai-selesai grid grid-cols-2">
                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Mulai Kegiatan
                                <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                    name="tanggalMulai"
                                    type="date" 
                                    value={formData.tanggalMulai}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>
                        
                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Target Selesai
                                <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                    name="targetSelesai"
                                    type="date" 
                                    value={formData.targetSelesai}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>
                    </div>

                    <div className="target md:grid md:grid-cols-3">
                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Target Receiving Batching
                                <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 lg:mx-auto py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                    name="targetRB"
                                    type="date" 
                                    value={formData.targetRB}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>
                        

                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Target Editing Coding
                                <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 lg:mx-auto py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                    name="targetEdcod"
                                    type="date" 
                                    value={formData.targetEdcod}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>
                        
                        
                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Target Entri
                                <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 lg:mx-auto py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                    name="targetEntri"
                                    type="date" 
                                    value={formData.targetEntri}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>
                    </div>
                    
                    
                    <button onClick={handleSubmit} className="bg-[#418EC6] hover:bg-sky-500 block mt-6 mx-auto w-28 text-white p-3 rounded-lg">
                    { loading ? (
                            <>
                                Loading
                            </>
                        ) : (
                            <>
                                Update
                            </>
                        )
                    }
                    </button>
            </div>
        </>
    )
}

export default UpdateKegiatan;