import { useState,useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ConfirmCard from './ConfirmCard';
import { useCookies } from "react-cookie";
import Alert from "../components/Alert";
import Loading from "./Loading";

function ListRekapEntriSurvei(props, { onDataFromChild }) {

    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ dataAdmin, setDataAdmin ] = useState([]);
    const [ dataAdmin2, setDataAdmin2 ] = useState([]);
    const [ dataLen, setDataLen ] = useState();
    const [ kodeKecActive, setKodeKecActive ] = useState({});
    const [ kodeDesaActive, setKodeDesaActive ] = useState({});
    const [ isClassAdded, setIsClassAdded ] = useState(false);
    const [ showTItle, setShowTitle ] = useState({});
    const [ showTItleKec, setShowTitleKec ] = useState({});
    const [ isLoadingPetugas, setIsLoadingPetugas ] = useState(true);
    const [ penerimaDok, setPenerimaDok ] = useState({});
    const [ showConfirmCard, setShowConfirmCard ] = useState(false);
    const [ nbsActive, setNbsActive ] = useState();
    const [ nksActive, setNksActive ] = useState();
    const [ rutaActive, setRutaActive ] = useState();
    const [ xActive, setXActive ] = useState();
    const [ isInvalid, setIsInvalid ] = useState(false);
    const [ isInvalid2, setIsInvalid2 ] = useState(false);
    const penerimaRef = useRef({});
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    useEffect(() =>{

        const fetchData = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                const link = backendUrl + 'get_pengolahan_data_survei/' + props.id
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);

                    setDataLen(data.length - 1);
                    setIsLoading(false)

                });       
        }

        const fetchDataUsers = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                const link = backendUrl + 'get_all_mitra_entri'
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataAdmin(data);

                    setIsLoadingPetugas(false);
                });            
        }     

        const fetchDataAdmin2 = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                const link = backendUrl + 'get_all_mitra'
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    
                    setDataAdmin2(data);
                });            
        }

        fetchData();
        fetchDataAdmin2();
        fetchDataUsers();

    },[props.id]);

    let prevKec = null;
    let prevDesa = null;
    let prevKorong = null;

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

  

    const handleCardClick = (kode_kec) => {
        // setKodeDesaActive(null);
        if (kodeKecActive[kode_kec]){
            setKodeKecActive(prevSelectValues => ({
                ...prevSelectValues,
                [kode_kec]: false
              }));
        }else{
            setKodeKecActive(prevSelectValues => ({
                ...prevSelectValues,
                [kode_kec]: true
              }));
        }
        // animasi ketika desa muncul
        // setIsClassAdded(false);
        // delay(100).then( function () {
        //     setIsClassAdded(true);
        // })
    
    };

    const updateEntri = (nbs,nks,ruta,time,status,petugas) => {
        return new Promise((resolve,reject) => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan
                    'token' : cookies['token']
                },
                body: JSON.stringify({ 
                    "id_kegiatan" : props.id,
                    "no_blok_sensus" : nbs,
                    "no_kerangka_sampel" : nks,
                    "no_ruta" : ruta,
                    "tgl_entri" : time,
                    "petugas_entri" : petugas,
                    "status_entri" : status
                 }) 
            };
            
            fetch(backendUrl + 'update_Entri_survei' , requestOptions)
            .then(response => response.json())
            .then(data => {

                if (data.msg === "Update Berhasil") {

                    resolve(true);
                } else {
                    reject("Gagal memperbarui data");
                }
            });
        })
        
    }

    const timeNow = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // Bulan dimulai dari 0 (Januari) hingga 11 (Desember)
        const date = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const time = `${year}-${month+1}-${date} ${hours}:${minutes}:${seconds}`;

        return time;
    }

    const handleRutaChange = (even,ruta,x) => {
        const value = even.target.value

        setPenerimaDok(prevSelectValues => ({
            ...prevSelectValues,
            [x]: {
                ...prevSelectValues[x],
                [ruta]: value
            }
        }));
    }

    const setSelectRef = (num, ref) => {
        penerimaRef.current[num] = ref
    };

    const handleCancel = () => {
        setShowConfirmCard(false);
        setRutaActive(null);
        setXActive(null);
        setNbsActive(null);
        setNksActive(null);
    }

    const handleConfirm = () => {

        const num = rutaActive + "" + xActive
        const button = document.getElementById('button-' + rutaActive + '-' + xActive  );
        const select = penerimaRef.current[num]

        
        // fetch data ke backend
        updateEntri(nbsActive,nksActive,rutaActive,null,null,null)
        .then(success => {
            button.classList.remove('text-[#14CB11]');
            button.classList.add('text-[#EF0D0D]');
            select.classList.remove('pointer-events-none')
            select.classList.remove('opacity-75')
            button.innerHTML = "Belum";
            setPenerimaDok(prevSelectValues => ({
                ...prevSelectValues,
                [xActive]: {
                    ...prevSelectValues[xActive],
                    [rutaActive]: select.value
                }
            }));

            toast.warning("Proses dibatalkan", {
                position: "bottom-right",
                hideProgressBar: true,
                autoClose: 1000,
                closeOnClick: true,
                theme: "light",
                transition: Bounce,
                pauseOnHover: false,
            })
        })
        .catch(error => {
            toast.error("Terjadi Kesalahan", {
                position: "bottom-right",
                hideProgressBar: true,
                autoClose: 1000,
                closeOnClick: true,
                theme: "light",
                transition: Bounce,
                pauseOnHover: false,
            })
        })

        setShowConfirmCard(false);
        setRutaActive(null);
        setXActive(null);
        setNbsActive(null);
        setNksActive(null);
    }

    const getData = (x, noRuta) => {
        const result = data.find(item => item.nama_x === x && item.no_ruta === noRuta);
        return result;
    };

    const clickButtonSampel = (ruta,x,nbs,nks) => {
        
        setRutaActive(ruta);
        setXActive(x);
        setNbsActive(nbs);
        setNksActive(nks);

        const edcod_stats = getData(x,ruta).status_edcod

        const num = ruta + "" + x
        const button = document.getElementById('button-' + ruta + '-' + x  );
        const select = penerimaRef.current[num]

        let the_value = null
        if (penerimaDok && penerimaDok[x] && penerimaDok[x][ruta]){
            the_value = penerimaDok[x][ruta]
        }

        const time_now = timeNow()

        if(button.innerHTML === "Sudah"){
            setShowConfirmCard(true);
        }else{
            if (edcod_stats){
                if (the_value && (the_value !== "-")){
                    // fetch data ke backend
                    updateEntri(nbs,nks,ruta,time_now,1,the_value)
                    .then(success => {
                        button.classList.remove('text-[#EF0D0D]');
                        button.classList.add('text-[#14CB11]');
                        button.innerHTML = "Sudah";
                        select.classList.add('pointer-events-none')
                        select.classList.add('opacity-75')
    
                        toast.success("Data berhasil diiput", {
                            position: "bottom-right",
                            hideProgressBar: true,
                            autoClose: 1000,
                            closeOnClick: true,
                            theme: "light",
                            transition: Bounce,
                            pauseOnHover: false,
                        })
                    })
                    .catch(error => {
                        toast.error("Terjadi Kesalahan", {
                            position: "bottom-right",
                            hideProgressBar: true,
                            autoClose: 1000,
                            closeOnClick: true,
                            theme: "light",
                            transition: Bounce,
                            pauseOnHover: false,
                        })
                    })
                }else{
                    setIsInvalid(true);
                }    
            }else{
                setIsInvalid2(true);
            }
        }
    }


    const desaClick = (kode_desa,kode_kec_1) => {



        let the_code = ''

        if(kodeDesaActive && kodeDesaActive[kode_kec_1] && kodeDesaActive[kode_kec_1][kode_desa]){
            the_code = kodeDesaActive[kode_kec_1][kode_desa]
        }

        if (the_code){
            setKodeDesaActive(prevSelectValues => ({
                ...prevSelectValues,
                [kode_kec_1]: {
                    ...prevSelectValues[kode_kec_1],
                    [kode_desa]: false
                }
            }));
        }else{
            setKodeDesaActive(prevSelectValues => ({
                ...prevSelectValues,
                [kode_kec_1]: {
                    ...prevSelectValues[kode_kec_1],
                    [kode_desa]: true
                }
            }));
        }
    }
    

    return (
        <>
            <ToastContainer />
            {isLoading ? (
                <div className="w-full flex justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <div className="here">
                    <Alert open={showConfirmCard} setOpen={setShowConfirmCard} isConfirm={true} onConfirm={handleConfirm} msg={'Batalkan progres Entri?'} subMsg={`Anda masih bisa mensubmit, tapi waktu akan terupdate.`}/>
                    <Alert open={isInvalid2} setOpen={setIsInvalid2} msg={"Error!"} subMsg={"Dokumen Belum Melewati Proses Edcod."} />
                    <Alert open={isInvalid} setOpen={setIsInvalid} msg={"Error!"} subMsg={"Invalid input, silahkan pilih moda entri dan petugas."} />
                    {
                        data.map((item,index) => {
                            // show Kec
                            if (item.kode_kec !== prevKec){
                                prevKec = item.kode_kec;
                                return (
                                    <div key={index} className="row mt-3 max-w-5xl mx-auto">
                                        
                                        <div className="kecamatan w-full cursor-pointer flex gap-2 mt-1 mb-1 px-3 py-2 bg-[#418EC6] text-white text-xs rounded-md hover:bg-sky-400 " onClick={ () => handleCardClick(item.kode_kec)}>    
                                            <div className="w-fit md:col-start-1 ml-1 ">{item.kode_kec}</div>
                                            <div className="w-full md:col-start-2 md:col-span-3 ">{item.Kec}</div>
                                            <div className="font-semibold">{
                                                props.isLoading ? (
                                                    <>
                                                    </>
                                                ) : (
                                                    <>{props.data[item.kode_kec].progres_entri.toFixed(2)}</>
                                                )
                                            }%</div>
                                        </div>

                                        {data.filter((subItem) => item.kode_kec === subItem.kode_kec).map((subItem,subIndex) => {
                                            
                                            // show desa
                                            if(kodeKecActive[subItem.kode_kec]){
                                                if(subItem.kode_desa !== prevDesa){
                                                    prevDesa = subItem.kode_desa
                                                    let class_desa = "Desa transition duration-300 scale-95 cursor-pointer my-1 mr-3 ml-6 bg-[#17B715] hover:bg-[#30D32E] text-white md:p-3 p-2 rounded-md text-xs flex opacity max-w-4xl md:mx-auto"
                                                    let class_desa_2 = "Desa transition duration-300 scale-100 cursor-pointer my-1 mr-3 ml-6 bg-[#17B715] hover:bg-[#30D32E] text-white md:p-3 p-2 rounded-md text-xs flex opacity max-w-4xl md:mx-auto"
                                                    prevDesa = subItem.kode_desa
                                                    const on_show_title = () => {
                                                        if(showTItle[subItem.kode_desa]){
                                                            if(showTItleKec[subItem.kode_kec]){
                                                                return true;
                                                            }
                                                        }
                                                        return false
                                                    }
                                                    return (
                                                        <div key={subIndex} className="the-inside-row lg:grid lg:justify-items-end">
                                                            <div id="the-desa" className="Desa transition lg:w-[94%] lg:ml-8 ml-10 gap-2 duration-300 scale-100 cursor-pointer my-1 bg-[#17B715] hover:bg-[#30D32E] text-white px-3 py-2 rounded-md text-xs flex" onClick={() => desaClick(subItem.kode_desa,subItem.kode_kec)}>
                                                                <div className="w-fit">{subItem.kode_desa}</div>
                                                                <div className="w-full">{subItem.Desa}</div>
                                                                
                                                            </div>
                                                            {data.filter((innerItem) => (innerItem.kode_desa === subItem.kode_desa) && (innerItem.kode_kec === subItem.kode_kec) ).map((innerItem,innerIndex) => {
                                                                
                                                                //show sls
                                                                let the_open = null

                                                                if(kodeDesaActive && kodeDesaActive[innerItem.kode_kec] && kodeDesaActive[innerItem.kode_kec][innerItem.kode_desa]){
                                                                    the_open = kodeDesaActive[innerItem.kode_kec][innerItem.kode_desa]
                                                                }

                                                                if(the_open){
                                                                    if(innerItem.nama_x !== prevKorong ){
                                                                        prevKorong = innerItem.nama_x
                                                                        return(
                                                                            <div  key={innerIndex} className="the-inside-row lg:grid lg:justify-items-end w-full">
                                                                                <div className={`px-3 py-2 lg:w-[88%] ml-20 lg:ml-16 my-1 bg-[#F5F4F4] rounded-md text-xs grid-cols-4 grid sm:grid-cols-4 scale-100`}>
                                                                                    <div className="w-full md:w-fit ml-2 col-start-1 col-span-2">{" " + innerItem.nama_x}</div>    
                                                                                    <div className="no-bs">NKS : {innerItem.no_blok_sensus}</div>
                                                                                    <div className="no-bs">NBS : {innerItem.no_kerangka_sampel}</div>
                                                                                </div>

                                                                                <div className="the-ruta grid grid-cols-2 max-w-4xl lg:w-[82%]">
                                                                                    {
                                                                                        data.filter((insideItem) => (insideItem.nama_x === innerItem.nama_x) && (insideItem.kode_kec === innerItem.kode_kec) && (insideItem.kode_desa === innerItem.kode_desa) ).map((insideItem,insideIndex) => {
                                                                                            let isRB = false
                                                                                            if ((insideItem.status_entri !== null) && (innerItem.status_entri !== 0)){
                                                                                                isRB = true
                                                                                            }
                                                                                            
                                                                                            let the_value = ''
                                                                                            if (penerimaDok && penerimaDok[insideItem.nama_x] && penerimaDok[insideItem.nama_x][insideItem.no_ruta]){
                                                                                                the_value = penerimaDok[insideItem.nama_x][insideItem.no_ruta]
                                                                                            }
                                                                                            const ref_num = insideItem.no_ruta + "" + insideItem.nama_x
                                                                                            const index_admin = dataAdmin2.findIndex(item => item.id === insideItem.petugas_entri)

                                                                                            return (
                                                                                                <div key={insideIndex} className="bg-[#F5F4F4] mx-1 my-1 px-2 py-1 grid grid-cols-5 text-xs rounded-lg">
                                                                                                    
                                                                                                    <div className="the-ruta hidden md:block">
                                                                                                        <div className="mx-3">{insideItem.no_ruta}</div>
                                                                                                        <div className="text-slate-400">sampel</div>
                                                                                                    </div>
                                                                                                        
                                                                                                    <div className="the-krt col-span-2">
                                                                                                        <div className="">{insideItem.KRT}</div>
                                                                                                        <div className="text-slate-400">KRT</div>
                                                                                                    </div>    

                                                                                                    <div className="the-petugas">
                                                                                                        <select 
                                                                                                        name="select-petugas" 
                                                                                                        id="" 
                                                                                                        ref ={(ref) => setSelectRef(ref_num,ref)}
                                                                                                        value={the_value || ''}
                                                                                                        className={`mr-1 w-14 rounded-md min-h-8 ${isRB ? ("pointer-events-none opacity-75") : ("")}`}
                                                                                                        onChange={(event) => handleRutaChange(event,insideItem.no_ruta,insideItem.nama_x)}
                                                                                                        >

                                                                                                            {
                                                                                                                isLoadingPetugas ? (
                                                                                                                    <>
                                                                                                                    </>
                                                                                                                ) : (
                                                                                                                    <>

                                                                                                                    {
                                                                                                                        
                                                                                                                        isRB ? (
                                                                                                                            <>
                                                                                                                                <option value={insideItem.petugas_edcod} key={insideItem.petugas_edcod}>{dataAdmin2[index_admin].nama }</option>
                                                                                                                                {dataAdmin.filter((admin) => admin.nama !== insideItem.petugas_edcod).map((admin,admin_index) => (
                                                                                                                                    <option value={admin.id} key={admin_index}>{admin.nama}</option>
                                                                                                                                ))} 
                                                                                                                            </>
                                                                                                                        ) : (
                                                                                                                            <>
                                                                                                                                <option value="-" key="-">-</option>
                                                                                                                                {dataAdmin.map((admin,admin_index) => (
                                                                                                                                    <option value={admin.id} key={admin_index}>{admin.nama}</option>
                                                                                                                                ))}
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    }
                                                                                                                    </>
                                                                                                                )
                                                                                                            }
                                                                                                            
                                                                                                        </select>
                                                                                                        {/* <div className="text-slate-400"></div> */}
                                                                                                    </div>
                                                                                                    
                                                                                                    
                                                                                                    <button 
                                                                                                        className={`status-edcod hover:bg-slate-100 col-start-8 w-fit text-center mr-2 md:mr-1 bg-white rounded-full md:px-3 px-1 md:py-1 py-1 border-2 border-slate-200 ${isRB ? ("text-[#14CB11]") : ("text-[#EF0D0D]")}`}
                                                                                                        id={`button-${insideItem.no_ruta}-${insideItem.nama_x}`}
                                                                                                        onClick={() => clickButtonSampel(insideItem.no_ruta, insideItem.nama_x,insideItem.no_blok_sensus, insideItem.no_kerangka_sampel)}
                                                                                                        >
                                                                                                        {isRB ? ("Sudah") : ("Belum")}
                                                                                                    </button>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                                
                                                                            </div>
                                                                        )
                                                                    }
                                                                }
                                                            })}
                                                        </div>
                                                    )
                                                }
                                            }
                                            
                                        })}
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            )}
        </>
    )
}

export default ListRekapEntriSurvei;