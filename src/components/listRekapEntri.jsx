import { useState,useEffect, useRef } from "react";
import ConfirmCard from './confirmCard';

function ListRekap(props) {

    const penerimaRef = useRef({});
    const [ data, setData ] = useState([]);
    const [ dataAdmin, setDataAdmin ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoadingPetugas, setIsLoadingPetugas ] = useState(true);
    const [ dataLen, setDataLen ] = useState();
    const [ kodeKecActive, setKodeKecActive ] = useState({});
    const [ kodeDesaActive, setKodeDesaActive ] = useState({});
    const [ kodeKecActive1, setKodekecActive1 ] = useState({});
    const [ isClassAdded, setIsClassAdded ] = useState(false);
    const [ selectPenerima, setSelectPenerima ] = useState({});
    const [ showConfirmCard, setShowConfirmCard ] = useState(false);
    const [ adaRB, setAdaRB ] = useState({})

    useEffect(() =>{

        const fetchData = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                const link = 'http://localhost:3001/get_pengolahan_data/' + props.id
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    console.log(data)
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
                const link = 'http://localhost:3001/get_all_admin'
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataAdmin(data);
                    setIsLoadingPetugas(false)
                });            
        }

        fetchData();
        fetchDataUsers();

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

    const updateRB = (id_dok,penerima,status,time) => {
        
        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
            },
            body: JSON.stringify({ 
                "id_kegiatan" : props.id,
                "id_dok" : id_dok,
                "tgl_pengdok" : time,
                "penerima_dok" : penerima,
                "status_pengdok" : status
             }) 
        };
        
            fetch('http://localhost:3001/update_RB' , requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
            });
    }

    const setSelectRef = (dokId, ref) => {
        penerimaRef.current[dokId] = ref;
    };

    const clickButtonSLS = (id_dok,idx) => {
        console.log("Penerima : ",selectPenerima[id_dok])
        console.log("id_dok : ",id_dok);
        console.log("index : ",idx);
        
        let penerima = selectPenerima[id_dok]
        
        const button = document.getElementById('button' + idx);
        const select = penerimaRef.current[id_dok]

        if(button.innerHTML === "Sudah"){
            button.classList.remove('text-[#14CB11]');
            button.classList.add('text-[#EF0D0D]');
            select.classList.remove('pointer-events-none')
            select.classList.remove('opacity-75')
            button.innerHTML = "Belum";
            setSelectPenerima(prevSelectValues => ({
                ...prevSelectValues,
                [id_dok]: select.value
            }));
            // fetch data ke backend
            updateRB(id_dok,penerima,null,null);
        }else{
            if (penerima){
                button.classList.remove('text-[#EF0D0D]');
                button.classList.add('text-[#14CB11]');
                button.innerHTML = "Sudah";
                select.classList.add('pointer-events-none')
                select.classList.add('opacity-75')

                // fetch data ke backend
                select.classList.add('disabled-element')
                const time_now = timeNow()
                updateRB(id_dok,penerima,1,time_now);
            }else{
                alert("Pilih penerima");
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
        
        console.log("kode desa yang dikirim :",kode_desa);
        console.log("set", kode_desa === kodeDesaActive ? null : kode_desa);
    }
    

    

    return (
        <>
            {isLoading ? (
                <div>
                    {/* Ketika komponen sedang loading, tambahkan animasi disini */}
                    Lagi Loading
                </div>
            ) : (
                <div className="here">
                    {showConfirmCard ? (
                                            <>
                                                <ConfirmCard />
                                            </>
                                            
                                        ) : (
                                            <>
                                            </>
                                        )}
                    {
                        data.map((item,index) => {
                            // show Kec
                            if (item.kode_kec !== prevKec){
                                prevKec = item.kode_kec;
                                return (
                                    <div key={index} className="row mt-3 max-w-5xl mx-auto">
                                        
                                        <div className="kecamatan cursor-pointer mx-3 flex mt-1 mb-1 p-3 bg-[#418EC6] text-white text-xs rounded-md hover:bg-sky-400" onClick={ () => handleCardClick(item.kode_kec)}>    
                                            <span className="w-fit ml-1">{item.kode_kec}</span>
                                            <span className="w-full text-center">{item.Kec}</span>
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
                                                        <div key={subIndex} className="the-inside-row">
                                                            <div id="the-desa" className={isClassAdded ? class_desa_2 : class_desa} onClick={() => desaClick(subItem.kode_desa,subItem.kode_kec)}>
                                                                <div className="w-fit">{subItem.kode_desa}</div>
                                                                <div className="w-full text-center ">{subItem.Desa}</div>
                                                            </div>

                                                            {data.filter((innerItem) => (innerItem.kode_desa === subItem.kode_desa) && (innerItem.kode_kec === subItem.kode_kec) ).map((innerItem,innerIndex) => {
                                                                
                                                                //show sls
                                                                
                                                                if(innerItem.kode_kec === kodeKecActive1){
                                                                    if (innerItem.kode_desa === kodeDesaActive){
                                                                        
                                                                        let edcod = "Belum"
                                                                        let class_edcod = "status-edcod hover:bg-slate-100 col-start-8 w-fit text-center mr-2 md:mr-1 bg-white rounded-full md:p-3 p-2 border-2 border-slate-200"
                                                                        if (innerItem.status_pengdok == 1){
                                                                            edcod = "Sudah";
                                                                            class_edcod += " text-[#14CB11]"
                                                                        }else{
                                                                            class_edcod += " text-[#EF0D0D]"
                                                                        }
                                                                        let ada = false;

                                                                        if (edcod === "Sudah"){
                                                                            ada = true;
                                                                        }

                                                                        let pml = '-';
                                                                        if (innerItem.pml != null){
                                                                            pml = innerItem.pml
                                                                        }
                                                                        let class_sls = "mr-3 p-1 md:p-2 md:grid md:grid-cols-8 ml-9 my-1 bg-[#F5F4F4] rounded-md text-xs flex md:mx-auto max-w-3xl transition duration-300 scale-95";
                                                                        let class_sls2 = "mr-3 p-1 md:p-2 md:grid md:grid-cols-8 ml-9 my-1 bg-[#F5F4F4] rounded-md text-xs flex md:mx-auto max-w-3xl transition duration-300 scale-95";
                                                                        let index_admin = dataAdmin.findIndex(item => item.username === innerItem.penerima_dok)
                                                                        return(
                                                                            <div key={innerIndex} className={isClassAdded ? class_sls2 : class_sls}>
                                                                                <div className="w-fit">{innerItem.kode_sls}</div>
                                                                                <div className="w-full md:w-fit ml-2 col-start-2 col-span-2">{" " + innerItem.SLS}</div>
                                                                                <label htmlFor={`select-${innerIndex}`}></label>
                                                                                <div className="hidden md:block mx-auto col-start-5">pml : {pml}</div>
                                                                                <div className="hidden md:block mx-auto col-start-6">ppl : {pml}</div>
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
                                                                                                    <option value={innerItem.penerima_dok} key={innerItem.penerima_dok}>{dataAdmin[index_admin].firstName + " " + dataAdmin[index_admin].lastName }</option>
                                                                                                    {dataAdmin.filter((admin) => admin.username !== innerItem.penerima_dok).map((admin,admin_index) => (
                                                                                                        <option value={admin.username} key={admin_index}>{admin.firstName + " " + admin.lastName}</option>
                                                                                                    ))}
                                                                                            </>
                                                                                        ) :(
                                                                                            <>
                                                                                                <option value="-" key="-">-</option>
                                                                                                {dataAdmin.map((admin,admin_index) => (
                                                                                                    <option value={admin.username} key={admin_index}>{admin.firstName + " " + admin.lastName}</option>
                                                                                                ))}
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                    
                                                                                </select>
                                                                                    )    
                                                                            }
                                                                                <button id={`button${innerIndex}`} className={class_edcod} onClick={() => clickButtonSLS(innerItem.id_dok,innerIndex)}>{edcod}</button>
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