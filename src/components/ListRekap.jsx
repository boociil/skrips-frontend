import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Alert from "./Alert"

function ListRekap(props) {

    const navigate = useNavigate();
    const [ cookie, setCookie, removeCookie ] = useCookies();
    const [ showConfirmCard, setShowConfirmCard ] = useState(false);
    const [ choosenId, setChoosenId ] = useState();
    let isAdmin = false
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    if(cookie.role === "Admin"){
        isAdmin = true
    }

    const setColour = (num) => {
        const low = '[#EC5F4C]';
        const med = '[#418EC6]';
        const high = '[#14CB11]';

        if (num < 35){
            return 'text-' + low;
        }else if(num < 65){
            return 'text-' + med;
        }else{
            return 'text-' + high;
        }
    }

    let pos = props.position
    let class_name;
    if (pos === 'TOP'){
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm md:col-span-5 grid-cols-3 md:grid-cols-5  hover:bg-slate-200 hover:scale-105 hover:rounded-lg transition duration-500 transition duration-500 flex bg-white shadow-lg rounded-t-lg border-b-2 border-b-slate-300 max-w-5xl w-full md:mx-auto'
    }else if (pos === 'MID'){
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm md:col-span-5 grid-cols-3 md:grid-cols-5 hover:bg-slate-200 hover:scale-105 hover:rounded-lg transition duration-500 transition duration-500 flex bg-white shadow-lg border-b-2 border-b-slate-300 max-w-5xl w-full md:mx-auto'
    }else{
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm md:col-span-5 grid-cols-3 md:grid-cols-5 hover:bg-slate-200 hover:scale-105 hover:rounded-lg transition duration-500 transition duration-500 flex bg-white shadow-lg rounded-b-lg max-w-5xl w-full md:mx-auto'
    }

    let status;
    let status_num = props.status
    let status_class;

    if (status_num === 1){
        status = 'Sampling';
    }else if(status_num === 2){
        status = 'Assign Petugas';
    }else if (status_num === 3){
        status = 'Pengolahan';
    }else{
        status = 'Selesai';
    }
    
    if (status_num === 1){
        status_class = 'text-[#14CB11]'
    } else if(status_num === 2){
        status_class = 'text-[#F647D0]'
    } else if(status_num === 3){
        status_class = 'text-[#E3A03B]'
    }else{
        status_class = 'text-[#418EC6]'
    }

    const divHandleClick = (id) => {
        if (status_num === 1){
            navigate("/Rekap/Sampel/" + id)
        }else{
            navigate(id);
        }    
    }

    const delete_kegiatan = (id) => {
        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan
                'token' : cookie['token']
            },
            body: JSON.stringify({ 
                
             }) 
        };
        
            fetch(backendUrl + 'delete_kegiatan/' + id , requestOptions)
            .then(response => response.json())
            .then(data => {
                
                navigate("/rekap")
            });
    }

    const onConfirms = () => {
        delete_kegiatan(props.id);
        window.location.reload();
    }

    const onCancels = () => {
        setShowConfirmCard(false);
    }

    const deleteClick = (id) => {
        setChoosenId(id)
        setShowConfirmCard(true);
    }
    
    const petugasClick = () => {
        navigate("/AssignPetugas/" + props.id);
    }

    const editClick = (id) => {
        navigate("/Rekap/Update/" + props.id);
    }
    
    const convert_bulan = (b) => {
        const the_b = (
            {
                "01" : "Jan",
                "02" : "Feb",
                "03" : "Mar",
                "04" : "Apr",
                "05" : "Mei",
                "06" : "Jun",
                "07" : "Jul",
                "08" : "Ags",
                "09" : "Sep",
                "10" : "Okt",
                "11" : "Nov",
                "12" : "Des",
            }
        )
        return the_b[b];
    }

    let tgl_mulai_kegiatan = props.tgl
    tgl_mulai_kegiatan = tgl_mulai_kegiatan.slice(0,10)
    const year = tgl_mulai_kegiatan.slice(0,4)
    const month = tgl_mulai_kegiatan.slice(5,7)
    let date = tgl_mulai_kegiatan.slice(8,10)

    if(date[0] === "0"){
        date = date.slice(1,2);
    }
 
    const the_tgl = convert_bulan(month) + " " + date + ", " + year

    return (
        <>
            <Alert open={showConfirmCard} setOpen={setShowConfirmCard} isConfirm={true} onConfirm={onConfirms} msg={'Hapus kegiatan ' + choosenId + " ?"} subMsg={`Semua data terkait kegiatan akan terhapus.`} />
            <div className="sm:flex max-w-5xl md:mx-auto ">
                <div className={class_name} onClick={divHandleClick.bind(this,props.id)} >
                    <div className="title px-3 py-2 col-span-2 w-full" >
                        <div className="">{props.name}</div>
                        <div className="block text-slate-400 text-xs">{props.id}</div>
                    </div>
                    <div className="tanggal hidden md:block px-3 py-2">
                        <div className=" ">{the_tgl}</div>
                        <div className=" text-slate-400 text-xs">Mulai Kegiatan</div>
                    </div>
                    <div className="status col-start-3 md:col-start-4 sm:block px-3 py-2">
                        <div className="flex">
                            <div className="flex-grow">
                                <div className={status_class}>{status}</div>
                                <div className=" text-slate-400 text-xs">Status</div>
                            </div>
                            {/* <span className="w-4 h-4 material-symbols-outlined md:hidden mr-5">
                                edit
                            </span> */}
                        </div>
                    </div>
                    <div className="metode hidden col-start-5 md:block px-3 py-2">
                        <div className="md:flex">
                            <div className="flex-grow">
                                <div className={`text-center ${setColour(props.metode)}`}>{
                                    props.metode !== "-" ? (
                                        <>{props.metode}%</>
                                    ) : (
                                        <>{props.metode}</>
                                    )
                                }</div>
                                <div className=" text-slate-400 text-xs text-center">Progres</div>
                            </div>
                        </div>
                    </div>
                </div>
                

                {
                    isAdmin ? (
                        <>
                            <div className="action ml-3 hidden md:grid md:grid-cols-2 items-center justify-center ">
                                <div className="edit hover:bg-slate-200 p-1 transition duration-500 cursor-pointer bg-white shadow-lg rounded-l-lg group" onClick={editClick}>
                                    <div className="w-fit mx-auto" >
                                        <span className="material-symbols-outlined px-1 hidden md:block group-hover:opacity-0 transition duration-500">
                                            edit
                                        </span>
                                        <div className="text-slate-400 text-xs group-hover:-translate-y-3 group-hover:text-black transition duration-500">
                                            Edit
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="edit hover:bg-red-500 border-l-2 p-1 transition duration-500 cursor-pointer bg-white shadow-lg rounded-r-lg group pl-1" onClick={() => deleteClick(props.id)}>
                                    <div className="w-fit mx-auto">
                                        <span className="material-symbols-outlined px-1 hidden md:block group-hover:opacity-0 transition duration-500">
                                            delete
                                        </span>
                                        <div className="text-slate-400 text-xs group-hover:-translate-y-3 group-hover:text-white transition duration-500 pr-1">
                                            Hapus
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
        </>
    )
}

export default ListRekap;