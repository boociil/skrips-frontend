import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/button";


function AddKegiatan() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        // inisialisasi state untuk menyimpan data form
        namaKegiatan: '',
        idKegiatan: '',
        jenisKegiatan: 'Sensus',
        tanggalMulai : '',
        targetSelesai: '',
        targetRB : '',
        targetEdcod: '',
        targetEntri : '',
        targetPemutakhiran: '',
        targetPencacahan: '',
        koseka:'Ada',
      });

    const check_empty = () => {
        if (formData.username === ""){
            return false;
        }
        if (formData.pass === ""){
            return false;
        }
        return true;
    }

      const handleChange = (e) => {
        // mengubah state saat nilai input berubah
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (event) =>{
        event.preventDefault();
        alert(JSON.stringify(formData));
        //const checkFill = check_empty();
        // if (checkFill){
        //     // Validasi username dan password ke backend, lalu buat
        //     navigate('/');
        // }else{
        //     alert("Form tidak boleh kosong");
        // } 
    }

    return (
        <div className="font-poppins parent-form my-4 md:mt-24 mx-4 p-3 shadow-xl bg-white rounded-3xl lg:mt-32 lg:max-w-4xl md:container md:mx-auto max-w-5xl">
            <h1 className="text-2xl font-semibold mb-4 sm:mb-8 text-center">Tambah Kegiatan</h1>
            <form>
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
                        <div className="sm:ml md:ml-3-6 ml-3 flex">
                            <label className="text-sm"> ID kegiatan
                                <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 lg:mx-auto py-2 mb-3 block rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500'
                                    name="idKegiatan"
                                    type="text" 
                                    placeholder='ID'
                                    value={formData.idKegiatan}
                                    onChange={handleChange} 
                                />
                            </label>
                            <button className="block rounded-lg bg-[#14CB11] text-white p-2 ml-4 sm:ml-12 max-h-9 mt-5 text-xs">Check ID</button>         
                        </div>
                    </div>
                </div>
                
                <div className="jenis-koseka grid grid-cols-2">
                    <div className="sm:ml-6 md:ml-3 ml-3">
                    <label className="text-sm"> Jenis kegiatan
                        <select value={formData.jenisKegiatan} className='bg-[#F6F6F9] mt-1 text-xs px-3 sm:ml-0 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  ' name="jenisKegiatan" onChange={handleChange}>
                            <option value="Sensus" key="Sensus">Sensus</option>
                            <option value="Survei" key="Survei">Survei</option>
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
                        <label className="text-sm"> Target Receiving Editing Coding
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
                        <label className="text-sm"> Target Receiving Entri
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
                
                
                <button onClick={handleSubmit} className="bg-[#418EC6] block mt-6 mx-auto w-28 text-white p-3 rounded-lg">Tambah</button>
            </form>
        </div>
    )
}

export default AddKegiatan