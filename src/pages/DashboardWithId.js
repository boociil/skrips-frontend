import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Bar,Line } from "react-chartjs-2";
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
        <div className="Dashboard md:mt-20 mt-5">
            {
                isLoading ? (
                    <>
                    </>
                ) : (
                    <>
                        <div className="mb-4 ml-4">
                            Hai {id_kegiatan}
                        </div>
                        <div className="md:flex mx-auto md:justify-center md:items-center max-w-7xl">
                            <div className="container-left md:w-1/2 bg-white shadow-lg mx-4 md:mx-2 rounded-lg p-2">
                                Hai ini adalah div bagian kiri
                                <div className="progres border-2p-2 rounded-md">
                                    <div className="text-sm">Progres</div>
                                    <div className="font-bold text-emerald-400">78%</div>
                                </div>
                            </div>
                            <div className="container-right md:w-1/2 mt-3 md:mt-0 bg-white shadow-lg mx-4 md:mx-2 rounded-lg p-2">
                                Hai ini adalah div bagian Kanan
                                <Line

                                    data={{ 
                                        labels: ["Jan","Feb","Mar","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],
                                        datasets:[
                                            {
                                                label: "Revenue",
                                                data : [200,300,400,250,110,175,360,72,90,130,270],
                                            },
                                            {
                                                label: "Revenue2",
                                                data : [250,320,370,110,110,175,360,72,90,130,270],
                                            },
                                        ],
                                    }}

                                />
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


                            <div className="bg-white rounded-lg shadow-lg mt-3 mx-4">
                                <div className="judul tabel">
                                    <div>
                                        Progres Petugas
                                    </div>
                                </div>
                                <div className="container-progres-petugas grid grid-cols-2  p-3 ">
                                    <div className="left">
                                        <div className="title p-1 border-b-2 mb-1 font-semibold">
                                            <div className="text-center">Nama Petugas</div>
                                        </div>
                                        <div className="">
                                            <div className="text-center">-</div>
                                        </div>
                                        <div className="">
                                            <div className="text-center">-</div>
                                        </div>
                                        <div className="">
                                            <div className="text-center">-</div>
                                        </div>
                                        <div className="">
                                            <div className="text-center">-</div>
                                        </div>
                                    </div>
                                    <div className="right border-l-2">
                                        <div className="title  p-1 border-b-2 mb-1 font-semibold">
                                            <div className="text-center">Total</div>
                                        </div>
                                        <div className="">
                                            <div className="text-center">-</div>
                                        </div>
                                        <div className="">
                                            <div className="text-center">-</div>
                                        </div>
                                        <div className="">
                                            <div className="text-center">-</div>
                                        </div>
                                        <div className="">
                                            <div className="text-center">-</div>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            

                        
                        </div>
                    </>
                )
            }
                {/*  */}
        </div>
    )
}


export default DashboardWithId;