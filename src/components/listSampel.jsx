import { useState,useEffect, useRef } from "react";
import GeneratedSampel from "./GeneratedSampel";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";


function ListSampel(props, { onDataFromChild }) {

    const navigate = useNavigate()
    const generatedSampelRef = useRef({})
    const [ data, setData ] = useState([]);
    const [ data2, setData2 ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ dataLen, setDataLen ] = useState();
    const [ kodeKecActive, setKodeKecActive ] = useState({});
    const [ kodeDesaActive, setKodeDesaActive ] = useState({});
    const [ isClassAdded, setIsClassAdded ] = useState(false);
    const [ showTItle, setShowTitle ] = useState({});
    const [ showTItleKec, setShowTitleKec ] = useState({});
    const [ noBS, setNoBs ] = useState({});
    const [ noKS, setNoKS ] = useState({});
    const [ ruta, setRuta ] = useState({});
    const [ isSampel, setIsSampel ] = useState({});
    const [ generateSampel, setGenerateSampel ] = useState({});
    const [ krt, setKRT ] = useState({});
    const [ desa, setDesa ] = useState({});
    const [ kec, setKec ] = useState({});
    const [ cookies, setCookie, removeCookie ] = useCookies(['token']);
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const setGeneratedSampelRef = (id, ref) => {
        generatedSampelRef.current[id] = ref;
    };

    useEffect(() =>{

        const fetchData = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                const link = backendUrl + 'get_sls'
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    
                    
                });            
        }

        const fetchData2 = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                const link = backendUrl + 'get_sls2'
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData2(data);
                    
                    setDataLen(data.length - 1);
                    setIsLoading(false)
                });            
        }

        // fetchData();
        fetchData2();

    },[props.id]);

    let prevKec = null;
    let prevDesa = null;


    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const onKRTChange = (event,id,noRuta) => {
        const value = event.target.value;

        setKRT(prevSelectValues => ({
            ...prevSelectValues,
            [id]: {
                ...prevSelectValues[id],
                [noRuta]: value
            }
        }));

    }

    const onNoBsChange = (event,id) => {
        const value = event.target.value;
    
        // Menyalin objek selectValues dan memperbarui nilai untuk elemen yang sesuai
        setNoBs(prevSelectValues => ({
          ...prevSelectValues,
          [id]: value
        }));
    }

    const onNoKSChange = (event,id) => {
        const value = event.target.value;
    
        // Menyalin objek selectValues dan memperbarui nilai untuk elemen yang sesuai
        setNoKS(prevSelectValues => ({
          ...prevSelectValues,
          [id]: value
        }));
    }

    const onRutaChange = (event,id) => {
        const value = event.target.value;
    
        // Menyalin objek selectValues dan memperbarui nilai untuk elemen yang sesuai
        setRuta(prevSelectValues => ({
          ...prevSelectValues,
          [id]: value
        }));
    }

    const isSampelChange = (id,kode_desa,kode_kec) => {
    
        // Menyalin objek selectValues dan memperbarui nilai untuk elemen yang sesuai
        if(isSampel[id]){
            setIsSampel(prevSelectValues => ({
                ...prevSelectValues,
                [id]: false
            }));

            setKRT(prevSelectValues => ({
                ...prevSelectValues,
                [id]: null
            }));

            setRuta(prevSelectValues => ({
                ...prevSelectValues,
                [id]: null
            }));

            setNoBs(prevSelectValues => ({
                ...prevSelectValues,
                [id]: null
            }));

            setNoKS(prevSelectValues => ({
                ...prevSelectValues,
                [id]: null
            }));

            setGenerateSampel(prevSelectValues => ({
                ...prevSelectValues,
                [id]: false
            }));

            setDesa(prevSelectValues => ({
                ...prevSelectValues,
                [id]: null
              }));
              setKec(prevSelectValues => ({
                ...prevSelectValues,
                [id]: null
              }));

        }else{
            setIsSampel(prevSelectValues => ({
                ...prevSelectValues,
                [id]: true
              }));
              setDesa(prevSelectValues => ({
                ...prevSelectValues,
                [id]: kode_desa
              }));
              setKec(prevSelectValues => ({
                ...prevSelectValues,
                [id]: kode_kec
              }));
        }

        
    }

    const generateButtonClick = (index) => {


        if (ruta[index] !== undefined){
            if(generateSampel[index]){
                setGenerateSampel(prevSelectValues => ({
                    ...prevSelectValues,
                    [index]: false
                }));
            }else{
                setGenerateSampel(prevSelectValues => ({
                    ...prevSelectValues,
                    [index]: true
                }));
                setKRT(prevSelectValues => ({
                    ...prevSelectValues,
                    [index]: null
                }));
            }
        }else{
            alert("Masukan jumlah ruta")
        }
    }

    const sendData = (o) => {
        const requestOptions = {
        method: 'POST', // Metode HTTP
        headers: {
            'Content-Type': 'application/json', // Tentukan tipe konten yang Anda kirimkan
            'token' : cookies['token']
        },
            body: JSON.stringify( o ) 
        };
        const link = 'http://localhost:3001/fill_survei/' + props.id
        fetch(link,  requestOptions)
        .then(response => response.json())
        .then(data => {
            // Notifikasi
            navigate('/Rekap/', props.id)
        }); 
    }

    const onSubmitButtonClick = () => {

        let o = ({})

        for (let key in isSampel) {

            o[key] = ({})
            o[key]["noKS"] = noKS[key]
            o[key]["noBS"] = noBS[key]
            o[key]["jumlah_ruta"] = ruta[key]
            o[key]["krt"] = krt[key]
            o[key]["kode_desa"] = desa[key]
            o[key]["kode_kec"] = kec[key]
        }
        // sendData(o);
        // navigate("/AssignPetugas/" + props.id)
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
                        <button className="bg-[#F5F4F4] rounded-lg ml-16 p-2 text-black hover:bg-slate-300"
                            onClick={onSubmitButtonClick}
                            >
                            Submit
                        </button>
                    </div>
                    {
                        data2.map((item,index) => {
                            // show Kec
                            if (item.kode_kec !== prevKec){
                                prevKec = item.kode_kec;
                                return (
                                    <div key={index} className="row mt-3 max-w-5xl mx-auto">
                                        
                                        <div className="kecamatan w-full cursor-pointer flex gap-2 mt-1 mb-1 p-3 bg-[#418EC6] text-white text-xs rounded-md hover:bg-sky-400 " onClick={ () => handleCardClick(item.kode_kec)}>    
                                            <div className="w-fit md:col-start-1 ml-1 ">{item.kode_kec}</div>
                                            <div className="w-full md:col-start-2 md:col-span-3 ">{item.Kec}</div>
                                            <div className="hidden md:block md:col-start-5">-</div>
                                            <div className="hidden md:block md:col-start-6">-</div>
                                        </div>

                                        {data2.filter((subItem) => item.kode_kec === subItem.kode_kec).map((subItem,subIndex) => {
                                            
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
                                                            <div id="the-desa" className="Desa transition lg:w-[94%] lg:ml-8 ml-10 gap-2 duration-300 scale-100 cursor-pointer my-1 bg-[#17B715] hover:bg-[#30D32E] text-white md:p-3 p-2 rounded-md text-xs flex" onClick={() => desaClick(subItem.kode_desa,subItem.kode_kec)}>
                                                                <div className="w-fit">{subItem.kode_desa}</div>
                                                                <div className="w-full">{subItem.Desa}</div>
                                                            </div>

                                                            {/* { on_show_title ? (
                                                                <div className="Judul" id={`title=${subItem.kode_desa}`}>
                                                                    <span>Korong</span>
                                                                    <span>Nomor BS</span>
                                                                    <span>Nomor KS</span>
                                                                    <span>Jumlah Ruta</span>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                </>
                                                            )
                                                                
                                                            } */}
                                                            {data2.filter((innerItem) => (innerItem.kode_desa === subItem.kode_desa) && (innerItem.kode_kec === subItem.kode_kec) ).map((innerItem,innerIndex) => {
                                                                
                                                                //show sls
                                                                
                                                                let the_open = null

                                                                if(kodeDesaActive && kodeDesaActive[innerItem.kode_kec] && kodeDesaActive[innerItem.kode_kec][innerItem.kode_desa]){
                                                                    the_open = kodeDesaActive[innerItem.kode_kec][innerItem.kode_desa]
                                                                }


                                                                if(the_open){
                                                                    return(
                                                                        <div  key={innerIndex} className="the-inside-row lg:grid lg:justify-items-end w-full">
                                                                            <div className={`p-1 md:p-2 lg:w-[88%] ml-20 my-1 bg-[#F5F4F4] rounded-md text-xs flex`}>
                                                                                <div className={`md:w-fit ml-2 col-start-1 col-span-2 min-w-80 h-4 ${isSampel[innerIndex] ? ('') : ('overflow-hidden whitespace-nowrap text-overflow-ellipsis')}`}>
                                                                                    <span className="w-fit text-center ">{innerItem.kode_sls}</span>
                                                                                    {" " + innerItem.SLS}
                                                                                </div>
                                                                                <div className={`flex items-center mx-auto ${isSampel[innerIndex] ? ('') : ('hidden')}`}>
                                                                                    <input 
                                                                                        name="noKS"
                                                                                        placeholder="NKS"
                                                                                        type="text" 
                                                                                        value={noKS[innerIndex] || ''}
                                                                                        onChange={(event) => {onNoKSChange(event,innerIndex)}}
                                                                                        className="kerangka-sampel text-center col-start-3 min-h-8 w-20 rounded-lg text-sm ml-1" 
                                                                                    />
                                                                                </div>

                                                                                <div className="flex items-center mx w-8">
                                                                                    <input 
                                                                                    name="noBs"
                                                                                    placeholder="NBS"
                                                                                    type="text" 
                                                                                    value={noBS[innerIndex] || ''}
                                                                                    onChange={(event) => {onNoBsChange(event,innerIndex)}}
                                                                                    className={`Blok-Sensus text-center col-start-4 min-h-8 w-20 rounded-lg text-sm ml-4 ${isSampel[innerIndex] ? ('') : ('hidden')}`} 
                                                                                    />   
                                                                                </div>
                                                                                
                                                                                <div className="flex items-center mx-auto">
                                                                                    <input 
                                                                                    name="ruta"
                                                                                    type="number" 
                                                                                    placeholder="Jumlah Ruta"
                                                                                    value={ruta[innerIndex] || ''}
                                                                                    onChange={(event) => {onRutaChange(event,innerIndex)}}
                                                                                    className={`jumlah-ruta col-start-5 min-h-8 w-20 rounded-md ml-4 text-center ${isSampel[innerIndex] ? ('') : ('hidden')}`}
                                                                                    />
                                                                                </div>
                                                                                
                                                                                <button 
                                                                                    className={`bg-white col-start-6 ml-2 rounded-lg hover:bg-slate-200 ${isSampel[innerIndex] ? ('') : ('hidden')} `}
                                                                                    onClick={() => generateButtonClick(innerIndex)}
                                                                                    >
                                                                                        Generate Sampel
                                                                                </button>

                                                                                {/* CHEKBOX isSampel */}
                                                                                <div className="flex items-center mx-auto">
                                                                                    <input 
                                                                                    type="checkbox" 
                                                                                    name="" 
                                                                                    id="" 
                                                                                    className="w-4 h-4" 
                                                                                    checked={isSampel[innerIndex] || false}
                                                                                    onChange={() => {isSampelChange(innerIndex,innerItem.kode_desa,innerItem.kode_kec)}}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            {
                                                                                generateSampel[innerIndex] ? (
                                                                                    <div className={`generated-sampel  ml-10 mr-4 md:mx-auto max-w-2xl ${isSampel[innerIndex] ? ('') : ('hidden')}`} ref={ref => setGeneratedSampelRef(innerIndex, ref)}>
                                                                                        <GeneratedSampel total={ruta[innerIndex]} isi={krt} id={innerIndex} onChange={onKRTChange} />
                                                                                    </div>
                                                                                ) : (
                                                                                    <>
                                                                                        
                                                                                    </>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    )
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

export default ListSampel;