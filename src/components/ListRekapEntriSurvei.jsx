import { useState,useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ListRekapEntriSurvei(props, { onDataFromChild }) {

    const navigate = useNavigate()
    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ dataLen, setDataLen ] = useState();
    const [ kodeKecActive, setKodeKecActive ] = useState({});
    const [ kodeDesaActive, setKodeDesaActive ] = useState({});
    const [ isClassAdded, setIsClassAdded ] = useState(false);
    const [ showTItle, setShowTitle ] = useState({});
    const [ showTItleKec, setShowTitleKec ] = useState({});


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

        fetchData();
        // fetchDataUsers();

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
                                                                                </div>

                                                                                <div className="the-ruta grid grid-cols-2 md:mx-auto max-w-3xl ml-10">
                                                                                    {
                                                                                        data.filter((insideItem) => (insideItem.id_x === innerItem.id_x) && (insideItem.kode_kec === innerItem.kode_kec) && (insideItem.kode_desa === innerItem.kode_desa) ).map((insideItem,insideIndex) => {
                                                                                            return (
                                                                                                <div key={insideIndex} className="bg-[#F5F4F4] mx-1 my-1 p-2 grid grid-cols-5 text-xs rounded-lg">
                                                                                                    <div className="mx-3">{insideItem.no_ruta}</div>
                                                                                                    <div className="col-span-3">{insideItem.KRT}</div>
                                                                                                    <select name="" id="" className="mr-2">
                                                                                                        <option value="1">1</option>
                                                                                                    </select>
                                                                                                    <button className="status-edcod hover:bg-slate-100 col-start-8 w-fit text-center mr-2 md:mr-1 bg-white rounded-full md:p-3 p-1 border-2 border-slate-200">sudah</button>
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