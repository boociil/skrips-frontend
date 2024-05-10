import { useState } from "react";
import { useCookies } from "react-cookie";


function GantiInfoUser({ username, isMyProfile, onClose }) {

    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [formData, setFormData] = useState({
        old: '',
        new: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can access form data from the state (formData) here
    };

    return(
        <div className="the-blur fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 font-poppins">
            <div className="container fixed z-50 flex justify-center items-center mt-40">
                <div className="box bg-white m-auto px-5 py-2 absolute top-0 rounded-lg">
                    <div className="x-button px-2 absolute right-3 cursor-pointer text-lg rounded-md font-bold bg-[#F5F4F4] hover:bg-red-500 hover:text-white" onClick={onClose}>x</div>
                    <div className="title mt-10">
                        <h2 className="text-center mb-8 font-medium">
                                Ganti Password
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="oldPass">Password Lama :
                                <input type="password" className="old-password bg-[#F5F4F4] rounded-md ml-1" name="old" value={formData.old} onChange={handleChange}/>
                            </label>
                            
                        </div>
                        <div className="mb-8">
                            <label htmlFor="newPass">Password Baru : </label>
                            <input type="password" className="new-password bg-[#F5F4F4] rounded-md ml-1" name="new" value={formData.new} onChange={handleChange} />
                        </div>

                        {
                            !isMyProfile ? (
                                <>
                                    <label htmlFor="role">Role : </label>
                                    <select name="role" id="role">
                                        <option value="Admin" key="Admin">Admin</option>
                                        <option value="Pengawas" key="Pengawas">Pengawas</option>
                                        <option value="Operator" key="Operator">Pengawas</option>
                                    </select>
                                </>
                            ) : (<></>)
                        }
                        <div className="button-div flex justify-center mb-1">
                            <button type="submit" className="px-2 py-1 bg-emerald-500 text-white rounded-lg">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default GantiInfoUser;