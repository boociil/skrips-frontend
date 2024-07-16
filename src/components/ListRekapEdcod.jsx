import { useState,useEffect, useRef } from "react";
import ConfirmCard from './ConfirmCard';
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./Loading";
import Alert from "./Alert";
import { useCookies } from "react-cookie";


function ListRekap(props) {

    const penerimaRef = useRef({});
    const [ data, setData ] = useState([]);
    const [ dataAdmin, setDataAdmin ] = useState([]);
    const [ dataAdmin2, setDataAdmin2 ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoadingPetugas, setIsLoadingPetugas ] = useState(true);
    const [ dataLen, setDataLen ] = useState();
    const [ kodeKecActive, setKodeKecActive ] = useState({});
    const [ kodeDesaActive, setKodeDesaActive ] = useState({});
    const [ kodeKecActive1, setKodekecActive1 ] = useState({});
    const [ isClassAdded, setIsClassAdded ] = useState(false);
    const [ selectPenerima, setSelectPenerima ] = useState({});
    const [ showConfirmCard, setShowConfirmCard ] = useState(false);
    const [ confirmResult, setConfirmResult ] = useState(null);
    const [ idDokActive, setIdDokActive ] = useState(null);
    const [ idxActive, setIdxActive ] = useState(null);
    const [ isInvalid, setIsInvalid ] = useState(false);
    const [ isInvalid2, setIsInvalid2 ] = useState(false);
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
                const link = backendUrl + 'get_pengolahan_data/' + props.id
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    
                    setDataLen(data.length - 1);
                    setIsLoading(false)
                });            
        }

        const fetchDataPetugas = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                const link = backendUrl + 'get_all_mitra_edcod'
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    
                    setDataAdmin(data);
                    setIsLoadingPetugas(false)
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
        fetchDataPetugas();

    },[props.id]);

    let prevKec = null;
    let prevDesa = null;

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

    const updateEdcod = (id_dok,petugas,status,time) => {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan
                    'token' : cookies["token"],
                },
                body: JSON.stringify({ 
                    "id_kegiatan" : props.id,
                    "id_dok" : id_dok,
                    "tgl_edcod" : time,
                    "petugas_edcod" : petugas,
                    "status_edcod" : status
                 }) 
            };

            fetch(backendUrl + 'update_Edcod' , requestOptions)
            .then(response => response.json())
            .then(data => {
                
                if (data.msg === "Update Berhasil"){
                    resolve(true);
                }else{
                    reject("Gagal Memperbarui data")
                }
            })
            .catch(error => {
                reject(error)
            })
        });
    }

    const setSelectRef = (dokId, ref) => {
        penerimaRef.current[dokId] = ref;
    };


    const handleConfirm = () => {
        setShowConfirmCard(false);

        let penerima = selectPenerima[idDokActive]
        
        const button = document.getElementById('button' + idxActive);
        const select = penerimaRef.current[idDokActive]
        const div_time = document.getElementById('time-' + idxActive);

        // fetch data ke backend
        updateEdcod(idDokActive,null,null,null)
        .then(success => {
            // Operasi
            button.classList.remove('text-[#14CB11]');
            button.classList.add('text-[#EF0D0D]');
            select.classList.remove('pointer-events-none')
            select.classList.remove('opacity-75')
            div_time.innerHTML = '-'
            button.innerHTML = "Belum";
            setSelectPenerima(prevSelectValues => ({
                ...prevSelectValues,
                [idDokActive]: select.value
            }));

            // toast
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
        // Netralkan kembali id_dok dan idx
        setIdDokActive(null);
        setIdxActive(null);
    }

    const handleCancel = () => {
        setShowConfirmCard(false);

        //

        // Netralkan kembali id_dok dan idx
        setIdDokActive(null);
        setIdxActive(null);
    }

    const getDocumentById = (id) => {
        return data.find(doc => doc.id_dok === id);
      };

    const clickButtonSLS = (id_dok,idx) => {
        setIdDokActive(id_dok);
        setIdxActive(idx);
        
        const data_by_id_dok = getDocumentById(id_dok);
        const pengdok_stats = data_by_id_dok.status_pengdok

        let penerima = selectPenerima[id_dok]
        
        const button = document.getElementById('button' + idx);
        const select = penerimaRef.current[id_dok]
        const div_time = document.getElementById('time-' + idx);


        if(button.innerHTML === "Sudah"){
            setShowConfirmCard(true);

        }else{
            if(pengdok_stats){
                if (penerima && (penerima !== "-")){

                    const time_now = timeNow()
    
                    // fetch data ke backend
                    updateEdcod(id_dok,penerima,1,time_now)
                    .then(success => {
                        button.classList.remove('text-[#EF0D0D]');
                        button.classList.add('text-[#14CB11]');
                        button.innerHTML = "Sudah";
                        select.classList.add('pointer-events-none')
                        select.classList.add('opacity-75')
                        
                        div_time.innerHTML = time_now
                        select.classList.add('disabled-element')
                        
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
                    });  
                       
                }else{
                    setIsInvalid(true);
                }
            }else{
                setIsInvalid2(true);
            }
            
            
        }
    }

    const handleSelectPenerimaChange = (event, id) => {
        const value = event.target.value;
    
        // Menyalin objek selectValues dan memperbarui nilai untuk elemen yang sesuai
        setSelectPenerima(prevSelectValues => ({
          ...prevSelectValues,
          [id]: value
        }));
    };

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

    const desaClick = (kode_desa,kode_kec_1) => {

        

        if(kode_kec_1 === kodeKecActive1){
            if (kode_desa === kodeDesaActive){
                setKodekecActive1(null);
                setKodeDesaActive(null);
            }else{
                setKodeDesaActive(kode_desa === kodeDesaActive ? null : kode_desa);
            }
        }else{
            setKodekecActive1(kode_kec_1);
            setKodeDesaActive(kode_desa);
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
                    <Alert open={showConfirmCard} setOpen={setShowConfirmCard} isConfirm={true} onConfirm={handleConfirm} msg={'Batalkan progres Edcod?'} subMsg={`Anda masih bisa mensubmit, tapi waktu akan terupdate`}/>
                    <Alert open={isInvalid} setOpen={setIsInvalid} msg={"Error!"} subMsg={"Invalid input, silahkan pilih petugas."} />
                    <Alert open={isInvalid2} setOpen={setIsInvalid2} msg={"Error!"} subMsg={"Dokumen Belum Dikumpulkan."} />
                    {
                        data.map((item,index) => {
                            // show Kec
                            if (item.kode_kec !== prevKec){
                                prevKec = item.kode_kec;
                                return (
                                    <div key={index} className="row mt-2 max-w-5xl mx-auto">
                                        
                                        <div className="kecamatan w-full cursor-pointer flex gap-2 mt-1 mb-1 px-3 py-2 bg-[#418EC6] text-white text-xs rounded-md hover:bg-sky-400 " onClick={ () => handleCardClick(item.kode_kec)}>    
                                            <div className="w-fit md:col-start-1 ml-1 ">{item.kode_kec}</div>
                                            <div className="w-full md:col-start-2 md:col-span-3 ">{item.Kec}</div>
                                            <div className="font-semibold">{props.data[item.kode_kec].progres_edcod.toFixed(2)}%</div>
                                        </div>

                                        {data.filter((subItem) => item.kode_kec === subItem.kode_kec).map((subItem,subIndex) => {
                                            
                                            // show desa
                                            if(kodeKecActive[subItem.kode_kec]){
                                                if(subItem.kode_desa !== prevDesa){
                                                    prevDesa = subItem.kode_desa
                                                    let class_desa = "Desa transition duration-300 scale-95 cursor-pointer my-1 mr-3 ml-6 bg-[#17B715] hover:bg-[#30D32E] text-white md:p-3 p-2 rounded-md text-xs flex opacity max-w-4xl md:mx-auto"
                                                    let class_desa_2 = "Desa transition duration-300 scale-100 cursor-pointer my-1 mr-3 ml-6 bg-[#17B715] hover:bg-[#30D32E] text-white md:p-3 p-2 rounded-md text-xs flex opacity max-w-4xl md:mx-auto"
                                                    prevDesa = subItem.kode_desa
                                                    return (
                                                        <div key={subIndex} className="the-inside-row lg:grid lg:justify-items-end">
                                                            <div id="the-desa" className="Desa transition lg:w-[94%] lg:ml-8 ml-10 gap-2 duration-300 scale-100 cursor-pointer my-1 bg-[#17B715] hover:bg-[#30D32E] text-white px-3 py-2 rounded-md text-xs flex" onClick={() => desaClick(subItem.kode_desa,subItem.kode_kec)}>
                                                                <div className="w-fit">{subItem.kode_desa}</div>
                                                                <div className="w-full">{subItem.Desa}</div>
                                                            </div>

                                                            {data.filter((innerItem) => (innerItem.kode_desa === subItem.kode_desa) && (innerItem.kode_kec === subItem.kode_kec) ).map((innerItem,innerIndex) => {
                                                                
                                                                //show sls
                                                                
                                                                if(innerItem.kode_kec === kodeKecActive1){
                                                                    if (innerItem.kode_desa === kodeDesaActive){
                                                                        
                                                                        let edcod = "Belum"
                                                                        let class_edcod = "status-edcod hover:bg-slate-100 col-start-8 w-fit text-center mr-2 md:mr-1 bg-white rounded-full md:px-3 px-1 md:py-1 py-1 border-2 border-slate-200"
                                                                        if (innerItem.status_edcod == 1){
                                                                            edcod = "Sudah";
                                                                            class_edcod += " text-[#14CB11]"
                                                                        }else{
                                                                            class_edcod += " text-[#EF0D0D]"
                                                                        }
                                                                        let ada = false;

                                                                        if (edcod === "Sudah"){
                                                                            ada = true;
                                                                        }

                                                                        let waktu_entri = '-'
                                                                        if ((innerItem.tgl_edcod !== null) && (innerItem.tgl_edcod !== "0000-00-00 00:00:00")){
                                                                            const date = new Date(innerItem.tgl_edcod)
                                                                            const options = { timeZone: 'Asia/Jakarta' };
                                                                            waktu_entri =  date.toLocaleString('id-ID', options)
                                                                        }
                                                                        let class_sls = "mr-3 p-1 md:p-2 md:grid md:grid-cols-8 ml-9 my-1 bg-[#F5F4F4] rounded-md text-xs flex md:mx-auto max-w-3xl transition duration-300 scale-95";
                                                                        let class_sls2 = "mr-3 p-1 md:p-2 md:grid md:grid-cols-8 ml-9 my-1 bg-[#F5F4F4] rounded-md text-xs flex md:mx-auto max-w-3xl transition duration-300 scale-95";
                                                                        let index_admin = dataAdmin2.findIndex(item => item.id === innerItem.petugas_edcod)
                                                                        
                                                                        return(
                                                                            <div key={innerIndex} className="the-inside-row lg:grid lg:justify-items-end w-full">
                                                                                <div className="px-3 py-1 lg:w-[88%] ml-20 lg:ml-16 my-1 bg-[#F5F4F4] rounded-md text-xs flex scale-100">
                                                                                    <div className="w-fit flex items-center">{innerItem.kode_sls}</div>
                                                                                    <div className="w-full md:max-w-56 truncate ml-2 col-start-2 col-span-2 flex items-center ">{" " + innerItem.SLS}</div>
                                                                                    <label htmlFor={`select-${innerIndex}`}></label>
                                                                                    {/* <button className="col-start-5">button petugas</button> */}
                                                                                    <div id={`time-${innerIndex}`} className="hidden mx-auto col-start-6 md:flex md:items-center">{waktu_entri}</div>
                                                                                    {
                                                                                        isLoadingPetugas ? (
                                                                                            <>

                                                                                            </>
                                                                                        ) : (

                                                                                        
                                                                                            <select 
                                                                                                className={`sm:mr-5 mr-1 rounded-lg col-start-7 min-w-16 max-w-16 overflow-hidden ${ada ? ('pointer-events-none opacity-75') : ('')}`}
                                                                                                name="selectPenerima" 
                                                                                                id={`select-${innerItem.id_dok}`}
                                                                                                ref={ref => setSelectRef(innerItem.id_dok, ref)}
                                                                                                value={selectPenerima[innerItem.id_dok]} 
                                                                                                onChange={(event) => handleSelectPenerimaChange(event, innerItem.id_dok)}
                                                                                            >
                                                                                        { 
                                                                                            ada ? (
                                                                                                <>
                                                                                                        <option value={innerItem.petugas_edcod} key={innerItem.petugas_edcod}>{dataAdmin2[index_admin].nama}</option>
                                                                                                        {dataAdmin.filter((admin) => admin.id !== innerItem.petugas_edcod).map((admin,admin_index) => (
                                                                                                            <option value={admin.id} key={admin_index}>{admin.nama}</option>
                                                                                                        ))}
                                                                                                </>
                                                                                            ) :(
                                                                                                <>
                                                                                                    <option value="-" key="-">-</option>
                                                                                                    {dataAdmin.map((admin,admin_index) => (
                                                                                                        <option value={admin.id} key={admin_index}>{admin.nama}</option>
                                                                                                    ))}
                                                                                                </>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                    </select>
                                                                                        )    
                                                                                    }
                                                                                    <button id={`button${innerIndex}`} className={class_edcod} onClick={() => clickButtonSLS(innerItem.id_dok,innerIndex)}>{edcod}</button>
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

export default ListRekap;