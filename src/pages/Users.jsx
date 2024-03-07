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
        {username:"ryan123", firstName:"Ryan", lastName:"Ardiansyah",Role:"Admin", status:"1"},
        {username:"opss3", firstName:"Ryan", lastName:"Ardiansyah",Role:"Operator", status:"1"},
        {username:"haha12", firstName:"Ryan", lastName:"Ardiansyah",Role:"Pengawas", status:"1"},
        {username:"Fate222", firstName:"Ryan", lastName:"Ardiansyah",Role:"Admin", status:"0"},
    ]

    function getClassByRole(Role) {
        if(Role.toLowerCase() === 'admin'){
            return 'bg-[#FFCAF6] text-[#FF00C7]';
        }else if(Role.toLowerCase() === 'operator'){
            return 'bg-[#CAE9FF] text-[#0075FF]';
        }else{
            return 'bg-[#FFE3CA] text-[#CA7900]';
        }
    }

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
            {getNav()}
            <div className="font-poppins md:mt-28 mx-auto max-w-4xl">
                <h2 className="ml-6 mt-6">Users Management</h2>

                <div className="the-table mx-auto mt-4 md:mt-8 ml-4">
                    <div className="title mx-auto grid grid-cols-3 md:grid-cols-5 text-slate-600 text-xs mb-4">
                        <div className="col-start-1">username</div>
                        <div className=" hidden md:block md:col-start-2">Full Name</div>
                        <div className="col-start-2 md:col-start-3">Role</div>
                        <div className="hidden md:col-start-4 md:block">Status</div>
                        <div className="col-start-3 md:col-start-5">Action</div>
                    </div>
                    <div className="content  text-slate-600 text-sm md:grid-cols-5">
                        {data.map(item => (
                            <div key={item.username} className="my-1 grid grid-cols-3 md:grid-cols-5">
                                <div className="cols-start-1">{item.username}</div>
                                <div className="cols-start-2">{item.firstName + " " +item.lastName} </div>
                                <div className={"cols-start-3 w-fit p-1 rounded-lg " + getClassByRole(item.Role)}>{item.Role}</div>
                                <div className="hidden md:block md:cols-start-4"><span className={item.status === "1" ? "lingkaran inline-block w-2 h-2 rounded-full bg-[#00FF57] mr-1" : "Olingkaran inline-block w-2 h-2 rounded-full bg-[#FF6056] mr-1"}></span>{item.status === "1" ? "Online" : "Offline"}</div>
                                
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