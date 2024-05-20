import { useNavigate } from "react-router-dom";

function ListActivity(props) {

    // props : 
    // position
    // time
    // activity

    console.log(props.ket);

    const convert_bulan = (b) => {
        const the_b = (
            {
                "1" : "Jan",
                "2" : "Feb",
                "3" : "Mar",
                "4" : "Apr",
                "5" : "Mei",
                "6" : "Jun",
                "7" : "Jul",
                "8" : "Ags",
                "9" : "Sep",
                "10" : "Okt",
                "11" : "Nov",
                "12" : "Des",
            }
        )
        return the_b[b];
    }

    const navigate = useNavigate();

    let pos = props.position
    let class_name;
    if (pos === 'TOP'){
        class_name = 'grid grid-rows-1 text-xs sm:text-sm grid-cols-3 md:grid-cols-4 flex bg-white shadow-lg rounded-t-lg border-b- border-b-slate-300 min-w-full max-w-5xl md:mx-auto border-b-2'
    }else if (pos === 'MID'){
        class_name = 'grid grid-rows-1 text-xs sm:text-sm grid-cols-3 md:grid-cols-4 flex bg-white shadow-lg border-b- border-b-slate-300 min-w-full max-w-5xl md:mx-auto border-b-2'
    }else{
        class_name = 'grid grid-rows-1 text-xs sm:text-sm grid-cols-3 md:grid-cols-4 flex bg-white shadow-lg rounded-b-lg min-w-full max-w-5xl md:mx-auto border-b-2'
    }

    // Parse Tanggl
    const times = props.time
    const date = new Date(times)
    const options = { timeZone: 'Asia/Jakarta' };
    const time_id =  date.toLocaleString('id-ID', options)

    const [tanggal, bulan, tahun_before_slice] = time_id.split('/');
    const tahun = tahun_before_slice.slice(0,4)

    // console.log(tanggal,bulan,tahun);
    
    const tgl = tanggal + " " + convert_bulan(bulan) + " " + tahun
    const time = time_id.slice(10,19).replace(".",":").replace(".",":")
    
    const divHandleClick = (id) => {
        navigate(id);
    }

    return (
        <div className={class_name} onClick={divHandleClick.bind(this,props.id)} >
            <div className="title px-3 py-2 w-full" >
                <div className="">{props.activity}</div>
            </div>
            
            <div className="tanggal px-3 py-2">
                <div className="text-center">{tgl}</div>
            </div>
            <div className="status sm:block px-3 py-2">
                <div className="flex">
                    <div className="flex-grow text-center">
                        <div>{time}</div>
                    </div>
                    {/* <span className="w-4 h-4 material-symbols-outlined md:hidden mr-5">
                        edit
                    </span> */}
                </div>
            </div>
            <div className="keterangan hidden md:block px-3 py-2">
                <div className="text-center">{props.ket}</div>
            </div>
        </div>
    )
}

export default ListActivity;