import { useState } from "react";
import Button from "../components/button";

function Login() {
    
    const [formData, setFormData] = useState({
        // inisialisasi state untuk menyimpan data form
        username: '',
        fn: '',
        ln: '',
        pass: '',
        gender:'',
        confpass:'',
        role:'',
        status:''
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
        <div>
            <form onSubmit={handleSubmit}>
                <label>First Name : 
                    <input
                        name="fn"
                        type="text" 
                        value={formData.fn}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label>Last Name : 
                    <input
                        name="ln"
                        type="text" 
                        value={formData.ln}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label>Username : 
                    <input
                        name="username"
                        type="text" 
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <Button />
                <br/>
                <label>Password : 
                    <input
                        name="pass"
                        type="password" 
                        value={formData.pass}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label>Confirm Password : 
                    <input
                        name="confpass"
                        type="password" 
                        value={formData.confpass}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label>Role : 
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value={"Operator"}>Operator</option>
                        <option value={"Pengawas"}>Pengawas</option>
                        <option value={"Admin"}>Admin</option>
                    </select>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;