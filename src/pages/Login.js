import loginImg from '../img/login.png'
import { useState } from "react";

function Login() {
    
    const [formData, setFormData] = useState({
        // inisialisasi state untuk menyimpan data form
        username: '',
        pass: '',
      });


    const handleChange = (e) => {
        // mengubah state saat nilai input berubah
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = (event) =>{
        event.preventDefault();
        alert(JSON.stringify(formData));
    }

    return (
        <div className="border-2 border-black containter mx-auto w-1/2 font-poppins columns-2 bg-white rounded-md shadow-xl">
            <div className="bagian-kiri border-2 border-black  box-border container bg-red-400">
                <div className='form border-2 border-black '>
                    <div className='container mx-auto pb-2.5 border-2 border-black '>
                        <p className='text-3xl'>Welcome to Monitoring Site</p>
                        <p>Tell us who you are</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label>Username : 
                            <input
                                name="username"
                                type="text" 
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </label>
                        <br/>
                        <label>Password : 
                            <input
                                name="pass"
                                type="password" 
                                value={formData.pass}
                                onChange={handleChange}
                            />
                        </label>
                        <br></br>
                        <button className="" type="submit">Login</button>
                    </form>
                </div>
            </div>
            <div className="bagian-kanan border-2 border-black bg-indigo-500">
                <img src={loginImg} alt='Gambar yang melambangkan monitoring' className='w-64 h-auto'></img>
            </div>
        </div>
        
    );
}

export default Login;