import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import ListAssignPetugas from "./listAssignPetugas";

const AssignPetugas = () => {
    const { id } = useParams();

    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ namaKegiatan, setNamaKegiatan ] = useState();


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
                    setIsLoading(false);
                });
        }
        fetchData();
        // Jika sudah masuk fase production, hapus log ini

    },[id]);

    return (
        <div>
            { isLoading ? (
                <div>
                    Lagi Loading
                </div>
            ): (
                
                <div className="">
                    <div className="cont-atas bg-white rounded-lg shadow-lg mx-3 mt-4 p-3 md:mt-24 sm:h-40 sm:relative overflow-hidden max-w-6xl md:mx-auto">
                        <div className="hidden sm:block sm:rounded-full sm:absolute w-60 h-60 bg-[#7FFF7C] sm:-top-36 sm:-left-36"></div>
                        <div className="hidden sm:block sm:rounded-full sm:absolute w-96 h-96 bg-[#6278EB] sm:-right-12 sm:-top-40"></div>
                        <div className="hidden sm:block sm:rounded-full sm:absolute w-80 h-80 bg-[#FFA1A1] sm:-right-52 sm:-top-40"></div>
                        <div className="sm:bottom-4 sm:absolute">
                            <h2 className="ml-2 font-semibold sm:bottom-0 md:text-xl text-sm">{namaKegiatan}</h2>
                            <p className="ml-2 text-slate-600 md:text-xl text-sm">ST2023</p>
                        </div>
                    </div>

                    

                    <div className="cont-bawah p-3 bg-white rounded-lg shadow-lg mt-4 mx-3 mb-2 max-w-6xl md:mx-auto">
                        <div className="Title flex items-center justify-center my-6">
                            <span className="font-poppins text-xl">Pilih Petugas</span>
                        </div>
                        <ListAssignPetugas id={id} />
                    </div>

                </div>
            )}            
        </div>
    )
}

export default AssignPetugas;