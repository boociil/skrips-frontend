import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Bar,Line,Doughnut } from "react-chartjs-2";
import 'chart.js/auto';
import TopNavAdmin from "../components/topNavAdmin";


function DashboardWithId() {
    const { id_kegiatan } = useParams();    
    const [ dataKegiatan, setDataKegiatan ] = useState();
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

    const timeNow = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // Bulan dimulai dari 0 (Januari) hingga 11 (Desember)
        const date = now.getDate();

        const time = `${year}-${month+1}-${date}`;

        return time;
    }

    useEffect(() => {

        const fetchData = () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
            
                fetch('http://localhost:3001/get_info/' + id_kegiatan , requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDataKegiatan(data);
                    // console.log('deadline ',data);
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
                    ///

                    setIsLoading(false);
                });
        }
        
        const fetchDataProgres = () => {
            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
                let start_link = "http://localhost:3001/get_progres_kecamatan_"
                // console.log("issurvei", dataKegiatan);
                isSurvei ? start_link += "survei/" : start_link += "sensus/"
                console.log(start_link + id_kegiatan);
                fetch(start_link + id_kegiatan , requestOptions)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setDataProgresKecamatan(data);
                    setIsLoadingProgres(false);
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
                let start_link = "http://localhost:3001/get_progres_"
                isSurvei ? start_link += "survei/" : start_link += "sensus/"
                // console.log(start_link);
                fetch(start_link + id_kegiatan , requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setDataOverallProgres(data);
                    
                    // Date Setting
                    const date_pengdok = new Date(data[0]["start_pengdok"])
                    const date_edcod = new Date(data[0]["start_edcod"])
                    const date_entri = new Date(data[0]["start_entri"])

                    const rb_date = date_pengdok.getDate();
                    const rb_month = convert_bulan(date_pengdok.getMonth() + 1);
                    const rb_year = date_pengdok.getFullYear();

                    const edcod_date = date_edcod.getDate();
                    const edcod_month = convert_bulan(date_edcod.getMonth() + 1);
                    const edcod_year = date_edcod.getFullYear();

                    const entri_date = date_entri.getDate();
                    const entri_month = convert_bulan(date_entri.getMonth() + 1);
                    const entri_year = date_entri.getFullYear();
                    
                    setStartRB(rb_month + " " + rb_date + ", " + rb_year);
                    setStartEdcod(edcod_month + " " + edcod_date + ", " + edcod_year);
                    setStartEntri(entri_month + " " + entri_date + ", " + entri_year);
                    ////////////////////////////////////////

                    setLoadingOverallProgres(false);
                });
        }



        fetchData();
        fetchDataProgres();
        fetchDataOveralProgres();
        
    }, [isSurvei])

    

    return (
        <>
            <TopNavAdmin/>
            <div className="Dashboard md:mt-20 mt-5 font-poppins">
                {
                    isLoading ? (
                        <>
                        </>
                    ) : (
                        <>
                            <div className="cont-atas md:max-w-7xl bg-white rounded-lg shadow-lg mx-3 mt-4 p-3 md:mt-24 sm:h-40 sm:relative overflow-hidden z-[-1] max-w-6xl md:mx-auto">
                                    <div className="hidden sm:block sm:rounded-full sm:absolute w-60 h-60 bg-[#BAE6FD] sm:-top-36 sm:-left-36"></div>
                                    <div className="hidden sm:block sm:rounded-full sm:absolute w-96 h-96 bg-[#85D5FF] sm:-right-12 sm:-top-40"></div>
                                    <div className="hidden sm:block sm:rounded-full sm:absolute w-80 h-80 bg-[#23AFF9] sm:-right-52 sm:-top-40"></div>
                                    <div className="sm:bottom-4 sm:absolute">
                                        <h2 className="ml-2 font-semibold sm:bottom-0 md:text-xl text-sm">{namaKegiatan}</h2>
                                        <p className="ml-2 text-slate-600 md:text-xl text-sm">{id_kegiatan}</p>
                                    </div>
                                </div>
                            <div className="big-container md:max-w-7xl bg-white mx-auto sm:justify-center shadow-lg lg:rounded-xl sm:items-center ">
                                
                                <div className="Receiving-Batching">
                                    <div className="mt-4">
                                        <div className="p-3 text-md font-semibold">Receiving Batching</div>
                                    </div>
                                    <div className="content-RB">
                                        <div className="main-board  p-2 md:flex">
                                            <div className="sm:flex md:flex-grow md:max-w-1/2 ">
                                                <div className="NUMBER grid grid-cols-3 sm:block">
                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9] w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs">Progres <span className="hidden sm:inline-block">RB</span></div>
                                                        <div className="text-xs font-semibold">
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        Loading...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {((dataOverallProgres[0]["rb"]/dataOverallProgres[0]["total"])*100).toFixed(2)}%
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-sky-200 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs">Deadline</div>
                                                        <div className="text-xs font-semibold">
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        Loading...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {deadlineRb} Hari
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-sky-200 w-fit rounded-2xl py-2 pl-2  min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs"><span className="hidden sm:inline-block">Tanggal</span> Mulai</div>
                                                        <div className="text-xs font-semibold">
                                                        {
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    Loading...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {startRB}
                                                                </>
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="chart flex items-center justify-center mt-2 sm:mt-0 mr-2 w-full ">
                                                        {
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    Loading...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Line
                                                                        data={{ 
                                                                            labels: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],
                                                                            datasets:[{
                                                                                label: "Frekuensi RB",
                                                                                data : [10,25,25,30,45,47,60,67,80,83,89,100],
                                                                                backgroundColor: '#BAE6FD',
                                                                                borderColor: '#36A2EB',
                                                                                borderWidth: 1,
                                                                                borderRadius: 15,
                                                                            }
                                                                            ],
                                                                        }}
                                                                        options={{
                                                                            responsive: true, // Mengatur grafik agar responsif
                                                                            maintainAspectRatio: false // Untuk mengabaikan rasio aspek default
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
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    Loading...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6">
                                                                        <div className="text-center">Muhammad Abdillah</div>
                                                                        <div className="text-center">24</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Amirul Budiman</div>
                                                                        <div className="text-center">36</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Cipto Mangunkusumo</div>
                                                                        <div className="text-center">13</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Farhan Halim</div>
                                                                        <div className="text-center">7</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Gustika Wahyu</div>
                                                                        <div className="text-center">3</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Wahyudi Husbi</div>
                                                                        <div className="text-center">1</div>
                                                                    </div>
                                                                    <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {}}>Lihat Selengkapnya</div>
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
                                                            <div className="p-3">
                                                                Loading...
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
                                                                                <div className="text-center">{dataProgresKecamatan[item]["nama_kec"]}</div>
                                                                                <div className={`text-center font-medium ${isLow ? ('text-[#EC5F4C]') : ('')} ${isMed ? ('text-[#418EC6]') : ('')} ${isHigh ? ('text-[#14CB11]') : ('')}`}>{dataProgresKecamatan[item]["progres_rb"].toFixed(2)} %</div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {}}>Lihat Selengkapnya</div>
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
                                        <div className="p-3 text-md font-semibold">Editing Coding</div>
                                    </div>
                                    <div className="content-RB">
                                        <div className="main-board  p-2 md:flex">
                                            <div className="sm:flex md:flex-grow md:max-w-1/2 ">
                                                <div className="NUMBER grid grid-cols-3 sm:block">
                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-[#23AFF9] w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs">Progres <span className="hidden sm:inline-block">Edcod</span></div>
                                                        <div className="text-xs font-semibold">
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        Loading...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {((dataOverallProgres[0]["edcod"]/dataOverallProgres[0]["total"])*100).toFixed(2)}%
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-sky-200 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs">Deadline</div>
                                                        <div className="text-xs font-semibold">
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        Loading...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {deadlineEdcod} Hari
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-sky-200 w-fit rounded-2xl py-2 pl-2  min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs"><span className="hidden sm:inline-block">Tanggal</span> Mulai</div>
                                                        <div className="text-xs font-semibold">
                                                        {
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    Loading...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {startEdcod}
                                                                </>
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="chart flex items-center justify-center mt-2 sm:mt-0 mr-2 w-full ">
                                                        {
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    Loading...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Line
                                                                        data={{ 
                                                                            labels: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],
                                                                            datasets:[{
                                                                                label: "Frekuensi RB",
                                                                                data : [10,25,25,30,45,47,60,67,80,83,89,100],
                                                                                backgroundColor: '#BAE6FD',
                                                                                borderColor: '#36A2EB',
                                                                                borderWidth: 1,
                                                                                borderRadius: 15,
                                                                            }
                                                                            ],
                                                                        }}
                                                                        options={{
                                                                            responsive: true, // Mengatur grafik agar responsif
                                                                            maintainAspectRatio: false // Untuk mengabaikan rasio aspek default
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
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    Loading...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6">
                                                                        <div className="text-center">Muhammad Abdillah</div>
                                                                        <div className="text-center">24</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Amirul Budiman</div>
                                                                        <div className="text-center">36</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Cipto Mangunkusumo</div>
                                                                        <div className="text-center">13</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Farhan Halim</div>
                                                                        <div className="text-center">7</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Gustika Wahyu</div>
                                                                        <div className="text-center">3</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Wahyudi Husbi</div>
                                                                        <div className="text-center">1</div>
                                                                    </div>
                                                                    <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {}}>Lihat Selengkapnya</div>
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
                                                            <div className="p-3">
                                                                Loading...
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
                                                                                <div className="text-center">{dataProgresKecamatan[item]["nama_kec"]}</div>
                                                                                <div className={`text-center font-medium ${isLow ? ('text-[#EC5F4C]') : ('')} ${isMed ? ('text-[#418EC6]') : ('')} ${isHigh ? ('text-[#14CB11]') : ('')}`}>{dataProgresKecamatan[item]["progres_edcod"].toFixed(2)} %</div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {}}>Lihat Selengkapnya</div>
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
                                        <div className="p-3 text-md font-semibold">Entry data</div>
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
                                                                        Loading...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {((dataOverallProgres[0]["entri"]/dataOverallProgres[0]["total"])*100).toFixed(2)}%
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-sky-200 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs">Deadline</div>
                                                        <div className="text-xs font-semibold">
                                                            {
                                                                loadingOverallProgres ? (
                                                                    <>
                                                                        Loading...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {deadlineEntri} Hari
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="persentase-RB mt-5 border-2 mx-2 mb-2 border-sky-200 w-fit rounded-2xl py-2 pl-2  min-w-24 sm:min-w-32 max-h-14">
                                                        <div className="text-xs"><span className="hidden sm:inline-block">Tanggal</span> Mulai</div>
                                                        <div className="text-xs font-semibold">
                                                        {
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    Loading...
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
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    Loading...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Line
                                                                        data={{ 
                                                                            labels: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],
                                                                            datasets:[{
                                                                                label: "Frekuensi RB",
                                                                                data : [10,25,25,30,45,47,60,67,78,,,],
                                                                                backgroundColor: '#BAE6FD',
                                                                                borderColor: '#36A2EB',
                                                                                borderWidth: 1,
                                                                                borderRadius: 15,
                                                                            }
                                                                            ],
                                                                        }}
                                                                        options={{
                                                                            responsive: true, // Mengatur grafik agar responsif
                                                                            maintainAspectRatio: false, // Untuk mengabaikan rasio aspek default,
                                                                            scales: {
                                                                                x: {
                                                                                    ticks: {
                                                                                        // Atur nilai maksimal sumbu y di sini
                                                                                        min: 100,
                                                                                    }
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
                                                            loadingOverallProgres ? (
                                                                <>
                                                                    Loading...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6">
                                                                        <div className="text-center">Muhammad Abdillah</div>
                                                                        <div className="text-center">24</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Amirul Budiman</div>
                                                                        <div className="text-center">36</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Cipto Mangunkusumo</div>
                                                                        <div className="text-center">13</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Farhan Halim</div>
                                                                        <div className="text-center">7</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Gustika Wahyu</div>
                                                                        <div className="text-center">3</div>
                                                                    </div>
                                                                    <div className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6 ">
                                                                        <div className="text-center">Wahyudi Husbi</div>
                                                                        <div className="text-center">1</div>
                                                                    </div>
                                                                    <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {}}>Lihat Selengkapnya</div>
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
                                                            <div className="p-3">
                                                                Loading...
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
                                                                                <div className="text-center pl-1 borde">{dataProgresKecamatan[item]["nama_kec"]}</div>
                                                                                <div className={`text-center font-medium ${isLow ? ('text-[#EC5F4C]') : ('')} ${isMed ? ('text-[#418EC6]') : ('')} ${isHigh ? ('text-[#14CB11]') : ('')}`}>{dataProgresKecamatan[item]["progres_entri"].toFixed(2)} %</div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div className="text-xs text-center mt-2 text-slate-400 underline cursor-pointer" onClick={() => {}}>Lihat Selengkapnya</div>
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
                    {/*  */}
            </div>
        </>
        
    )
}


export default DashboardWithId;