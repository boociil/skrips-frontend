import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Bar,Line,Doughnut } from "react-chartjs-2";
import 'chart.js/auto';
import TopNavAdmin from "../components/Navbar";
import Loading from "../components/Loading";
import TableDash from "../components/TabelDash"
import { AuthContext } from "../components/AuthContext";


function DashboardWithId() {
    const { id_kegiatan } = useParams();    
    const [ dataProgresKecamatan, setDataProgresKecamatan ] = useState();
    const [ isSurvei, setIsSurvei ] = useState();
    const [ isLoading, setIsLoading ] = useState();
    const [ isLoadingProgres, setIsLoadingProgres ] = useState(true);
    const [ namaKegiatan, setNamaKegiatan ] = useState();
    const [ dataOverallProgres, setDataOverallProgres ] = useState();
    const [ loadingOverallProgres, setLoadingOverallProgres ] = useState(true);
    const [ startRB, setStartRB ] = useState();
    const [ startEdcod, setStartEdcod ] = useState();
    const [ startEntri, setStartEntri ] = useState();
    const [ deadlineRb, setDeadlineRb ] = useState();
    const [ deadlineEdcod, setDeadlineEdcod ] = useState();
    const [ deadlineEntri, setDeadlineEntri ] = useState();
    const [ loadingProgresPengdok, setLoadingProgresPengdok ] = useState(true);
    const [ loadingProgresEdcod, setLoadingProgresEdcod ] = useState(true);
    const [ loadingProgresEntri, setLoadingProgresEntri ] = useState(true);
    const [ dataPetugasRB, setDataPetugasRB ] = useState();
    const [ dataPetugasEdcod, setDataPetugasEdcod ] = useState();
    const [ dataPetugasEntri, setDataPetugasEntri ] = useState();
    const [ graphDefRB, setGraphDefRB ] = useState(false);
    const [ graphDefEdcod, setGraphDefEdcod ] = useState(false);
    const [ graphDefEntri, setGraphDefEntri ] = useState(false);
    const [ defaultTitles, setDefaultTitles ] = useState(['Kegiatan Belum Dimulai']);
    const [ defaultVal, setDefaultVal ] = useState([0]);
    const [ titleGraphRb, setTitleGraphRb ] = useState();
    const [ valGraphRb, setValGraphRb ] = useState();
    const [ titleGraphEdcod, setTitleGraphEdcod ] = useState();
    const [ valGraphEdcod, setValGraphEdcod ] = useState();
    const [ titleGraphEntri, setTitleGraphEntri ] = useState();
    const [ valGraphEntri, setValGraphEntri ] = useState();
    const [ loadingGraphData, setLoadingGraphData ] = useState(true);
    const [ showTabelPet, setShowTabelPet ] = useState();
    const { isOpen, setIsOpen } = useContext(AuthContext);
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const convert_bulan = (b) => {
        const the_b = (
            {
                1 : "Jan",
                2 : "Feb",
                3 : "Mar",
                4 : "Apr",
                5 : "Mei",
                6 : "Jun",
                7 : "Jul",
                8 : "Ags",
                9 : "Sep",
                10 : "Okt",
                11 : "Nov",
                12 : "Des",
            }
        )
        return the_b[b];
    }

    const onClose = () => {
        setShowTabelPet(null);
    }

    const onMoreClick = (tipe) => {
        setShowTabelPet(tipe)
    }

    useEffect(() => {

        const fetchGraphData = () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
            
            let start_link = backendUrl + "progres_bar/"
            fetch(start_link + id_kegiatan , requestOptions)
            .then(response => response.json())
            .then(data => {
                
                const result = {};
                data.forEach(item => {
                    const { jenis_data, tahun, bulan, minggu, frekuensi } = item;
                    const title = `${convert_bulan(bulan)} Minggu-${minggu}`;
                    
                    if (!result[jenis_data]) {
                        result[jenis_data] = { titles: [], frekuensi: [] };
                    }

                    result[jenis_data].titles.push(title);
                    result[jenis_data].frekuensi.push(frekuensi);
                });



                if (!result.tgl_pengdok || !result.tgl_pengdok.titles || result.tgl_pengdok.titles.length === 0) {
                    setGraphDefRB(true);
                } else {
                    setTitleGraphRb(result.tgl_pengdok.titles);
                    setValGraphRb(result.tgl_pengdok.frekuensi);
                }
                
                if (!result.tgl_edcod || !result.tgl_edcod.titles || result.tgl_edcod.titles.length === 0) {
                    setGraphDefEdcod(true);
                } else {
                    setTitleGraphEdcod(result.tgl_edcod.titles);
                    setValGraphEdcod(result.tgl_edcod.frekuensi);
                }

                if (!result.tgl_entri || !result.tgl_entri.titles || result.tgl_entri.titles.length === 0) {
                    setGraphDefEntri(true);
                } else {
                    setTitleGraphEntri(result.tgl_entri.titles);
                    setValGraphEntri(result.tgl_entri.frekuensi);
                }

                setLoadingGraphData(false);
            });
        }

        const fetchData = async () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
            
                await fetch(backendUrl + 'get_info/' + id_kegiatan , requestOptions)
                .then(response => response.json())
                .then(data => {
                    
                    setNamaKegiatan(data[0].nama)
                    setIsSurvei(data[0].jenis === "2");

                    // Deadline day
                    const date_now = new Date();

                    let target_rb = data[0].target_pengdok
                    target_rb = target_rb.slice(0,10)
                    const date_rb = new Date(target_rb)

                    let target_edcod = data[0].target_edcod
                    target_edcod = target_edcod.slice(0,10)
                    const date_edcod = new Date(target_edcod)

                    let target_entri = data[0].target_entri
                    target_entri = target_entri.slice(0,10)
                    const date_entri = new Date(target_entri)

                    var selisihMilidetikRb = date_rb.getTime() - date_now.getTime();
                    var selisihHariRb = (selisihMilidetikRb / (1000 * 60 * 60 * 24)).toFixed(0);
                    setDeadlineRb(selisihHariRb);
                    
                    var selisihMilidetikEdcod = date_edcod.getTime() - date_now.getTime();
                    var selisihHariEdcod = (selisihMilidetikEdcod / (1000 * 60 * 60 * 24)).toFixed(0);
                    setDeadlineEdcod(selisihHariEdcod);

                    var selisihMilidetikEntri = date_entri.getTime() - date_now.getTime();
                    var selisihHariEntri = (selisihMilidetikEntri / (1000 * 60 * 60 * 24)).toFixed(0);
                    setDeadlineEntri(selisihHariEntri);

                    setIsLoading(false);
                });
        }
        
        const fetchDataProgresKecmatan = () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
                let start_link = backendUrl + "get_progres_kecamatan_"

                isSurvei ? start_link += "survei/" : start_link += "sensus/"

                fetch(start_link + id_kegiatan , requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataProgresKecamatan(data);
                    setIsLoadingProgres(false);
                });
        }

        const fetchDataProgresPetugasPengdok = () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
                let start_link = backendUrl + "get_progres_pengdok_"

                isSurvei ? start_link += "survei/" : start_link += "sensus/"

                fetch(start_link + id_kegiatan , requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataPetugasRB(data);
                    setLoadingProgresPengdok(false);
                    
                });
        }

        const fetchDataProgresPetugasEdcod = () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
                let start_link = backendUrl + "get_progres_edcod_"

                isSurvei ? start_link += "survei/" : start_link += "sensus/"

                fetch(start_link + id_kegiatan , requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataPetugasEdcod(data);
                    setLoadingProgresEdcod(false);
                    
                });
        }

        const fetchDataProgresPetugasEntri = () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
                let start_link = backendUrl + "get_progres_entri_"

                isSurvei ? start_link += "survei/" : start_link += "sensus/"

                fetch(start_link + id_kegiatan , requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataPetugasEntri(data);
                    setLoadingProgresEntri(false);
                    
                });
        }
        

        const fetchDataOveralProgres = () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
                let start_link = backendUrl + "get_overall_progres/"
                // isSurvei ? start_link += "survei/" : start_link += "sensus/"
   
                fetch(start_link + id_kegiatan , requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataOverallProgres(data);
                    
                    // Date Setting

                    let rb_date = null;
                    let rb_month = null;
                    let rb_year = null;

                    let edcod_date = null;
                    let edcod_month = null; 
                    let edcod_year = null;

                    let entri_date = null;
                    let entri_month = null; 
                    let entri_year = null;

                    if(data[0]["start_pengdok"] !== null) {
                        const date_pengdok = new Date(data[0]["start_pengdok"])
                        rb_date = date_pengdok.getDate();
                        rb_month = convert_bulan(date_pengdok.getMonth() + 1);
                        rb_year = date_pengdok.getFullYear();
                        setStartRB(rb_month + " " + rb_date + ", " + rb_year);
                    }else{
                        setStartRB("-")
                    }

                    if(data[0]["start_edcod"] !== null) {
                        const date_edcod = new Date(data[0]["start_edcod"])
                        edcod_date = date_edcod.getDate();
                        edcod_month = convert_bulan(date_edcod.getMonth() + 1);
                        edcod_year = date_edcod.getFullYear();
                        setStartEdcod(edcod_month + " " + edcod_date + ", " + edcod_year);
                    }else{
                        setStartEdcod("-")
                    }

                    if(data[0]["start_entri"] !== null) {
                        const date_entri = new Date(data[0]["start_entri"])
                        entri_date = date_entri.getDate();
                        entri_month = convert_bulan(date_entri.getMonth() + 1);
                        entri_year = date_entri.getFullYear();
                        setStartEntri(entri_month + " " + entri_date + ", " + entri_year);
                    }else{
                        setStartEntri("-")
                    }
                    ////////////////////////////////////////
                    setLoadingOverallProgres(false);
                });
        }

        fetchData();
        fetchDataProgresKecmatan();
        fetchDataOveralProgres();
        fetchDataProgresPetugasPengdok();
        fetchDataProgresPetugasEdcod();
        fetchDataProgresPetugasEntri();
        fetchGraphData();
        
    }, [isSurvei])
    

    return (
        <>
            <TopNavAdmin/>
            <div className="Dashboard md:mt-20 mt-5 font-poppins" onClick={() => setIsOpen(false)}>
                {
                    isLoading ? (
                        <>
                            
                        </>
                    ) : (
                        <>
                            <div className="cont-atas md:max-w-7xl bg-white rounded-lg shadow-lg mx-3 mt-4 p-3 md:mt-24 sm:h-40 sm:relative overflow-hidden z-[-1] max-w-6xl md:mx-auto">
                                <div className="hidden sm:block sm:rounded-full sm:absolute w-60 h-60 bg-[#7FFF7C] sm:-top-36 sm:-left-36"></div>
                                <div className="hidden sm:block sm:rounded-full sm:absolute w-96 h-96 bg-[#6278EB] sm:-right-12 sm:-top-40"></div>
                                <div className="hidden sm:block sm:rounded-full sm:absolute w-80 h-80 bg-[#FFA1A1] sm:-right-52 sm:-top-40"></div>
                                    <div className="sm:bottom-4 sm:absolute">
                                        <h2 className="ml-2 font-semibold sm:bottom-0 md:text-xl text-sm">{namaKegiatan}</h2>
                                        <p className="ml-2 text-slate-600 md:text-xl text-sm">{id_kegiatan}</p>
                                    </div>
                                </div>
                            <div className="big-container md:max-w-7xl bg-white mx-auto sm:justify-center shadow-lg lg:rounded-xl sm:items-center ">
                                
                                <div className="Receiving-Batching">
                                    <div className="mt-4">
                                        <div className="p-3 text-md font-semibold text-center md:text-left">Receiving Batching</div>
                                    </div>
                                    <div className="content-RB">
                                        <div className="main-board  p-2 md:flex">
                                            <div className="sm:flex md:flex-grow md:max-w-1/2 ">
                                                <div className="NUMBER grid grid-cols-3 sm:block">
                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9] w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                        
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        <Loading/>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="text-xs">Progres <span className="hidden sm:inline-block">RB</span></div>
                                                                        <div className="text-xs font-semibold ">
                                                                            {((dataOverallProgres[0]["rb"]/dataOverallProgres[0]["total"])*100).toFixed(2)}%
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        
                                                    </div>

                                                    <div className="Deadline-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9]  w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                        
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        <Loading/>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="text-xs">Deadline</div>
                                                                        {
                                                                            ((dataOverallProgres[0]["rb"]/dataOverallProgres[0]["total"])*100) == 100 ? (
                                                                                <>
                                                                                    <div className="text-xs font-semibold text-[#418EC6]">
                                                                                        Selesai
                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {
                                                                                        deadlineRb > 0 ? (
                                                                                            <div className="text-xs font-semibold">
                                                                                                {deadlineRb} Hari
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="text-xs font-semibold text-red-500">
                                                                                                Lewat {deadlineRb*-1} Hari
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </>
                                                                            )
                                                                        }
                                                                        
                                                                    </>
                                                                )
                                                            }
                                                        
                                                    </div>

                                                    <div className="Start-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9] w-fit rounded-2xl py-2 pl-2  min-w-24 sm:min-w-32 max-h-14">
                                                        
                                                        {
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    <Loading/>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="text-xs"><span className="hidden sm:inline-block">Tanggal</span> Mulai</div>
                                                                    <div className="text-xs font-semibold">
                                                                        {startRB}
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                        
                                                    </div>
                                                </div>
                                                
                                                <div className="chart flex items-center justify-center mt-2 sm:mt-0 mr-2 w-full ">
                                                        {
                                                            loadingGraphData ? (
                                                                <>
                                                                    <Loading/>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    
                                                                    <Line
                                                                        data={{ 
                                                                            
                                                                            labels: graphDefRB ? defaultTitles : titleGraphRb,
                                                                            datasets:[{
                                                                                label: "Frekuensi RB",
                                                                                data : graphDefRB ? defaultVal : valGraphRb,
                                                                                backgroundColor: '#BAE6FD',
                                                                                borderColor: '#36A2EB',
                                                                                borderWidth: 1,
                                                                                borderRadius: 15,
                                                                            }
                                                                            ],
                                                                        }}
                                                                        options={{
                                                                            responsive: true, // Mengatur grafik agar responsif
                                                                            maintainAspectRatio: false,
                                                                            scales: {
                                                                                x : {
                                                                                    beginAtZero : true,
                                                                                    offset: true,
                                                                                    
                                                                                    ticks : {
                                                                                        padding : 0
                                                                                    }
                                                                                },
                                                                                y: {
                                                                                    ticks: {
                                                                                        callback: function(value, index, values) {
                                                                                            return Math.floor(value); // Menghilangkan desimal
                                                                                        }
                                                                                    },
                                                                                    beginAtZero : true
                                                                                }
                                                                            } 
                                                                        }}
                                                                    />
                                                                </>
                                                            )
                                                        }
                                                </div>
                                            </div>

                                            <div className="bungkus-progres block sm:grid sm:grid-cols-2 w-full md:w-fit  ">
                                                <div className="progres-petugas mt-4 sm:mt-0 flex-grow border-2 border-sky-200 rounded-xl overflow-hidden pb-2 ">
                                                    <div className="cover mx-auto">
                                                        <div className="title grid grid-cols-2 p-1 text-sm bg-sky-200 rounded-t-md">
                                                            <div className="text-center font-medium">Petugas</div>
                                                            <div className="text-center font-medium">Total Dokumen</div>
                                                        </div>
                                                        {
                                                            loadingProgresPengdok ? (
                                                                <>
                                                                    <div className="flex w-full items-center justify-center mt-4">
                                                                        <Loading/>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        dataPetugasRB.map((item,index) => {
                                                                            return (
                                                                                <div key={index} className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6">
                                                                                    <div className="text-left ml-1 truncate">{item.firstName + " " + item.lastName}</div>
                                                                                    <div className="text-center">{item.TOTAL} {!isSurvei ? ('SLS') : ('')}</div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                    
                                                                    
                                                                    <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => onMoreClick(1)}>Lihat Selengkapnya</div>

                                                                    {(showTabelPet === 1) ? (
                                                                        <>
                                                                            <TableDash data={dataPetugasRB} type={1} onClose={onClose}/>
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </>
                                                            )
                                                        }
                                                        
                                                    </div>
                                                </div>

                                                <div className="progres-kecamatan mt-4 sm:mt-0 flex-grow border-2 border-sky-200 rounded-xl pb-2 overflow-hidden sm:ml-3 ">
                                                    <div className="cover mx-auto">
                                                        <div className="title grid grid-cols-2 text-sm rounded-t-md p-1 bg-sky-200">
                                                            <div className="text-center font-medium">Kecamatan</div>
                                                            <div className="text-center font-medium">Progres</div>
                                                        </div>
                                                        
                                                        { isLoadingProgres ? (
                                                            <div className="flex w-full items-center justify-center mt-4">
                                                                <Loading/>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {
                                                                    Object.keys(dataProgresKecamatan).slice(0,6).map((item,index) => {
                                                                        const progres = dataProgresKecamatan[item]["progres_rb"];
                                                                        let isLow,isMed,isHigh
                                                                        if (progres <= 35){
                                                                            isLow = true
                                                                        } else if(progres <= 65){
                                                                            isMed = true
                                                                        } else{
                                                                            isHigh = true
                                                                        }
                                                                        return(
                                                                            <div key={index} className="title pl-1 grid grid-cols-2 text-xs mt-1 border-b border-sky-200 items-center min-h-6 ">
                                                                                <div className="text-left pl-2">{dataProgresKecamatan[item]["nama_kec"]}</div>
                                                                                <div className={`text-center font-medium ${isLow ? ('text-[#EC5F4C]') : ('')} ${isMed ? ('text-[#418EC6]') : ('')} ${isHigh ? ('text-[#14CB11]') : ('')}`}>{dataProgresKecamatan[item]["progres_rb"].toFixed(2)} %</div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }

                                                                {
                                                                    (showTabelPet === 4) ? (
                                                                        <>
                                                                            <TableDash data={dataProgresKecamatan} type={4} onClose={onClose}/>
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )
                                                                }
                                                                <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {onMoreClick(4)}}>Lihat Selengkapnya</div>
                                                            </>
                                                        )   
                                                        }      
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="Editing-Coding">
                                    <div className="mt-4">
                                        <div className="p-3 text-md font-semibold text-center md:text-left">Editing Coding</div>
                                    </div>
                                    <div className="content-RB">
                                        <div className="main-board  p-2 md:flex">
                                            <div className="sm:flex md:flex-grow md:max-w-1/2 ">
                                                <div className="NUMBER grid grid-cols-3 sm:block">
                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9] w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        <Loading/>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                    <div className="text-xs">Progres <span className="hidden sm:inline-block">Edcod</span></div>
                                                                    <div className="text-xs font-semibold">
                                                                        {((dataOverallProgres[0]["edcod"]/dataOverallProgres[0]["total"])*100).toFixed(2)}%
                                                                    </div>
                                                                    </>
                                                                )
                                                            }
                                                    </div>

                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9] w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        <Loading/>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="text-xs">Deadline</div>
                                                                        {
                                                                            ((dataOverallProgres[0]["edcod"]/dataOverallProgres[0]["total"])*100) == 100 ? (
                                                                                <>
                                                                                    <div className="text-xs font-semibold text-[#418EC6]">
                                                                                        Selesai
                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {
                                                                                        deadlineEdcod > 0 ? (
                                                                                            <div className="text-xs font-semibold">
                                                                                                {deadlineEdcod} Hari
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="text-xs font-semibold text-red-500">
                                                                                                Lewat {deadlineEdcod*-1} Hari
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </>
                                                                            )
                                                                        }
                                                                        
                                                                        
                                                                    </>
                                                                )
                                                            }
                                                    </div>

                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9] w-fit rounded-2xl py-2 pl-2  min-w-24 sm:min-w-32 max-h-14">
                                                        {
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    <Loading/>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="text-xs"><span className="hidden sm:inline-block">Tanggal</span> Mulai</div>
                                                                    <div className="text-xs font-semibold">
                                                                        {startEdcod}
                                                                    </div>
                                                                </>
                                                            )
                                                        }     
                                                    </div>
                                                </div>
                                                
                                                <div className="chart flex items-center justify-center mt-2 sm:mt-0 mr-2 w-full ">
                                                        {
                                                            loadingGraphData ? (
                                                                <>
                                                                    <Loading/>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Line
                                                                        data={{ 
                                                                            labels: graphDefEdcod ? defaultTitles : titleGraphEdcod,
                                                                            datasets:[{
                                                                                label: "Frekuensi Edcod",
                                                                                data : graphDefEdcod ? defaultVal : valGraphEdcod,
                                                                                backgroundColor: '#BAE6FD',
                                                                                borderColor: '#36A2EB',
                                                                                borderWidth: 1,
                                                                                borderRadius: 15,
                                                                            }
                                                                            ],
                                                                        }}
                                                                        options={{
                                                                            responsive: true, 
                                                                            maintainAspectRatio: false,
                                                                            scales: {
                                                                                x : {
                                                                                    offset: true
                                                                                },
                                                                                y: {
                                                                                    ticks: {
                                                                                        callback: function(value, index, values) {
                                                                                            return Math.floor(value); // Menghilangkan desimal
                                                                                        }
                                                                                    },
                                                                                    beginAtZero : true
                                                                                }
                                                                            } 
                                                                        }}
                                                                    />
                                                                </>
                                                            )
                                                        }
                                                </div>
                                            </div>

                                            <div className="bungkus-progres block sm:grid sm:grid-cols-2 w-full md:w-fit  ">
                                                <div className="progres-petugas mt-4 sm:mt-0 flex-grow border-2 border-sky-200 rounded-xl overflow-hidden pb-2 ">
                                                    <div className="cover mx-auto">
                                                        <div className="title grid grid-cols-2 p-1 text-sm bg-sky-200 rounded-t-md">
                                                            <div className="text-center font-medium">Petugas</div>
                                                            <div className="text-center font-medium">Total Dokumen</div>
                                                        </div>
                                                        {
                                                            loadingProgresEdcod ? (
                                                                <div className="flex w-full items-center justify-center mt-4">
                                                                    <Loading/>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        dataPetugasEdcod.map((item,index) => {
                                                                            return (
                                                                                <div key={index} className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6">
                                                                                    <div className="text-left ml-1 truncate">{item.nama}</div>
                                                                                    <div className="text-center">{item.TOTAL} {!isSurvei ? ('SLS') : ('')}</div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                    {(showTabelPet === 2) ? (
                                                                        <>
                                                                            <TableDash data={dataPetugasEdcod} type={2} onClose={onClose}/>
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                    
                                                                    
                                                                    <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {onMoreClick(2)}}>Lihat Selengkapnya</div>
                                                                </>
                                                            )
                                                        }
                                                        
                                                    </div>
                                                </div>

                                                <div className="progres-kecamatan mt-4 sm:mt-0 flex-grow border-2 border-sky-200 rounded-xl pb-2 overflow-hidden sm:ml-3 ">
                                                    <div className="cover mx-auto">
                                                        <div className="title grid grid-cols-2 text-sm rounded-t-md p-1 bg-sky-200">
                                                            <div className="text-center font-medium">Kecamatan</div>
                                                            <div className="text-center font-medium">Progres</div>
                                                        </div>
                                                        
                                                        { isLoadingProgres ? (
                                                            <div className="flex w-full items-center justify-center mt-4">
                                                                <Loading/>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {
                                                                    Object.keys(dataProgresKecamatan).slice(0,6).map((item,index) => {
                                                                        const progres = dataProgresKecamatan[item]["progres_edcod"];
                                                                        let isLow,isMed,isHigh
                                                                        if (progres <= 35){
                                                                            isLow = true
                                                                        } else if(progres <= 65){
                                                                            isMed = true
                                                                        } else{
                                                                            isHigh = true
                                                                        }
                                                                        return(
                                                                            <div key={index} className="title pl-1 grid grid-cols-2 text-xs mt-1 border-b border-sky-200 items-center min-h-6 ">
                                                                                <div className="text-left pl-2">{dataProgresKecamatan[item]["nama_kec"]}</div>
                                                                                <div className={`text-center font-medium ${isLow ? ('text-[#EC5F4C]') : ('')} ${isMed ? ('text-[#418EC6]') : ('')} ${isHigh ? ('text-[#14CB11]') : ('')}`}>{dataProgresKecamatan[item]["progres_edcod"].toFixed(2)} %</div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                {
                                                                    (showTabelPet === 5) ? (
                                                                        <>
                                                                            <TableDash data={dataProgresKecamatan} type={5} onClose={onClose}/>
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )
                                                                }
                                                                <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {onMoreClick(5)}}>Lihat Selengkapnya</div>
                                                            </>
                                                        )
                                                            
                                                        }
                                                        
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="Entri">
                                    <div className="mt-4">
                                        <div className="p-3 text-md font-semibold text-center md:text-left">Entry data</div>
                                    </div>
                                    <div className="content-RB">
                                        <div className="main-board  p-2 md:flex">
                                            <div className="sm:flex md:flex-grow md:max-w-1/2 ">
                                                <div className="NUMBER grid grid-cols-3 sm:block">
                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9] w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs">Progres <span className="hidden sm:inline-block">Entri</span></div>
                                                        <div className="text-xs font-semibold">
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        <Loading/>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {((dataOverallProgres[0]["entri"]/dataOverallProgres[0]["total"])*100).toFixed(2)}%
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9] w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs">Deadline</div>
                                                        <div className="text-xs font-semibold">
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        <Loading/>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {
                                                                            ((dataOverallProgres[0]["entri"]/dataOverallProgres[0]["total"])*100) == 100 ? (
                                                                                <>
                                                                                    <div className="text-xs font-semibold text-[#418EC6]">
                                                                                        Selesai
                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {
                                                                                        deadlineEntri > 0 ? (
                                                                                            <div className="text-xs font-semibold">
                                                                                                {deadlineEntri} Hari
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="text-xs font-semibold text-red-500">
                                                                                                Lewat {deadlineEntri*-1} Hari
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </>
                                                                            )
                                                                        }
                                                                        
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9] w-fit rounded-2xl py-2 pl-2  min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs"><span className="hidden sm:inline-block">Tanggal</span> Mulai</div>
                                                        <div className="text-xs font-semibold">
                                                        {
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    <Loading />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {startEntri}
                                                                </>
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="chart flex items-center justify-center mt-2 sm:mt-0 mr-2 w-full ">
                                                        {
                                                            loadingGraphData ? (
                                                                <>
                                                                    <Loading/>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Line
                                                                        data={{ 
                                                                            labels: graphDefEntri ? defaultTitles : titleGraphEntri,
                                                                            datasets:[{
                                                                                label: "Frekuensi Entri",
                                                                                data : graphDefEntri ? defaultVal : valGraphEntri,
                                                                                backgroundColor: '#BAE6FD',
                                                                                borderColor: '#36A2EB',
                                                                                borderWidth: 1,
                                                                                borderRadius: 15,
                                                                            }
                                                                            ],
                                                                        }}
                                                                        options={{
                                                                            responsive: true, // Mengatur grafik agar responsif
                                                                            maintainAspectRatio: false, 
                                                                            scales: {
                                                                                x : {
                                                                                    offset: true
                                                                                },
                                                                                y: {
                                                                                    ticks: {
                                                                                        callback: function(value, index, values) {
                                                                                            return Math.floor(value); // Menghilangkan desimal
                                                                                        }
                                                                                    },
                                                                                    beginAtZero : true
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                </>
                                                            )
                                                        }
                                                </div>
                                            </div>

                                            <div className="bungkus-progres block sm:grid sm:grid-cols-2 w-full md:w-fit  ">
                                                <div className="progres-petugas mt-4 sm:mt-0 flex-grow border-2 border-sky-200 rounded-xl overflow-hidden pb-2 ">
                                                    <div className="cover mx-auto">
                                                        <div className="title grid grid-cols-2 p-1 text-sm bg-sky-200 rounded-t-md">
                                                            <div className="text-center font-medium">Petugas</div>
                                                            <div className="text-center font-medium">Total Dokumen</div>
                                                        </div>
                                                        {
                                                            loadingProgresEntri ? (
                                                                <div className="flex w-full items-center justify-center mt-4">
                                                                    <Loading/>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        dataPetugasEntri.map((item,index) => {
                                                                            return (
                                                                                <div key={index} className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6">
                                                                                    <div className="text-left ml-1 truncate">{item.nama}</div>
                                                                                    <div className="text-center">{item.TOTAL} {!isSurvei ? ('SLS') : ('')}</div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                    
                                                                    {(showTabelPet === 3) ? (
                                                                        <>
                                                                            <TableDash data={dataPetugasEntri} type={3} onClose={onClose}/>
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                    
                                                                    <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {onMoreClick(3)}}>Lihat Selengkapnya</div>
                                                                </>
                                                            )
                                                        }
                                                        
                                                    </div>
                                                </div>

                                                <div className="progres-kecamatan mt-4 sm:mt-0 flex-grow border-2 border-sky-200 rounded-xl pb-2 overflow-hidden sm:ml-3 ">
                                                    <div className="cover mx-auto">
                                                        <div className="title grid grid-cols-2 text-sm rounded-t-md p-1 bg-sky-200">
                                                            <div className="text-center font-medium">Kecamatan</div>
                                                            <div className="text-center font-medium">Progres</div>
                                                        </div>
                                                        
                                                        { isLoadingProgres ? (
                                                            <div className="flex w-full items-center justify-center mt-4">
                                                                <Loading/>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {
                                                                    Object.keys(dataProgresKecamatan).slice(0,6).map((item,index) => {
                                                                        const progres = dataProgresKecamatan[item]["progres_entri"];
                                                                        let isLow,isMed,isHigh
                                                                        if (progres <= 35){
                                                                            isLow = true
                                                                        } else if(progres <= 65){
                                                                            isMed = true
                                                                        } else{
                                                                            isHigh = true
                                                                        }
                                                                        return(
                                                                            <div key={index} className="title  grid grid-cols-2 pl-1 text-xs mt-1 border-b border-sky-200 items-center min-h-6 ">
                                                                                <div className="text-left pl-2 borde">{dataProgresKecamatan[item]["nama_kec"]}</div>
                                                                                <div className={`text-center font-medium ${isLow ? ('text-[#EC5F4C]') : ('')} ${isMed ? ('text-[#418EC6]') : ('')} ${isHigh ? ('text-[#14CB11]') : ('')}`}>{dataProgresKecamatan[item]["progres_entri"].toFixed(2)} %</div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                {
                                                                    (showTabelPet === 6) ? (
                                                                        <>
                                                                            <TableDash data={dataProgresKecamatan} type={6} onClose={onClose}/>
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )
                                                                }
                                                                <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {onMoreClick(6)}}>Lihat Selengkapnya</div>
                                                            </>
                                                        )
                                                            
                                                        }
                                                        
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            
                                <div className="diver pb-10">
                                </div>
                            </div>

                            <div className="kotak-bawah mb-20"></div>
                        </>
                    )
                }
            </div>
        </>
        
    )
}


export default DashboardWithId;