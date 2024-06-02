import { useParams } from "react-router-dom"
import { useContext, useEffect,useState } from "react";
import ListAssignPetugas from "../components/ListAssignPetugas";
import ListAssignPetugasSurvei from "../components/ListAssignPetugasSurvei";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/Navbar";
import Loading from "../components/Loading";
import { AuthContext } from "../components/AuthContext";

const AssignPetugas = () => {
    const { id } = useParams();
    const { isOpen, setIsOpen } = useContext(AuthContext);
    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ namaKegiatan, setNamaKegiatan ] = useState();
    const [ isSurvei, setIsSurvei ] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    useEffect(() =>{

        const fetchData = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
            };
            
                fetch(backendUrl + 'get_info/' + id , requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setIsSurvei(data[0].jenis === "2");
                    setNamaKegiatan(data[0].nama)
                    setIsLoading(false);
                });
        }
        fetchData();
        // Jika sudah masuk fase production, hapus log ini

    },[id]);

    return (
        <>
            <TopNavAdmin />
            <div onClick={() => setIsOpen(false)}>
                { isLoading ? (
                    <div>
                        <Loading/>
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
                            {
                                isSurvei ? (
                                    <>
                                    <ListAssignPetugasSurvei id={id} isSurvei={isSurvei}/>
                                    </>
                                ) : (
                                    <>
                                    <ListAssignPetugas id={id} isSurvei={isSurvei}/>
                                    </>
                                )
                            }
                            
                        </div>

                    </div>
                )}            
            </div>
        </>
        
    )
}

export default AssignPetugas;