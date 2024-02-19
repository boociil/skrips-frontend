import { useState,useEffect } from "react";
import ConfirmCard from './confirmCard';

function ListRekap(props) {

    const [ data, setData ] = useState([]);
    const [ dataAdmin, setDataAdmin ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoadingPetugas, setIsLoadingPetugas ] = useState(true);
    const [ dataLen, setDataLen ] = useState();
    const [ kodeKecActive, setKodeKecActive ] = useState(null);
    const [ kodeDesaActive, setKodeDesaActive ] = useState(null);
    const [ isClassAdded, setIsClassAdded ] = useState(false);
    const [ selectPenerima, setSelectPenerima ] = useState({});
    const [ showConfirmCard, setShowConfirmCard ] = useState(false);

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
        const milliseconds = now.getMilliseconds();

        const time = `${year}-${month+1}-${date} ${hours}:${minutes}:${seconds}`;

        return time;
    }

    const updateRB = (id_dok,penerima,status) => {
        const time_now = timeNow()
        const requestOptions = {
            method: 'POST', // Metode HTTP
            headers: {
                'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
            },
            body: JSON.stringify({ 
                "id_kegiatan" : props.id,
                "id_dok" : id_dok,
                "tgl_pengdok" : time_now,
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

    const clickButtonSLS = (index,id_dok,idx) => {
        console.log("Penerima : ",selectPenerima[index])
        const penerima = selectPenerima[index]
        console.log("id_dok : ",id_dok);
        console.log();
        
        // validasi
        if(selectPenerima[index]){
            // ubah tampilan di front end
            const button = document.getElementById('button' + idx);
            button.innerHTML = "Sudah"
            button.classList.remove('text-[#EF0D0D]');
            button.classList.add('text-[#14CB11]')
            // fetch data ke backend
            updateRB(id_dok,penerima,1);
        }else{
            if(data[idx].status_pengdok){
                console.log("Kalau mau mengundo status RB, maka disini");
                const button = document.getElementById('button' + idx);
                button.innerHTML = "Belum"
                button.classList.remove('text-[#14CB11]');
                button.classList.add('text-[#EF0D0D]')
                // fetch data ke backend
                // updateRB(id_dok,penerima,1);
            }else{
                alert("Pilih Penerima");
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
        setKodeDesaActive(null);
        setKodeKecActive(kode_kec === kodeKecActive ? null : kode_kec);
        setIsClassAdded(false);
        delay(100).then( function () {
            setIsClassAdded(true);
        })
    
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
                    // console.log(data)
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
                    // console.log("Data Petugas : ", data);
                });            
        }

        fetchData();
        fetchDataUsers();
        // Jika sudah masuk fase production, hapus log ini

    },[props.id]);

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
                                            if(subItem.kode_kec === kodeKecActive){
                                                if(subItem.kode_desa !== prevDesa){
                                                    prevDesa = subItem.kode_desa
                                                    let class_desa = "Desa transition duration-300 scale-95 cursor-pointer my-1 mr-3 ml-6 bg-[#17B715] hover:bg-[#30D32E] text-white p-2 rounded-md text-xs flex opacity max-w-4xl md:mx-auto"
                                                    let class_desa_2 = "Desa transition duration-300 scale-100 cursor-pointer my-1 mr-3 ml-6 bg-[#17B715] hover:bg-[#30D32E] text-white p-2 rounded-md text-xs flex opacity max-w-4xl md:mx-auto"
                                                    prevDesa = subItem.kode_desa
                                                    return (
                                                        <div key={subIndex} className="the-inside-row">
                                                            <div id="the-desa" className={isClassAdded ? class_desa_2 : class_desa} onClick={() => desaClick(subItem.kode_desa)}>
                                                                <div className="w-fit">{subItem.kode_desa}</div>
                                                                <div className="w-full text-center ">{subItem.Desa}</div>
                                                            </div>
                                                            {data.filter((innerItem) => innerItem.kode_desa === subItem.kode_desa).map((innerItem,innerIndex) => {
                                                                //show sls
                                                                if(innerItem.kode_kec === kodeKecActive){
                                                                    if (innerItem.kode_desa === kodeDesaActive){
                                                                        let edcod = "Belum"
                                                                        let class_edcod = "status-edcod col-start-8 w-fit text-center mr-2 md:mr-1 bg-white rounded-full p-2 border-2 border-slate-200"
                                                                        if (innerItem.status_pengdok != null){
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
                                                                        return(
                                                                            <div key={innerIndex} className={isClassAdded ? class_sls2 : class_sls}>
                                                                                <div className="w-fit">{innerItem.kode_sls}</div>
                                                                                <div className="w-full md:w-fit ml-2 col-start-2 col-span-2">{" " + innerItem.SLS}</div>
                                                                                <label htmlFor={`select-${innerIndex}`}></label>
                                                                                <div className="hidden md:block mx-auto col-start-5">pml : {pml}</div>
                                                                                <div className="hidden md:block mx-auto col-start-6">ppl : {pml}</div>
                                                                                <select 
                                                                                className="sm:mr-5 mr-1 rounded-lg col-start-7"
                                                                                name="selectPenerima" 
                                                                                id={`select-${innerItem.id_dok}`}
                                                                                value={selectPenerima[innerItem.id_dok]} 
                                                                                onChange={(event) => handleSelectPenerimaChange(event, innerItem.id_dok)}
                                                                                >
                                                                                    { 
                                                                                        ada ? (
                                                                                            <>
                                                                                                {dataAdmin.map((admin,admin_index) => (
                                                                                                    <option value={admin.username} key={admin_index}>{admin.username}</option>
                                                                                                ))}
                                                                                            </>
                                                                                        ) :(
                                                                                            <>
                                                                                                <option value="-" key="-">-</option>
                                                                                                {dataAdmin.map((admin,admin_index) => (
                                                                                                    <option value={admin.username} key={admin_index}>{admin.username}</option>
                                                                                                ))}
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                    
                                                                                </select>
                                                                                <button id={`button${innerIndex}`} className={class_edcod} onClick={() => clickButtonSLS(innerItem.id_dok,innerItem.id_dok,innerIndex)}>{edcod}</button>
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