import { useState,useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ListRekapEntriSurvei(props, { onDataFromChild }) {

    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ dataAdmin, setDataAdmin ] = useState([]);
    const [ dataLen, setDataLen ] = useState();
    const [ kodeKecActive, setKodeKecActive ] = useState({});
    const [ kodeDesaActive, setKodeDesaActive ] = useState({});
    const [ isClassAdded, setIsClassAdded ] = useState(false);
    const [ showTItle, setShowTitle ] = useState({});
    const [ showTItleKec, setShowTitleKec ] = useState({});
    const [ isLoadingPetugas, setIsLoadingPetugas ] = useState(true);
    const [ penerimaDok, setPenerimaDok ] = useState({})
    const penerimaRef = useRef({});

    useEffect(() =>{

        const fetchData = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                const link = 'http://localhost:3001/get_pengolahan_data_survei/' + props.id
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    console.log("the data : ",data)
                    setDataLen(data.length - 1);
                    setIsLoading(false)
                    console.log(link);
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
                    console.log("admin", data);
                    dataAdmin.map((admin,admin_index) => {
                        console.log(admin.username);
                    })
                    setIsLoadingPetugas(false);
                });            
        }     

        fetchData();
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

    const updateRB = (nbs,nks,ruta,time,status,penerima) => {
        
        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
            },
            body: JSON.stringify({ 
                "id_kegiatan" : props.id,
                "no_blok_sensus" : nbs,
                "no_kerangka_sampel" : nks,
                "no_ruta" : ruta,
                "tgl_pengdok" : time,
                "penerima_dok" : penerima,
                "status_pengdok" : status
             }) 
        };
        
            fetch('http://localhost:3001/update_RB_survei' , requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
            });
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

        console.log("ruta dan x : ",ruta,x);
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

    const clickButtonSampel = (ruta,x,nbs,nks) => {
        
        const num = ruta + "" + x
        const button = document.getElementById('button-' + ruta + '-' + x  );
        const select = penerimaRef.current[num]

        console.log("select : ", select);

        let the_value = null
        if (penerimaDok && penerimaDok[x] && penerimaDok[x][ruta]){
            the_value = penerimaDok[x][ruta]
        }

        const time_now = timeNow()

        if(button.innerHTML === "Sudah"){
            button.classList.remove('text-[#14CB11]');
            button.classList.add('text-[#EF0D0D]');
            select.classList.remove('pointer-events-none')
            select.classList.remove('opacity-75')
            button.innerHTML = "Belum";
            setPenerimaDok(prevSelectValues => ({
                ...prevSelectValues,
                [x]: {
                    ...prevSelectValues[x],
                    [ruta]: select.value
                }
            }));
            // fetch data ke backend
            updateRB(nbs,nks,ruta,"0000-00-00 00:00:00",0,undefined);
        }else{
            if (the_value){
                button.classList.remove('text-[#EF0D0D]');
                button.classList.add('text-[#14CB11]');
                button.innerHTML = "Sudah";
                select.classList.add('pointer-events-none')
                select.classList.add('opacity-75')

                // fetch data ke backend
                updateRB(nbs,nks,ruta,time_now,1,the_value);
            }else{
                alert("Pilih penerima");
            }
            
        }
    }


    const desaClick = (kode_desa,kode_kec_1) => {

        console.log(kode_desa, kode_kec_1);

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
            {isLoading ? (
                <div>
                    {/* Ketika komponen sedang loading, tambahkan animasi disini */}
                    Lagi Loading
                </div>
            ) : (
                <div className="here">
                    <div className="">
                        
                    </div>
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
                                                    const on_show_title = () => {
                                                        if(showTItle[subItem.kode_desa]){
                                                            if(showTItleKec[subItem.kode_kec]){
                                                                return true;
                                                            }
                                                        }
                                                        return false
                                                    }
                                                    return (
                                                        <div key={subIndex} className="the-inside-row">
                                                            <div id="the-desa" className={isClassAdded ? class_desa_2 : class_desa} onClick={() => desaClick(subItem.kode_desa,subItem.kode_kec)}>
                                                                <div className="w-fit">{subItem.kode_desa}</div>
                                                                <div className="w-full text-center ">{subItem.Desa}</div>
                                                                
                                                            </div>
                                                            {data.filter((innerItem) => (innerItem.kode_desa === subItem.kode_desa) && (innerItem.kode_kec === subItem.kode_kec) ).map((innerItem,innerIndex) => {
                                                                
                                                                //show sls
                                                                let the_open = null

                                                                if(kodeDesaActive && kodeDesaActive[innerItem.kode_kec] && kodeDesaActive[innerItem.kode_kec][innerItem.kode_desa]){
                                                                    the_open = kodeDesaActive[innerItem.kode_kec][innerItem.kode_desa]
                                                                }

                                                                if(the_open){
                                                                    if(innerItem.id_x !== prevKorong ){
                                                                        prevKorong = innerItem.id_x
                                                                        return(
                                                                            <div  key={innerIndex}>
                                                                                <div className={`mr-3 p-1 sm:p-2 sm:grid sm:grid-cols-6  ml-9 my-1 bg-[#F5F4F4] rounded-md text-xs flex md:mx-auto max-w-3xl transition duration-300 scale-95`}>
                                                                                    <div className="w-full md:w-fit ml-2 col-start-1 col-span-2">{" " + innerItem.nama_x}</div>    
                                                                                    <div className="no-bs">{innerItem.no_blok_sensus}</div>
                                                                                    <div className="no-bs">{innerItem.no_kerangka_sampel}</div>
                                                                                    <div className="ppl">PPL</div>
                                                                                    <div className="ppl">PML</div>
                                                                                </div>

                                                                                <div className="the-ruta grid grid-cols-2 md:mx-auto max-w-3xl ml-10">
                                                                                    {
                                                                                        data.filter((insideItem) => (insideItem.id_x === innerItem.id_x) && (insideItem.kode_kec === innerItem.kode_kec) && (insideItem.kode_desa === innerItem.kode_desa) ).map((insideItem,insideIndex) => {
                                                                                            let isRB = false
                                                                                            if ((insideItem.status_pengdok !== null) && (innerItem.status_pengdok !== 0)){
                                                                                                isRB = true
                                                                                            }
                                                                                            
                                                                                            let the_value = ''
                                                                                            if (penerimaDok && penerimaDok[insideItem.id_x] && penerimaDok[insideItem.id_x][insideItem.no_ruta]){
                                                                                                the_value = penerimaDok[insideItem.id_x][insideItem.no_ruta]
                                                                                            }else{
                                                                                                // console.log('the value : ',penerimaDok);
                                                                                            }
                                                                                            const ref_num = insideItem.no_ruta + "" + insideItem.id_x
                                                                                            const index_admin = dataAdmin.findIndex(item => item.username === insideItem.penerima_dok)
                                                                                            // console.log("index admin : ", index_admin, insideItem.no_ruta);
                                                                                            return (
                                                                                                <div key={insideIndex} className="bg-[#F5F4F4] mx-1 my-1 p-2 grid grid-cols-5 text-xs rounded-lg">
                                                                                                    
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
                                                                                                        onChange={(event) => handleRutaChange(event,insideItem.no_ruta,insideItem.id_x)}
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
                                                                                                                                <option value={insideItem.penerima_dok} key={insideItem.penerima_dok}>{dataAdmin[index_admin].firstName + " " + dataAdmin[index_admin].lastName }</option>
                                                                                                                                {dataAdmin.filter((admin) => admin.username !== insideItem.penerima_dok).map((admin,admin_index) => (
                                                                                                                                    <option value={admin.username} key={admin_index}>{admin.firstName + " " + admin.lastName}</option>
                                                                                                                                ))} 
                                                                                                                            </>
                                                                                                                        ) : (
                                                                                                                            <>
                                                                                                                                <option value="-" key="-">-</option>
                                                                                                                                {dataAdmin.map((admin,admin_index) => (
                                                                                                                                    <option value={admin.username} key={admin_index}>{admin.firstName + " " + admin.lastName}</option>
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
                                                                                                        className={`status-edcod hover:bg-slate-100 col-start-8 w-fit text-center mr-2 md:mr-1 bg-white rounded-full md:p-3 p-1 border-2 border-slate-200 ${isRB ? ("text-[#14CB11]") : ("text-[#EF0D0D]")}`}
                                                                                                        id={`button-${insideItem.no_ruta}-${insideItem.id_x}`}
                                                                                                        onClick={() => clickButtonSampel(insideItem.no_ruta, insideItem.id_x,insideItem.no_blok_sensus, insideItem.no_kerangka_sampel)}
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