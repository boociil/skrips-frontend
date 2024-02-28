import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Bar,Line,Doughnut } from "react-chartjs-2";
import 'chart.js/auto';



function DashboardWithId() {
    const { id_kegiatan } = useParams();    
    const [ dataKegiatan, setData ] = useState();
    const [ isSurvei, setIsSurvei ] = useState();
    const [ isLoading, setIsLoading ] = useState();

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
                    setData(data);
                    // console.log(data);
                    setIsSurvei(data[0].jenis === "2");
                    setIsLoading(false);
                });
        }
        fetchData();
        
    }, [])

    return (
        <div className="Dashboard md:mt-20 mt-5 font-poppins">
            {
                isLoading ? (
                    <>
                    </>
                ) : (
                    <>
                        <div className="mb-4 ml-4">
                            Hai {id_kegiatan} {
                                isSurvei ? (
                                    <>
                                        Survei
                                    </>
                                ) : (
                                    <>
                                        Sensus
                                    </>
                                )
                            }
                        </div>
                        <div className="big-container md:max-w-7xl bg-white mx-auto sm:justify-center shadow-lg lg:rounded-xl sm:items-center ">
                            <div className="Receiving-Batching">
                                <div>
                                    <div className="p-3 font-semibold text-lg">Receiving Batching</div>
                                </div>
                                <div className="container-for-graph-and-stats sm:flex">
                                    <div className="container-left sm:w-1/2 bg-white mx-4 sm:mx-2 rounded-lg p-2">
                                        Overall Stats
                                        
                                        <div className="progres border-2 p-2 rounded-md">
                                            <div className="text-sm">Progres</div>
                                            <div className="font-semibold text-emerald-400">78%</div>
                                        </div>
                                        <div className="progres border-2 p-2 rounded-md">
                                            <div className="text-sm">Sisa Waktu</div>
                                            <div className="font-semibold">58 Hari</div>
                                        </div>
                                    </div>
                                    <div className="container-right sm:w-1/2 mt-3 sm:mt-0 bg-white mx-4 sm:mx-2 rounded-lg p-2">
                                        Pengumpulan Dokumen
                                        <div className="the-bar sm:bg-sky-50 rounded-xl p-2">
                                        <Bar
                                        data={{ 
                                            labels: ["Jan","Feb","Mar","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],
                                            datasets:[
                                                {
                                                    label: "Revenue",
                                                    data : [200,300,400,250,110,175,360,72,90,130,270],
                                                    backgroundColor: [
                                                        'rgba(54, 162, 235, 0.2)',
                                                    ],
                                                    borderColor: [
                                                        'rgb(54, 162, 235)',
                                                    ],
                                                    borderWidth: 1
                                                },
                                            ],
                                        }}

                                        options={{ 
                                            borderRadius: 15,
                                            responsive: true,
                                            maintainAspectRatio: true,
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}

                                        />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="container-for-petugas-adn-kecamatan sm:flex mt-3 pb-10">
                                    <div className="bg-white rounded-lg mx-4 sm:mx-2 sm:w-1/2">
                                        <div className="judul tabel p-2">
                                            <div>
                                                Progres Petugas
                                            </div>
                                        </div>
                                        <div className="container-progres-petugas grid grid-cols-2  p-3 ">
                                            <div className="left border-l border-b rounded-tl-3xl">
                                                <div className="title p-1 border-b-2 mb-1 bg-slate-200 rounded-tl-3xl">
                                                    <div className="text-center text-xs">Petugas</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-center text-sm">Andi Malik</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-center text-sm">Ferdi Shuan</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-center text-sm">Joy Winaldi</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-center text-sm">Balmond Maulana</div>
                                                </div>
                                            </div>
                                            <div className="right border-r border-b rounded-tr-3xl">
                                                <div className="title  p-1 border-b-2 mb-1 bg-slate-200 rounded-tr-3xl">
                                                    <div className="text-center text-xs">Diserahkan</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-center text-sm">10</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-center text-sm">20</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-center text-sm">34</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-center text-sm">56</div>
                                                </div>
                                            </div>
                                        </div>  
                                    </div>
                                    
                                    <div className="kecamatan bg-white rounded-lg mx-4 sm:mx-2 p-3 mt-5 sm:mt-0 sm:w-1/2">
                                        <div className="judul tabel p-2">
                                            <div>
                                                Progres Per Kecamatan
                                            </div>
                                        </div>
                                        <div className="container-isi grid grid-cols-2">
                                            <div className="bagian-kiri border-l border-b rounded-tl-3xl">
                                                <div className="kecamatan-box bg-slate-200 rounded-tl-3xl">
                                                    <div className="text-center text-xs p-1">Kecamatan</div>
                                                </div>
                                                <div className="kecamatan-box">
                                                    <div className="pl-3 border-b text-sm">Batang Anai</div>
                                                </div>
                                                <div className="kecamatan-box">
                                                    <div className="pl-3 border-b text-sm">Lubuk Alung</div>
                                                </div>
                                                <div className="kecamatan-box border-b text-sm">
                                                    <div className="pl-3">IV Koto</div>
                                                </div>
                                                <div className="kecamatan-box border-b text-sm">
                                                    <div className="pl-3">Sungai Garingging</div>
                                                </div>
                                                <div className="kecamatan-box border-b text-sm">
                                                    <div className="pl-3">Batang Gasan</div>
                                                </div>
                                                <div className="kecamatan-box border-b text-sm">
                                                    <div className="pl-3">Padang Sago</div>
                                                </div>
                                            </div>  
                                            <div className="bagian-kanan rounded-tr-3xl border-r border-b">
                                                <div className="kecamatan-box">
                                                    <div className="text-center p-1 text-xs bg-slate-200 rounded-tr-3xl">Persentase</div>
                                                </div>
                                                <div className="kecamatan-box border-b text-sm">
                                                    <div className="text-center">78%</div>
                                                </div>
                                                <div className="kecamatan-box border-b text-sm">
                                                    <div className="text-center">65%</div>
                                                </div>
                                                <div className="kecamatan-box border-b text-sm">
                                                    <div className="text-center">32%</div>
                                                </div>
                                                <div className="kecamatan-box border-b text-sm">
                                                    <div className="text-center">30%</div>
                                                </div>
                                                <div className="kecamatan-box border-b text-sm">
                                                    <div className="text-center">24%</div>
                                                </div>
                                                <div className="kecamatan-box border-b text-sm">
                                                    <div className="text-center">15%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="container-progres-petugas bg-white rounded-lg shadow-lg mx-4 p-3 mt-3">
                                <div className="title border-b-2  grid grid-cols-2 mb-1 font-semibold">
                                    <div className="text-center">Nama Petugas</div>
                                    <div className="text-center">Total</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="text-center">Andrea Hirata</div>
                                    <div className="text-center">10</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="text-center">M. Hamda Lillah</div>
                                    <div className="text-center">7</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="text-center">Yusuf Maulana</div>
                                    <div className="text-center">15</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="text-center">Abdullah bin Abdul Muthalib</div>
                                    <div className="text-center">-</div>
                                </div>
                            </div>  

                        
                            
                        

                        <div className="container-progres-petugas bg-white rounded-lg shadow-lg mx-4 p-3 mt-3">
                            <div className="grid grid-cols-2 border-2 border-slate-400 rounded-xl mt-1">
                                <div className="text-center">Batang Anai</div>
                                <div className="text-center">10%</div>
                            </div>
                            <div className="grid grid-cols-2 border-2 border-slate-400 rounded-xl mt-1">
                                <div className="text-center">Batang Anai</div>
                                <div className="text-center">10%</div>
                            </div>
                            <div className="grid grid-cols-2 border-2 border-slate-400 rounded-xl mt-1">
                                <div className="text-center">Batang Anai</div>
                                <div className="text-center">10%</div>
                            </div>
                            <div className="grid grid-cols-2 border-2 border-slate-400 rounded-xl mt-1">
                                <div className="text-center">Batang Anai</div>
                                <div className="text-center">10%</div>
                            </div>
                        </div>  
                    

                        <div className="kotak-bawah mb-20"></div>

                        
                        
                    </>
                )
            }
                {/*  */}
        </div>
    )
}


export default DashboardWithId;