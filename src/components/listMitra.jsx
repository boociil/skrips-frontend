import { useNavigate } from "react-router-dom";

function ListMitra(props) {

    const navigate = useNavigate();

    let pos = props.position
    let class_name;
    if (pos === 'TOP'){
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4  hover:bg-slate-200 hover:rounded-lg hover:scale-105 transition duration-500 flex bg-white shadow-lg rounded-t-lg border-b-2 hover:border-slate-200 border-b-slate-300 max-w-5xl md:mx-auto'
    }else if (pos === 'MID'){
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4 hover:bg-slate-200 hover:rounded-lg hover:scale-105 transition duration-500 flex bg-white shadow-lg border-b-2 hover:border-slate-200 border-b-slate-300 max-w-5xl md:mx-auto'
    }else{
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4 hover:bg-slate-200 hover:rounded-lg hover:scale-105 transition duration-500 flex bg-white shadow-lg rounded-b-lg max-w-5xl md:mx-auto'
    }

    // Parse Tanggl

    return (
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
    )
}

export default ListMitra;