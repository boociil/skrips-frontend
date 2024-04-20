import { useNavigate, useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import ListRekap from "../components/listRekapRB";
import ListRekapEdcod from "../components/listRekapEdcod";
import ListRekapEntri from "../components/listRekapEntri";
import ListRekapRBSurvei from "../components/ListRekapRBSurvei";
import ListRekapEdcodSurvei from "../components/ListRekapEdcodSurvei";
import ListRekapEntriSurvei from "../components/ListRekapEntriSurvei";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";


const RekapWithID = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ namaKegiatan, setNamaKegiatan ] = useState();
    const [ miniPageIndex, setMiniPageIndex ] = useState(1);
    const [ isSurvei , setIsSurvei ] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ can, setCan ] = useState(true);

    const getNav = () => {
        if (cookies.role === 'admin'){
            return (
                <TopNavAdmin />
            )
        }
        if (cookies.role === 'pengawas'){
            return (
                <TopNavAdmin />
            )
        }
        if (cookies.role === 'operator'){
            return (
                <TopNavAdmin />
            )
        }
    }

    const miniPageClick = (index) => {
        setMiniPageIndex(index)
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
            
                fetch('http://localhost:3001/get_info/' + id , requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    console.log(data[0].status);
                    setNamaKegiatan(data[0].nama)
                    setIsSurvei(data[0].jenis === "2");
                    setIsLoading(false);
                });
        }
        fetchData();
        // Jika sudah masuk fase production, hapus log ini

    },[id]);

    return (
        <>
            <TopNavAdmin />
            <div>
                { isLoading ? (
                    <div>
                        Lagi Loading
                    </div>
                ): (
                    
                    <div className="">
                        <div className="cont-atas bg-white rounded-lg shadow-lg mx-3 mt-4 p-3 md:mt-24 sm:h-40 sm:relative overflow-hidden max-w-6xl md:mx-auto z-[-1]" >
                            <div className="hidden sm:block sm:rounded-full sm:absolute w-60 h-60 bg-[#7FFF7C] sm:-top-36 sm:-left-36"></div>
                            <div className="hidden sm:block sm:rounded-full sm:absolute w-96 h-96 bg-[#6278EB] sm:-right-12 sm:-top-40"></div>
                            <div className="hidden sm:block sm:rounded-full sm:absolute w-80 h-80 bg-[#FFA1A1] sm:-right-52 sm:-top-40"></div>
                            <div className="sm:bottom-4 sm:absolute">
                                <h2 className="ml-2 font-semibold sm:bottom-0 md:text-xl text-sm">{namaKegiatan}</h2>
                                <p className="ml-2 text-slate-600 md:text-xl text-sm">{id}</p>
                            </div>
                        </div>

                        <div className="cont-bawah pb-2 bg-white rounded-lg shadow-lg mt-4 mx-3 mb-2 max-w-6xl md:mx-auto">
                            
                            
                            { miniPageIndex === 1 ? ( 
                                <>
                                    <div className="nav grid grid-cols-3 rounded-t-md">
                                        <div className="md:text-base transition-all text-sm text-center border-r-4 p-1 border-b-4 border-[#F5F4F4]" onClick={() => miniPageClick(1)}>Receving Batching</div>
                                        <div className="md:text-base transition-all text-sm text-center border-r-4 p-1 border-b-4 border-[#F5F4F4] bg-[#F5F4F4] hover:bg-white cursor-pointer" onClick={() => miniPageClick(2)}>Editing Coding</div>
                                        <div className="md:text-base transition-all text-sm text-center p-1 border-b-4 border-[#F5F4F4] bg-[#F5F4F4] hover:bg-white cursor-pointer" onClick={() => miniPageClick(3)}>Entri</div>
                                    </div>
                                    <div className="flex mt-2">
                                        <div className="progres flex-grow ml-4">
                                            <span className="ml-2">Progres : RB {data[0]?.status}</span>
                                        </div>
                                        <div className="deadline ml-auto mr-4">
                                            <span className="">Waktu Tersisa : </span>
                                        </div>
                                    </div>

                                    <div className="content p-1">
                                            {
                                                isSurvei ? (
                                                    <>
                                                        <ListRekapRBSurvei id={id}/>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ListRekap id={id} />
                                                    </>
                                                )
                                            }
                                        
                                        
                                    </div>
                                </>
                            ) : (
                                miniPageIndex === 2 ? (
                                    <>
                                    <div className="nav grid grid-cols-3 rounded-t-md">
                                        <div className="md:text-base transition-all text-sm text-center border-r-4 p-1 border-b-4 border-[#F5F4F4] cursor-pointer bg-[#F5F4F4] hover:bg-white" onClick={() => miniPageClick(1)}>Receving Batching</div>
                                        <div className="md:text-base transition-all text-sm text-center border-r-4 p-1 border-b-4 border-[#F5F4F4]" onClick={() => miniPageClick(2)}>Editing Coding</div>
                                        <div className="md:text-base transition-all text-sm text-center p-1 border-b-4 border-[#F5F4F4] bg-[#F5F4F4] cursor-pointer hover:bg-white" onClick={() => miniPageClick(3)}>Entri</div>
                                    </div>
                                        <div className="flex mt-2">
                                            <div className="progres flex-grow ml-4">
                                                <span className="ml-2">Progres : Edcod {data[0]?.status}</span>
                                            </div>
                                            <div className="deadline ml-auto mr-4">
                                                <span className="">Waktu Tersisa : </span>
                                            </div>
                                        </div>

                                        <div className="content p-1">
                                            {
                                                isSurvei ? (
                                                    <>
                                                        <ListRekapEdcodSurvei id={id} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <ListRekapEdcod id={id} />
                                                    </>
                                                )
                                            }
                                            
                                        </div>
                                    </>
                                ) : (
                                    <>

                                        <div className="nav grid grid-cols-3 rounded-t-md">
                                            <div className="md:text-base transition-all text-sm text-center border-r-4 p-1 border-b-4 border-[#F5F4F4] bg-[#F5F4F4] cursor-pointer hover:bg-white" onClick={() => miniPageClick(1)}>Receving Batching</div>
                                            <div className="md:text-base transition-all text-sm text-center border-r-4 p-1 border-b-4 border-[#F5F4F4] bg-[#F5F4F4] cursor-pointer hover:bg-white" onClick={() => miniPageClick(2)}>Editing Coding</div>
                                            <div className="md:text-base transition-all text-sm text-center p-1 border-b-4 border-[#F5F4F4]" onClick={() => miniPageClick(3)}>Entri</div>
                                        </div>
                                        <div className="flex mt-2">
                                            <div className="progres flex-grow ml-4">
                                                <span className="ml-2">Progres : Entri {data[0]?.status}</span>
                                            </div>
                                            <div className="deadline ml-auto mr-4">
                                                <span className="">Waktu Tersisa : </span>
                                            </div>
                                        </div>

                                        <div className="content p-1">
                                            {
                                                isSurvei ? (
                                                    <>
                                                        <ListRekapEntriSurvei id={id} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <ListRekapEntri id={id} />
                                                    </>
                                                )
                                            }
                                            
                                        </div>
                                    </>
                                )
                            ) }

                            

                        </div>

                    </div>
                )}            
            </div>
        </>
        
    )
}

export default RekapWithID