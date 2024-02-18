import { useState,useEffect } from "react";


function ListRekap(props) {

    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ dataLen, setDataLen ] = useState();
    const [ expandedIndex, setExpandedIndex ] = useState(null);
    const [ kodeKecActive, setKodeKecActive ] = useState(null);
    const [ kodeDesaActive, setKodeDesaActive ] = useState(null);

    let prevKec = null;
    let prevDesa = null;

    const handleCardClick = (kode_kec) => {
        setKodeDesaActive(null);
        setKodeKecActive(kode_kec === kodeKecActive ? null : kode_kec);
    };

    const desaClick = (kode_desa) => {
        setKodeDesaActive(kode_desa === kodeDesaActive ? null : kode_desa);
    }

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
                    setDataLen(data.length - 1);
                    setIsLoading(false)
                    console.log("Data : ", data);
                });

            
        }
        fetchData();
        
        // Jika sudah masuk fase production, hapus log ini

    },[props.id]);

    return (
        <>
            {isLoading ? (
                <div>
                    Lagi Loading
                </div>
            ) : (
                <div className="here">
                    {
                        data.map((item,index) => {
                            // show Kec
                            if (item.kode_kec !== prevKec){
                                prevKec = item.kode_kec;
                                return (
                                    <div key={index} className="row mt-3">
                                        <div className="kecamatan cursor-pointer mx-3 flex mt-1 mb-1 p-3 bg-[#418EC6] text-white text-xs rounded-md hover:bg-sky-400" onClick={ () => handleCardClick(item.kode_kec)}>    
                                            <span className="w-fit ml-1">{item.kode_kec}</span>
                                            <span className="w-full text-center">{item.Kec}</span>
                                        </div>
                                        {(expandedIndex === index) && (
                                            <div className="Desa">
                                                Desa : {item.Desa}
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                            // show Desa
                            if(item.kode_desa != prevDesa){
                                if (item.kode_kec == kodeKecActive){
                                    prevDesa = item.kode_desa
                                    return(
                                        <div key={index} className="Desa cursor-pointer my-1 mr-3 ml-6 bg-[#17B715] hover:bg-[#30D32E] text-white p-2 rounded-md text-xs flex" onClick={() => desaClick(item.kode_desa)}>
                                            <div className="w-fit">{item.kode_desa}</div>
                                            <div className="w-full text-center ">{item.Desa}</div>
                                        </div>
                                    )
                                }
                                
                            }
                            // show sls
                            if (item.kode_kec == kodeKecActive){
                                if (item.kode_desa == kodeDesaActive){
                                    return(
                                        <div key={index} className="mr-3 p-1 ml-9 my-1 bg-[#F5F4F4] rounded-md text-xs">
                                            <div className="">{item.kode_sls}</div>
                                            <div className="">{item.SLS}</div>
                                        </div>
                                    )
                                }
                                
                            }
                            
                        })
                    }
                </div>
            )}
        </>
    )
}

export default ListRekap;