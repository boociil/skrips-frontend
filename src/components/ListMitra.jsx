import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


function ListMitra(props) {

    const [ cookie, setCookie, removeCookie ] = useCookies();
    const navigate = useNavigate();

    const editClick = (id) => {
        navigate("/Mitra/Edit/" + props.id + "/" + props.nama + "/" + props.status + "/" + props.start + "/" + props.end);
    }

    const start = props.start
    const end = props.end

    function setToMidnight(date) {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    }

    const startToCompare = new Date(start);
    const endToCompare = new Date(end);
    const now = new Date();

    const startToCompareMd = setToMidnight(startToCompare)
    const endToCompareMd = setToMidnight(endToCompare)
    const nowMd = setToMidnight(now)

    let dark = false;
    if (startToCompareMd > nowMd){
        dark = true;
    }
    if (endToCompareMd < nowMd){
        dark = true;
    }

    let isAdmin = false;

    if(cookie.role === "Admin"){
        isAdmin = true
    }

    let pos = props.position
    let class_name;
    if (pos === 'TOP'){
        class_name = 'grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4  transition duration-500 bg-white flex shadow-lg rounded-t-lg border-b-2 hover:border-slate-200 border-b-slate-300 w-full'
    }else if (pos === 'MID'){
        class_name = 'grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4 transition duration-500 bg-white flex shadow-lg border-b-2 hover:border-slate-200 border-b-slate-300 w-full'
    }else{
        class_name = 'grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4 transition duration-500 bg-white flex shadow-lg rounded-b-lg w-full'
    }

    if (dark){
        class_name += " "
    }else {
        class_name += " "
    }

    // Parse Tanggl

    return (
        <div className="sm:flex max-w-5xl md:mx-auto">
            <div className={class_name} >
                <div className="title px-3 py-2 w-full" >
                    <div className="">{props.nama}</div>
                    <div className="block text-slate-400 text-xs">Nama</div>
                </div>
                <div className="tanggal  px-3 py-2">
                    <div className="overflow-hidden whitespace-nowrap text-overflow-ellipsis">{props.status}</div>
                    <div className=" text-slate-400 text-xs">Status</div>
                </div>
                <div className="status col-start-2 hidden md:block md:col-start-3 px-3 py-2">
                    <div className="flex">
                        <div className="flex-grow">
                            <div className="">{props.start}</div>
                            <div className=" text-slate-400 text-xs">Start</div>
                        </div>
                    </div>
                </div>
                <div className="metode hidden col-start-4 md:block px-3 py-2">
                    <div className="md:flex">
                        <div className="flex-grow">
                            <div className="">{props.end}</div>
                            <div className=" text-slate-400 text-xs">End</div>
                        </div>
                    </div>
                </div>
            </div>

            {
                isAdmin ? (
                    <>
                        <div className="action ml-3 hidden md:block items-center justify-center ">
                            <div className="edit hover:bg-slate-200 p-1 transition duration-500 cursor-pointer bg-white shadow-lg rounded-lg group" onClick={editClick}>
                                <div className="w-fit mx-auto" >
                                    <span className="material-symbols-outlined px-1 hidden md:block group-hover:opacity-0 transition duration-500">
                                        edit
                                    </span>
                                    <div className="text-slate-400 text-xs group-hover:-translate-y-3 group-hover:text-black transition duration-500">
                                        Edit
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </>
                ) : (
                    <></>
                )
            }

        </div>
        
    )
}

export default ListMitra;