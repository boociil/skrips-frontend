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
                                <div className="mt-4">
                                    <div className="p-3 font-semibold text-md">Receiving Batching</div>
                                </div>
                                <div className="content-RB">
                                    <div className="Deadline grid grid-cols-2 gap-8  rounded-full p-2 w-fit">
                                        <div className="text-xs font-semibold p-1">Sisa Waktu</div>
                                        <div className="bg-[#DF4E4E] text-white rounded-full p-1 text-xs">37 Hari 6 Jam</div>
                                    </div>
                                    <div className="main-board  p-2 md:flex">
                                        <div className="sm:flex md:flex-grow">
                                            <div className="number grid grid-cols-3 sm:block">
                                                <div className="persentase-RB border mx-2 mb-2 border-emerald-400 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                    <div className="text-xs">Persentase RB</div>
                                                    <div className="text-sm font-semibold">78%</div>
                                                </div>

                                                <div className="persentase-RB border mx-2 mb-2 border-emerald-400 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                    <div className="text-xs">Dokumen</div>
                                                    <div className="text-sm font-semibold">301/360</div>
                                                </div>

                                                <div className="persentase-RB border mx-2 border-emerald-400 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                    <div className="text-xs">Tanggal Mulai</div>
                                                    <div className="text-sm font-semibold">Oct 1, 2020</div>
                                                </div>
                                            </div>
                                            <div className="chart flex items-center justify-center mt-2 w-full">
                                                <Line
                                                    data={{ 
                                                        labels: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],
                                                        datasets:[{
                                                            label: "Revenue",
                                                            data : [200,300,400,110,270,325,450,116,235,300,270,115],
                                                        }
                                                        ],
                                                    }}
                                                    options={{
                                                        responsive: true, // Mengatur grafik agar responsif
                                                        maintainAspectRatio: false // Untuk mengabaikan rasio aspek default
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="bungkus progres block sm:flex w-full md:w-fit ">
                                            <div className="progres-petugas mt-4 flex-grow border-2 rounded-lg p-2">
                                                <div className="cover">
                                                    <div className="title grid grid-cols-2 border-b-2 text-sm">
                                                        <div className="text-center font-semibold">Petugas</div>
                                                        <div className="text-center font-semibold">Total Dokumen</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Muhammad Abdillah</div>
                                                        <div className="text-center">24</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Amirul Budiman</div>
                                                        <div className="text-center">36</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Cipto Mangunkusumo</div>
                                                        <div className="text-center">13</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Farhan Halim</div>
                                                        <div className="text-center">-</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="progres-kecamatan mt-4 flex-grow border-2 rounded-lg p-2 sm:ml-3">
                                                <div className="cover">
                                                    <div className="title grid grid-cols-2 text-xs mt-1 border-b-2">
                                                        <div className="text-center font-semibold">Kecamatan</div>
                                                        <div className="text-center font-semibold">Progres</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Batang Anai</div>
                                                        <div className="text-center">35%</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Lubuk Alung</div>
                                                        <div className="text-center">24%</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">2 x 11 Kayu Tanam</div>
                                                        <div className="text-center">34%</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Ulakan Tapakih</div>
                                                        <div className="text-center">17%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="Editing Coding">
                                <div className="mt-4">
                                    <div className="p-3 font-semibold text-md">Editing Coding</div>
                                </div>
                                <div className="content-RB">
                                    <div className="Deadline grid grid-cols-2 gap-8  rounded-full p-2 w-fit">
                                        <div className="text-xs font-semibold p-1">Sisa Waktu</div>
                                        <div className="bg-[#DF4E4E] text-white rounded-full p-1 text-xs">37 Hari 6 Jam</div>
                                    </div>
                                    <div className="main-board  p-2 md:flex">
                                        <div className="sm:flex md:flex-grow">
                                            <div className="number grid grid-cols-3 sm:block">
                                                <div className="persentase-RB border mx-2 mb-2 border-emerald-400 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                    <div className="text-xs">Persentase RB</div>
                                                    <div className="text-sm font-semibold">78%</div>
                                                </div>

                                                <div className="persentase-RB border mx-2 mb-2 border-emerald-400 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                    <div className="text-xs">Dokumen</div>
                                                    <div className="text-sm font-semibold">301/360</div>
                                                </div>

                                                <div className="persentase-RB border mx-2 border-emerald-400 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                    <div className="text-xs">Tanggal Mulai</div>
                                                    <div className="text-sm font-semibold">Nov 1, 2020</div>
                                                </div>
                                            </div>
                                            <div className="chart flex items-center justify-center mt-2 w-full">
                                                <Line
                                                    data={{ 
                                                        labels: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],
                                                        datasets:[{
                                                            label: "Revenue",
                                                            data : [200,300,400,110,270,325,450,116,235,300,270,115],
                                                        }
                                                        ],
                                                    }}
                                                    options={{
                                                        responsive: true, // Mengatur grafik agar responsif
                                                        maintainAspectRatio: false // Untuk mengabaikan rasio aspek default
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="bungkus progres block sm:flex w-full md:w-fit ">
                                            <div className="progres-petugas mt-4 flex-grow border-2 rounded-lg p-2">
                                                <div className="cover">
                                                    <div className="title grid grid-cols-2 border-b-2 text-sm">
                                                        <div className="text-center font-semibold">Petugas</div>
                                                        <div className="text-center font-semibold">Total Dokumen</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Muhammad Abdillah</div>
                                                        <div className="text-center">24</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Amirul Budiman</div>
                                                        <div className="text-center">36</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Cipto Mangunkusumo</div>
                                                        <div className="text-center">13</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Farhan Halim</div>
                                                        <div className="text-center">-</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="progres-kecamatan mt-4 flex-grow border-2 rounded-lg p-2 sm:ml-3">
                                                <div className="cover">
                                                    <div className="title grid grid-cols-2 text-xs mt-1 border-b-2">
                                                        <div className="text-center font-semibold">Kecamatan</div>
                                                        <div className="text-center font-semibold">Progres</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Batang Anai</div>
                                                        <div className="text-center">35%</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Lubuk Alung</div>
                                                        <div className="text-center">24%</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">2 x 11 Kayu Tanam</div>
                                                        <div className="text-center">34%</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Ulakan Tapakih</div>
                                                        <div className="text-center">17%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="REntri">
                                <div className="mt-4">
                                    <div className="p-3 font-semibold text-md">Entri Data</div>
                                </div>
                                <div className="content-RB">
                                    <div className="Deadline grid grid-cols-2 gap-8  rounded-full p-2 w-fit">
                                        <div className="text-xs font-semibold p-1">Sisa Waktu</div>
                                        <div className="bg-[#DF4E4E] text-white rounded-full p-1 text-xs">37 Hari 6 Jam</div>
                                    </div>
                                    <div className="main-board  p-2 md:flex">
                                        <div className="sm:flex md:flex-grow">
                                            <div className="number grid grid-cols-3 sm:block">
                                                <div className="persentase-RB border mx-2 mb-2 border-emerald-400 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                    <div className="text-xs">Persentase RB</div>
                                                    <div className="text-sm font-semibold">78%</div>
                                                </div>

                                                <div className="persentase-RB border mx-2 mb-2 border-emerald-400 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                    <div className="text-xs">Dokumen</div>
                                                    <div className="text-sm font-semibold">301/360</div>
                                                </div>

                                                <div className="persentase-RB border mx-2 border-emerald-400 w-fit rounded-2xl py-2 pl-2 pr-6 min-w-24 sm:min-w-32 max-h-14">
                                                    <div className="text-xs">Tanggal Mulai</div>
                                                    <div className="text-sm font-semibold">Des 1, 2020</div>
                                                </div>
                                            </div>
                                            <div className="chart flex items-center justify-center mt-2 w-full">
                                                <Line
                                                    data={{ 
                                                        labels: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],
                                                        datasets:[{
                                                            label: "Revenue",
                                                            data : [200,300,400,110,270,325,450,116,235,300,270,115],
                                                        }
                                                        ],
                                                    }}
                                                    options={{
                                                        responsive: true, // Mengatur grafik agar responsif
                                                        maintainAspectRatio: false // Untuk mengabaikan rasio aspek default
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="bungkus progres block sm:flex w-full md:w-fit ">
                                            <div className="progres-petugas mt-4 flex-grow border-2 rounded-lg p-2">
                                                <div className="cover">
                                                    <div className="title grid grid-cols-2 border-b-2 text-sm">
                                                        <div className="text-center font-semibold">Petugas</div>
                                                        <div className="text-center font-semibold">Total Dokumen</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Muhammad Abdillah</div>
                                                        <div className="text-center">24</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Amirul Budiman</div>
                                                        <div className="text-center">36</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Cipto Mangunkusumo</div>
                                                        <div className="text-center">13</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Farhan Halim</div>
                                                        <div className="text-center">-</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="progres-kecamatan mt-4 flex-grow border-2 rounded-lg p-2 sm:ml-3">
                                                <div className="cover">
                                                    <div className="title grid grid-cols-2 text-xs mt-1 border-b-2">
                                                        <div className="text-center font-semibold">Kecamatan</div>
                                                        <div className="text-center font-semibold">Progres</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Batang Anai</div>
                                                        <div className="text-center">35%</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Lubuk Alung</div>
                                                        <div className="text-center">24%</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">2 x 11 Kayu Tanam</div>
                                                        <div className="text-center">34%</div>
                                                    </div>
                                                    <div className="title grid grid-cols-2 text-xs mt-1">
                                                        <div className="text-center">Ulakan Tapakih</div>
                                                        <div className="text-center">17%</div>
                                                    </div>
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
    )
}


export default DashboardWithId;