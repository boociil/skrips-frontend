import { useNavigate } from "react-router-dom";

function ListKegiatan(props) {

    const navigate = useNavigate();

    let pos = props.position
    let class_name;
    if (pos === 'TOP'){
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4  hover:bg-slate-200 hover:scale-105 transition duration-500 flex bg-white shadow-lg rounded-t-lg border-b-2 border-b-slate-300 max-w-5xl md:mx-auto'
    }else if (pos === 'MID'){
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4 hover:bg-slate-200 hover:scale-105 transition duration-500 flex bg-white shadow-lg border-b-2 border-b-slate-300 max-w-5xl md:mx-auto'
    }else{
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4 hover:bg-slate-200 hover:scale-105 transition duration-500 flex bg-white shadow-lg rounded-b-lg max-w-5xl md:mx-auto'
    }

    // Parse Tanggl

    let method;
    if (props.metode == 1){
        method = 'CAPI';
    }else{
        method= 'PAPI';
    }

    let status;
    let status_num = props.status
    let status_class;

    if (status_num == '1'){
        status = 'Pemutakhiran';
    }else if(status_num == '2'){
        status = 'Pencacahan';
    }else if (status_num == '3'){
        status = 'Pengolahan';
    }else{
        status = 'Selesai';
    }
    
    if (status === 'Pencacahan'){
        status_class = 'text-[#14CB11]'
    } else if(status === 'Pemutakhiran'){
        status_class = 'text-[#F647D0]'
    } else if(status === 'Pengolahan'){
        status_class = 'text-[#E3A03B]'
    }else{
        status_class = 'text-[#418EC6]'
    }

    const divHandleClick = (id) => {
        navigate(id);
        console.log("Diklik " + id);
        console.log("id : " + id);
    }

    return (
        <div className={class_name} onClick={divHandleClick.bind(this,props.id)} >
            <div className="title px-3 py-2 w-full" >
                <div className="">{props.name}</div>
                <div className="block text-slate-400 text-xs">{props.id}</div>
            </div>
            <div className="tanggal hidden md:block px-3 py-2">
                <div className=" ">{props.tgl}</div>
                <div className=" text-slate-400 text-xs">Mulai Kegiatan</div>
            </div>
            <div className="status col-start-2 md:col-start-3 sm:block px-3 py-2">
                <div className={status_class}>{status}</div>
                <div className=" text-slate-400 text-xs">Status</div>
            </div>
            <div className="metode hidden col-start-4 md:block px-3 py-2">
                <div className="">{method}</div>
                <div className=" text-slate-400 text-xs">Metode</div>
            </div>
        </div>
    )
}

export default ListKegiatan;