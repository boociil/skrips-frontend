import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";



function AddKegiatan() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [formData, setFormData] = useState({
        // inisialisasi state untuk menyimpan data form
        username: '',
        fn: '',
        ln: '',
        pass: '',
        gender:'Laki-laki',
        confpass:'',
        role:'Operator',
        status:''
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
        console.log(check_empty());
        if(check_empty()){
            event.preventDefault();
            alert(JSON.stringify(formData));
        }else{
            alert("Masih ada inputan kosong")
        }
        
        //const checkFill = check_empty();
        // if (checkFill){
        //     // Validasi username dan password ke backend, lalu buat
        //     navigate('/');
        // }else{
        //     alert("Form tidak boleh kosong");
        // } 
    }

    return (
        <>
            <TopNavAdmin />
            <div className="font-poppins parent-form my-4 md:mt-24 mx-4 p-3 shadow-xl bg-white rounded-3xl lg:mt-32 lg:max-w-4xl md:container md:mx-auto max-w-5xl">
            <h1 className="text-2xl font-semibold mb-4 sm:mb-8 text-center">Tambah User</h1>
            <form>
                <div className="nama-id md:grid md:grid-cols-2 ">
                    <div className="sm:ml-6 md:ml-3 ml-3 ">
                        <label className="lg:col-start-2 text-sm"> First name
                            <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72  '
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

                <div className="id-kegiatan mb-3">
                        <div className="sm:ml-6 md:ml-3 ml-3 flex">
                            <label className="text-sm"> Username
                                <input 
                                    className='bg-[#F6F6F9] mt-1 text-xs px-3 md:mx-0 lg:mx-auto py-2 mb-3 block rounded-lg focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72'
                                    name="username"
                                    type="text" 
                                    placeholder='Username'
                                    value={formData.username}
                                    onChange={handleChange} 
                                />
                            </label>
                        <button className="block rounded-lg bg-[#14CB11] text-white p-2 ml-4 sm:ml-12 max-h-9 mt-5 text-xs">Check <span className="hidden md:inline">Username</span></button>         
                    </div>
                </div>
            
                <div className="jenis-koseka md:grid md:grid-cols-2">
                    <div className="sm:ml-6 md:ml-3 ml-3">
                    <label className="text-sm"> Jenis Kelamin
                        <select value={formData.gender} className='bg-[#F6F6F9] mt-1 text-xs px-3 sm:ml-0 md:mx-0 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 max-w-72' name="gender" onChange={handleChange}>
                            <option value="Laki-laki" key="Laki-laki">Laki-laki</option>
                            <option value="Perempuan" key="Perempuan">Perempuan</option>
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
                                placeholder='First name'
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
                                    placeholder='Last name'
                                    value={formData.confpass}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>
                    </div>
                </div>
                
                
                <button onClick={handleSubmit} className="bg-[#418EC6] block mt-6 mx-auto w-28 text-white p-3 rounded-lg">Tambah</button>
            </form>
        </div>
        </>
        
    )
}

export default AddKegiatan