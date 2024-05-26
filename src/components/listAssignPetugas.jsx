import { useState,useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ListAssignPetugas(props) {

    const navigate = useNavigate();
    const penerimaRef = useRef({});
    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoadingPetugas, setIsLoadingPetugas ] = useState(true);
    const [ dataLen, setDataLen ] = useState();
    const [ kodeKecActive, setKodeKecActive ] = useState({});
    const [ kodeDesaActive, setKodeDesaActive ] = useState({});
    const [ kodeKecActive1, setKodekecActive1 ] = useState({});
    const [ isClassAdded, setIsClassAdded ] = useState(false);
    const [ selectPenerima, setSelectPenerima ] = useState({});
    const [ dataPetugas, setDataPetugas ] = useState([]);
    const [ ppl, setPPL ] = useState({})
    const [ pml, setPML ] = useState({})
    const [ koseka, setKoseka ] = useState({})
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    useEffect(() =>{

        const fetchData = () => {   
            let firstLink = ''

            if(!props.isSurvei){
                firstLink = backendUrl +  'get_pengolahan_data/';
            }else{
                firstLink = backendUrl +  'get_pengolahan_data_survei/';
            }
            
            const link = firstLink + props.id
            
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    
                    setDataLen(data.length - 1);
                    setIsLoading(false)
                });            
        }

        const fetchDataUsers = () => {   
            
            const link = backendUrl + "get_all_users"
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataPetugas(data);
                    
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


    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handlePPLChange = (event, id) => {
        const value = event.target.value;
    
        // Menyalin objek selectValues dan memperbarui nilai untuk elemen yang sesuai
        setPPL(prevSelectValues => ({
          ...prevSelectValues,
          [id]: value
        }));
    };
    const handlePMLChange = (event, id) => {
        const value = event.target.value;
    
        // Menyalin objek selectValues dan memperbarui nilai untuk elemen yang sesuai
        setPML(prevSelectValues => ({
          ...prevSelectValues,
          [id]: value
        }));
    };
    const handleKosekaChange = (event, id) => {
        const value = event.target.value;
    
        // Menyalin objek selectValues dan memperbarui nilai untuk elemen yang sesuai
        setKoseka(prevSelectValues => ({
          ...prevSelectValues,
          [id]: value
        }));
    };

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
    
    function onSubmitButtonClick() {
        // send data here
        const arrppl = Object.assign(ppl)
        const arrpml = Object.assign(pml)
        const arrKoseka = Object.assign(koseka)
        let arr_to_send = ([arrppl,arrpml,arrKoseka])
        

        // sending data
        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
            },
                body: JSON.stringify(arr_to_send) 
            };
            const link = 'http://localhost:3001/assign_petugas/' + props.id
            fetch(link,  requestOptions)
            .then(response => response.json())
            .then(data => {
                
            });
            navigate("/Rekap");
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

                                                                let the_open = null;

                                                                if(kodeDesaActive && kodeDesaActive[innerItem.kode_kec] && kodeDesaActive[innerItem.kode_kec][innerItem.kode_desa]){
                                                                    the_open = kodeDesaActive[innerItem.kode_kec][innerItem.kode_desa]
                                                                }
                                                                
                                                                if(the_open){
                                                                    
                                                                        return(
                                                                            <div key={innerIndex} className={`mr-3 p-1 md:p-2 md:grid md:grid-cols-8 ml-9 my-1 bg-[#F5F4F4] rounded-md text-xs flex md:mx-auto max-w-3xl transition duration-300 scale-95`}>
                                                                                <div className="w-fit">{innerItem.kode_sls}</div>
                                                                                <div className="w-full md:w-fit ml-2 col-start-2 col-span-2">{" " + innerItem.SLS}</div>
                                                                                {
                                                                                    isLoadingPetugas ? (
                                                                                        <>

                                                                                        </>
                                                                                    ) : (

                                                                                    <>
                                                                                        <input 
                                                                                            className="text-center rounded-md"
                                                                                            type="number" 
                                                                                            name="total_dokumen"
                                                                                            placeholder="total dokumen"
                                                                                        />
                                                                                        
                                                                                        {/* ppl */}
                                                                                        <select 
                                                                                            className={`min-h-8 sm:mr-5 mr-1 rounded-lg col-start-6 min-w-16 max-w-16 overflow-hidden`}
                                                                                            name="selectPenerima" 
                                                                                            id={`select-${innerItem.id_dok}`}
                                                                                            value={ppl[innerItem.id_dok]} 
                                                                                            onChange={(event) => handlePPLChange(event, innerItem.id_dok)}
                                                                                        >
                                                                                            <option value="-">PPL</option>
                                                                                            {
                                                                                                dataPetugas.map((pet,index) => (
                                                                                                    <option value={pet.username} key={index}>{pet.firstName + " " + pet.lastName}</option>
                                                                                                ))
                                                                                            }
                                                                                        </select>
                                                                                        
                                                                                        {/* pml */}
                                                                                        <select 
                                                                                            className={`min-h-8 sm:mr-5 mr-1 rounded-lg col-start-7 min-w-16 max-w-16 overflow-hidden`}
                                                                                            name="selectPenerima" 
                                                                                            id={`select-${innerItem.id_dok}`}
                                                                                            value={pml[innerItem.id_dok]} 
                                                                                            onChange={(event) => handlePMLChange(event, innerItem.id_dok)}
                                                                                        >
                                                                                            <option value="-">PML</option>
                                                                                            {
                                                                                                dataPetugas.map((pet,index) => (
                                                                                                    <option value={pet.username} key={index}>{pet.firstName + " " + pet.lastName}</option>
                                                                                                ))
                                                                                            }
                                                                                        </select>

                                                                                        {/* Koseka */}
                                                                                        <select 
                                                                                            className={`min-h-8 sm:mr-5 mr-1 rounded-lg col-start-8 min-w-16 max-w-16 overflow-hidden`}
                                                                                            name="selectPenerima" 
                                                                                            id={`select-${innerItem.id_dok}`}
                                                                                            value={koseka[innerItem.id_dok]} 
                                                                                            onChange={(event) => handleKosekaChange(event, innerItem.id_dok)}
                                                                                        >
                                                                                            <option value="-">Koseka</option>
                                                                                            {
                                                                                                dataPetugas.map((pet,index) => (
                                                                                                    <option value={pet.username} key={index}>{pet.firstName + " " + pet.lastName}</option>
                                                                                                ))
                                                                                            }
                                                                                        </select>
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

export default ListAssignPetugas;