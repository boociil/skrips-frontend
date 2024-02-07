function ListKegiatan(props) {

    let pos = props.position
    let class_name;
    if (pos === 'TOP'){
        class_name = 'hover:bg-slate-200 flex bg-white shadow-lg rounded-t-lg border-b-2 border-b-slate-300 max-w-3xl'
    }else if (pos === 'MID'){
        class_name = 'hover:bg-slate-200 flex bg-white shadow-lg border-b-2 border-b-slate-300 max-w-3xl'
    }else{
        class_name = 'hover:bg-slate-200 flex bg-white shadow-lg rounded-b-lg max-w-3xl'
    }

    return (
        <div className={class_name}>
            <div className="title px-3 py-2">
                <div className="">{props.name}</div>
                <div className="block text-slate-400 text-xs">{props.id}</div>
            </div>
            <div className="tanggal hidden md:block px-3 py-2">
                <div className=" ">{props.tgl}</div>
                <div className=" text-slate-400 text-xs">Tanggal Mulai</div>
            </div>
            <div className="status hidden sm:block px-3 py-2">
                <div className=" ">{props.status}</div>
                <div className=" text-slate-400 text-xs">Status</div>
            </div>
            <div className="metode hidden md:block px-3 py-2">
                <div className=" ">{props.metode}</div>
                <div className=" text-slate-400 text-xs">Metode</div>
            </div>

        </div>
    )
}

export default ListKegiatan;