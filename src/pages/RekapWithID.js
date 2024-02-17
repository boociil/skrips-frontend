import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import ListRekap from "../components/listRekap";

const RekapWithID = () => {
    const { id } = useParams();

    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ namaKegiatan, setNamaKegiatan ] = useState();
    const [ miniPageIndex, setMiniPageIndex ] = useState(1);

    useEffect(() =>{

        const fetchData = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
            
                fetch('http://localhost:3001/get_info/' + id , requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setNamaKegiatan(data[0].nama)
                    console.log(data);
                    setIsLoading(false);
                });
        }
        fetchData();
        // Jika sudah masuk fase production, hapus log ini

    },[id]);

    return (
        <div>
            { isLoading ?(
                <div>
                    Lagi Loading
                </div>
            ): (
                <div className="text-sm">
                    <div className="cont-atas bg-white rounded-lg shadow-lg mx-3 mt-4 p-3 md:mt-24">
                        <h2 className="ml-2 font-semibold">{namaKegiatan}</h2>
                        <p className="ml-2 text-slate-600">ST2023</p>
                    </div>

                    <div className="cont-bawah bg-white rounded-lg shadow-lg mt-4 mx-3">
                        <div className="nav grid grid-cols-3 rounded-t-md">
                            <div className="text-center border-r-4 p-1 border-b-4 border-[#F5F4F4]">Receving Batching</div>
                            <div className="text-center border-r-4 p-1 border-b-4 border-[#F5F4F4]">Editing Coding</div>
                            <div className="text-center p-1 border-b-4 border-[#F5F4F4]">Entri</div>
                        </div>
                        <div className="flex">
                            <div className="progres flex-grow ml-4">
                                <span className="ml-2">Progres : {data[0]?.status}</span>
                            </div>
                            <div className="deadline ml-auto mr-4">
                                <span className="">Waktu Tersisa : </span>
                            </div>
                        </div>

                        <div className="content p-1">
                            <ListRekap id={id} />
                        </div>
                    </div>
                </div>
            )}            
        </div>
    )
}

export default RekapWithID