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
        <div className="containter mx-auto px-4 w-1/2 font-poppins columns-2">
            <div className="bagian-kiri bg-white">
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
                    <button className="" type="submit">Submit</button>
                </form>
            </div>
            <div className="bagian-kanan bg-indigo-500">
                <img src={loginImg} alt='Gambar yang melambangkan monitoring' className='w-64 h-auto'></img>
            </div>
        </div>
        
    );
}

export default Login;