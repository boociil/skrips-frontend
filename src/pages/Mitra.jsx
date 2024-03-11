import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../components/buttonAdd";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";


function Users() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleClick = () => {
        navigate('Register');
    }

    useEffect(() => {
        //const theHtml = document.querySelector('#root')
        //theHtml.classList.add('bg-white');
    }, []);

    const data = [
        {username:"Bambang Sutaryo", status: "Editing" , startKontrak:"Oct 1,2022", endKontrak:"Jun 1, 2023" },
        {username:"M Jaizan", status: "Editing", startKontrak:"Oct 1,2022", endKontrak:"Jun 1, 2023" },
        {username:"Faisal Kamil", status: "Editing", startKontrak:"Oct 1,2022", endKontrak:"Jun 1, 2023" },
        {username:"Anugrah Surya Atmaja", status: "Coding", startKontrak:"Oct 1,2022", endKontrak:"Jun 1, 2023" },
        {username:"Anugrah Surya Atmaja", status: "Coding", startKontrak:"Oct 1,2022", endKontrak:"Jun 1, 2023" },
        {username:"Anugrah Surya Atmaja", status: "Coding", startKontrak:"Oct 1,2022", endKontrak:"Jun 1, 2023" },
        {username:"Anugrah Surya Atmaja", status: "Coding", startKontrak:"Oct 1,2022", endKontrak:"Jun 1, 2023" },
    ]

    const getNav = () => {
        if (cookies.role === 'admin'){
            return (
                <TopNavAdmin />
            )
        }
        if (cookies.role === 'pengawas'){
            return (
                <TopNavAdmin />
            )
        }
        if (cookies.role === 'operator'){
            return (
                <TopNavAdmin />
            )
        }
    }

    return (
        <>
            <TopNavAdmin />
            <div className="font-poppins md:mt-28 mx-auto max-w-4xl">
                <h2 className="ml-4 mt-6 text-xl">Mitra Management</h2>

                <div className="the-table mx-auto mt-4 md:mt-8 ml-6">
                    <div className="title mx-auto grid grid-cols-2 md:grid-cols-4 text-slate-600 text-xs mb-4">
                        <div className="col-start-1">Nama</div>
                        <div className="col-start-2 md:block text-center">Status</div>
                        <div className="hidden md:block md:col-start-3 ">Mulai Kontrak</div>
                        <div className="hidden md:col-start-4 md:block">Selesai Kontrak</div>
                    </div>
                    <div className="content  text-slate-600 text-sm">
                        {data.map((item, index) => (
                            <div key={index} className="my-1 grid grid-cols-2 md:grid-cols-4">
                                <div className="cols-start-1 max-h-6 overflow-hidden">{item.username}</div>
                                <div className="cols-start-2 text-center">{item.status} </div>
                                <div className="hidden md:block cols-start-3 w-fit max-h-8 p-1 rounded-lg">{item.startKontrak}</div>
                                <div className="hidden md:block md:cols-start-4">{item.endKontrak}</div>
                            </div>
                            ))}
                    </div>
                </div>
                <ButtonAdd click = {handleClick} />
            </div>
        </>
        
    )
}

export default Users;