import { useNavigate } from "react-router-dom";

function ListKegiatan(props) {

    const navigate = useNavigate();

    let pos = props.position
    let class_name;
    if (pos === 'TOP'){
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4  hover:bg-slate-200 hover:rounded-lg hover:scale-105 transition duration-500 flex bg-white shadow-lg rounded-t-lg border-b-2 hover:border-slate-200 border-b-slate-200 max-w-5xl md:mx-auto'
    }else if (pos === 'MID'){
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4 hover:bg-slate-200 hover:rounded-lg hover:scale-105 transition duration-500 flex bg-white shadow-lg border-b-2 hover:border-slate-200 border-b-slate-300 max-w-5xl md:mx-auto'
    }else{
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4 hover:bg-slate-200 hover:rounded-lg hover:scale-105 transition duration-500 flex bg-white shadow-lg rounded-b-lg max-w-5xl md:mx-auto'
    }

    // Parse Tanggl


    let role_class;
    
    if (props.role.toLowerCase() === "admin"){
        role_class = 'bg-[#FFCAF6] text-[#FF00C7] rounded-md p-1 w-fit'
    } else if(props.role.toLowerCase() === "operator"){
        role_class = 'bg-[#CAE9FF] text-[#0075FF] rounded-md p-1 w-fit'
    } else if(props.role === "Pengawas"){
        role_class = 'bg-[#FFE3CA] text-[#CA7900] rounded-md p-1 w-fit'
    }else{
        role_class = 'text-[#418EC6]'
    }

    const divHandleClick = (id) => {
        navigate("/Users/" + props.username);
    }


    return (
        <div className={class_name} onClick={divHandleClick}>
            <div className="title px-3 py-2 w-full" >
                <div className=""><span className={props.status === 1 ? "lingkaran inline-block w-2 h-2 rounded-full bg-[#00FF57] mr-1 md:hidden" : "md:hidden lingkaran inline-block w-2 h-2 rounded-full bg-[#FF6056] mr-1"}></span>{props.username}</div>
                <div className="block text-slate-400 text-xs">Username</div>
            </div>
            <div className="tanggal hidden md:block px-3 py-2">
                <div className="overflow-hidden whitespace-nowrap text-overflow-ellipsis">{props.name}</div>
                <div className=" text-slate-400 text-xs">Nama</div>
            </div>
            <div className="status col-start-2 md:col-start-3 sm:block px-3 py-2">
                <div className="flex">
                    <div className="flex-grow">
                        <div className={role_class}>{props.role}</div>
                        {/* <div className=" text-slate-400 text-xs">Role</div> */}
                    </div>
                    {/* <span className="w-4 h-4 material-symbols-outlined md:hidden mr-5">
                        edit
                    </span> */}
                </div>
            </div>
            <div className="metode hidden col-start-4 md:block px-3 py-2">
                <div className="md:flex">
                    <div className="flex-grow">
                        <div className=""><span className={props.status === 1 ? "lingkaran inline-block w-2 h-2 rounded-full bg-[#00FF57] mr-1" : "lingkaran inline-block w-2 h-2 rounded-full bg-[#FF6056] mr-1"}></span>{props.status === 1 ? "Online" : "Offline"}</div>
                        <div className=" text-slate-400 text-xs">Status</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ListKegiatan;