import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";


function ListRekap(props) {

    const navigate = useNavigate();
    const [ cookie, setCookie, removeCookie ] = useCookies()
    let isAdmin = false

    if(cookie.role === "Admin"){
        isAdmin = true
    }

    let pos = props.position
    let class_name;
    if (pos === 'TOP'){
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm md:col-span-5 grid-cols-3 md:grid-cols-5  hover:bg-slate-200 hover:scale-105 hover:rounded-lg transition duration-500 transition duration-500 flex bg-white shadow-lg rounded-t-lg border-b-2 border-b-slate-300 max-w-3xl w-full md:mx-auto'
    }else if (pos === 'MID'){
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm md:col-span-5 grid-cols-3 md:grid-cols-5 hover:bg-slate-200 hover:scale-105 hover:rounded-lg transition duration-500 transition duration-500 flex bg-white shadow-lg border-b-2 border-b-slate-300 max-w-3xl w-full md:mx-auto'
    }else{
        class_name = 'cursor-pointer grid grid-rows-1 text-xs sm:text-sm md:col-span-5 grid-cols-3 md:grid-cols-5 hover:bg-slate-200 hover:scale-105 hover:rounded-lg transition duration-500 transition duration-500 flex bg-white shadow-lg rounded-b-lg max-w-3xl w-full md:mx-auto'
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
        
            fetch('http://localhost:3001/delete_kegiatan/' + id , requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate("/rekap")
            });
    }

    const deleteClick = () => {
        delete_kegiatan(props.id);
        alert("delete " + props.id)
        window.location.reload();
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
    // console.log(date[0]);
    const the_tgl = convert_bulan(month) + " " + date + ", " + year
    // console.log("month",convert_bulan("10"));


    return (
        <>
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
                                <div className="">{props.metode}</div>
                                <div className=" text-slate-400 text-xs">Metode</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                        <div className="action hidden md:grid md:grid-cols-3 items-center justify-center ">
                            <div className="edit hover:bg-slate-200 p-1 transition duration-500 cursor-pointer bg-white shadow-lg rounded-l-lg">
                                <div className="w-fit mx-auto" onClick={editClick}>
                                    <span className="material-symbols-outlined px-1 hidden md:block ">
                                        edit
                                    </span>
                                    <div className="text-slate-400 text-xs">
                                        Edit
                                    </div>
                                </div>
                            </div>
                            <div className="edit hover:bg-slate-200 border-l-2 p-1 transition duration-500 cursor-pointer bg-white shadow-lg" onClick={petugasClick}>
                                <div className="w-fit mx-auto">
                                    <span className="material-symbols-outlined px-1 hidden md:block">
                                        deployed_code_account
                                    </span>
                                    <div className="text-slate-400 text-xs">
                                        Petugas
                                    </div>
                                </div>
                            </div>
                            <div className="edit hover:bg-slate-200 border-l-2 p-1 transition duration-500 cursor-pointer bg-white shadow-lg rounded-r-lg" onClick={deleteClick}>
                                <div className="w-fit mx-auto">
                                    <span className="material-symbols-outlined px-1 hidden md:block">
                                        delete
                                    </span>
                                    <div className="text-slate-400 text-xs">
                                        Delete
                                    </div>
                                </div>
                            </div>
                    </div>
                    
            </div>
        </>
    )
}

export default ListRekap;