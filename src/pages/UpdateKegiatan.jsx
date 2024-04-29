import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";


function UpdateKegiatan() {
    
    const id = useParams()

    const navigate = useNavigate();
    const [ cookies, setCookie, removeCookie ] = useCookies(['token']);
    const [ chekedId, setChekedId ] = useState();
    const [ loading, setIsLoading ] = useState(false);
    const [ dataKegiatan, setDataKegiatan ] = useState()

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

      useEffect(() => {

        const fetchData = () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
            
            fetch('http://localhost:3001/get_info/' + id.id , requestOptions)
            .then(response => response.json())
            .then(data => {
                setDataKegiatan(data);
                setFormData(prevState => ({
                    ...prevState, // Menyalin state formData yang ada
                    [formData.namaKegiatan]: data.nama // Mengatur nilai idKegiatan ke newValue
                }));
                setFormData(prevState => ({
                    ...prevState, // Menyalin state formData yang ada
                    [formData.idKegiatan]: data.id // Mengatur nilai idKegiatan ke newValue
                }));
                setFormData(prevState => ({
                    ...prevState, // Menyalin state formData yang ada
                    [formData.jenisKegiatan]: data.jenis // Mengatur nilai idKegiatan ke newValue
                }));
                setFormData(prevState => ({
                    ...prevState, // Menyalin state formData yang ada
                    [formData.koseka]: data.koseka // Mengatur nilai idKegiatan ke newValue
                }));
                setFormData(prevState => ({
                    ...prevState, // Menyalin state formData yang ada
                    [formData.tanggalMulai]: data.tanggal_mulai // Mengatur nilai idKegiatan ke newValue
                }));
                setFormData(prevState => ({
                    ...prevState, // Menyalin state formData yang ada
                    [formData.targetSelesai]: data.target_selesai // Mengatur nilai idKegiatan ke newValue
                }));
                setFormData(prevState => ({
                    ...prevState, // Menyalin state formData yang ada
                    [formData.targetEdcod]: data.target_edcod // Mengatur nilai idKegiatan ke newValue
                }));
                setFormData(prevState => ({
                    ...prevState, // Menyalin state formData yang ada
                    [formData.targetRB]: data.target_pengdok // Mengatur nilai idKegiatan ke newValue
                }));
                setFormData(prevState => ({
                    ...prevState, // Menyalin state formData yang ada
                    [formData.targetEntri]: data.target_entri // Mengatur nilai idKegiatan ke newValue
                }));
                console.log('  ',data);
            });
        }
        
        fetchData();
      }, [])

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
                    "tgl_mulai" : formData.tanggalMulai,
                    "target_selesai": formData.targetSelesai,
                    "koseka" : formData.koseka,
                    "target_pengdok" : formData.targetRB,
                    "target_edcod" : formData.targetEdcod,
                    "target_entri" : formData.targetEntri,
                    }) 
            };
            
            fetch('http://localhost:3001/add_kegiatan', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.msg === "Berhasil") {
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


        // AutoFill IDKegiatan
        // if (e.target.name === "namaKegiatan"){
        //     console.log("target name berubah");
        //     const arr_split = formData["namaKegiatan"].split(" ")
        //     console.log("arr split : ", arr_split);
        //     let the_id = ""
        //     arr_split.forEach(element => {
        //         if(isAllDigits(element)){
        //             the_id += element;
        //         }else{
        //             the_id += element[0];
        //         }
        //     });
        //     console.log(the_id);
        //     setFormData(prevState => ({
        //         ...prevState, // Menyalin state formData yang ada
        //         idKegiatan: the_id // Mengatur nilai idKegiatan ke newValue
        //       }));
        // }
      };

      const handleSubmit = async (event) =>{
        if (check_empty()){
            event.preventDefault();
            // alert(JSON.stringify(formData));
            // await sendData()
            // .then(success => {
            //     if (formData.jenisKegiatan === "1"){

            //         fill_sensus(formData.idKegiatan);
            //         navigate("/AssignPetugas/" + formData.idKegiatan);
            //     }else{
            //         navigate("/Sampel/" + formData.idKegiatan);
            //     }
            // })
            // .catch(error => {
            //     const id_input = document.getElementById('id-kegiatan');
            //     const ket_id = document.getElementById('ket-id')
            //     ket_id.innerHTML = "*" + error
            //     id_input.classList.add("border-2");
            //     id_input.classList.add("border-red-500");
            //     ket_id.classList.remove("hidden");
            // })
            setIsLoading(false);
        }else{
            alert("Masih ada isian kosong")
        }
    }

    return (
        <>
            <TopNavAdmin/>
            <div className="font-poppins parent-form my-4 md:mt-24 mx-4 p-3 shadow-xl bg-white rounded-3xl lg:mt-32 lg:max-w-4xl md:container md:mx-auto max-w-5xl">
                <h1 className="text-2xl font-semibold mb-4 sm:mb-8 text-center">Update Kegiatan</h1>
                
                    <div className="nama-id md:grid md:grid-cols-2 ">
                        <div className="sm:ml-6 md:ml-3 ml-3 ">
                            <label className="lg:col-start-2 text-sm"> Nama kegiatan
                                <input 
                                        className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
                                        name="namaKegiatan"
                                        type="text" 
                                        placeholder='nama'
                                        value={formData.namaKegiatan}
                                        onChange={handleChange} 
                                />
                            </label>
                        </div>

                        <div className="id-kegiatan mb-3">
                            <div className="sm:ml md:ml-3-6 ml-3">
                                <label className="text-sm w-full"> ID kegiatan
                                    <input 
                                        className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72'
                                        name="idKegiatan"
                                        id="id-kegiatan"
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
                            <select value={formData.jenisKegiatan} className='bg-[#F6F6F9] mt-1 text-xs px-3 sm:ml-0 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  ' name="jenisKegiatan" onChange={handleChange}>
                                <option value="1" key="Sensus">Sensus</option>
                                <option value="2" key="Survei">Survei</option>
                            </select>
                        </label>
                        </div>
                        

                        <div className="sm:ml-6 md:ml-3 ml-3">
                            <label className="text-sm"> Koseka
                                <select value={formData.koseka} className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  ' name="koseka" onChange={handleChange}>
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