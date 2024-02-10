function ListKegiatan(props) {

    let pos = props.position
    let class_name;
    if (pos === 'TOP'){
        class_name = 'grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4  hover:bg-slate-200 hover:scale-105 transition duration-500 flex bg-white shadow-lg rounded-t-lg border-b-2 border-b-slate-300 max-w-5xl md:mx-auto'
    }else if (pos === 'MID'){
        class_name = 'grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4 hover:bg-slate-200 hover:scale-105 transition duration-500 flex bg-white shadow-lg border-b-2 border-b-slate-300 max-w-5xl md:mx-auto'
    }else{
        class_name = 'grid grid-rows-1 text-xs sm:text-sm grid-cols-2 md:grid-cols-4 hover:bg-slate-200 hover:scale-105 transition duration-500 flex bg-white shadow-lg rounded-b-lg max-w-5xl md:mx-auto'
    }

    let status = props.status
    let status_class;
    if (status === 'Pencacahan'){
        status_class = 'text-[#14CB11]'
    } else if(status === 'Pemutakhiran'){
        status_class = 'text-[#F647D0]'
    } else if(status === 'Pengolahan'){
        status_class = 'text-[#E3A03B]'
    }else{
        status_class = 'text-[#418EC6]'
    }

    return (
        <div className={class_name}>
            <div className="title px-3 py-2 w-full">
                <div className="">{props.name}</div>
                <div className="block text-slate-400 text-xs">{props.id}</div>
            </div>
            <div className="tanggal hidden md:block px-3 py-2">
                <div className=" ">{props.tgl}</div>
                <div className=" text-slate-400 text-xs">Tanggal Mulai</div>
            </div>
            <div className="status col-start-2 md:col-start-3 sm:block px-3 py-2">
                <div className={status_class}>{props.status}</div>
                <div className=" text-slate-400 text-xs">Status</div>
            </div>
            <div className="metode hidden col-start-4 md:block px-3 py-2">
                <div className="">{props.metode}</div>
                <div className=" text-slate-400 text-xs">Metode</div>
            </div>

        </div>
    )
}

export default ListKegiatan;