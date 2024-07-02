import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect,useState } from "react";
import ListRekap from "../components/ListRekapRB";
import ListRekapEdcod from "../components/ListRekapEdcod";
import ListRekapEntri from "../components/ListRekapEntri";
import ListRekapRBSurvei from "../components/ListRekapRBSurvei";
import ListRekapEdcodSurvei from "../components/ListRekapEdcodSurvei";
import ListRekapEntriSurvei from "../components/ListRekapEntriSurvei";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/Navbar";
import Loading from "../components/Loading";
import { AuthContext } from "../components/AuthContext";

const RekapWithID = () => {
    const { isOpen, setIsOpen } = useContext(AuthContext);
    const { id } = useParams();
    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ namaKegiatan, setNamaKegiatan ] = useState();
    const [ miniPageIndex, setMiniPageIndex ] = useState(1);
    const [ isSurvei , setIsSurvei ] = useState(false);
    const [ cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ dataOverallProgres, setDataOverallProgres ] = useState();
    const [ loadingOverallProgres, setLoadingOverallProgres ] = useState(true)
    const [ deadlineRb, setDeadlineRb ] = useState();
    const [ deadlineEdcod, setDeadlineEdcod ] = useState();
    const [ deadlineEntri, setDeadlineEntri ] = useState();
    const [ isLoadingProgresKecamatan ,setIsLoadingProgresKecamatan] = useState(true);
    const [ dataProgresKecamatan, setDataProgresKecamatan ] = useState();
    const [ rb, setRb ] = useState();
    const [ edcod, setEdcod ] = useState();
    const [ entri, setEntri ] = useState();
    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const miniPageClick = (index) => {
        setMiniPageIndex(index)
    }

    // mengembalikan kelas berupa warna dari text
    const setColour = (num) => {
        const low = '[#EC5F4C]';
        const med = '[#418EC6]';
        const high = '[#14CB11]';

        if (num < 35){
            return 'text-' + low;
        }else if(num < 65){
            return 'text-' + med;
        }else{
            return 'text-' + high;
        }
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

            fetch(start_link + id , requestOptions)
            .then(response => response.json())
            .then(data => {

                setDataOverallProgres(data);

                const the_rb = data[0].rb * 100 / data[0].total
                const the_edcod = data[0].edcod * 100 / data[0].total
                const the_entri = data[0].entri * 100 / data[0].total


                setRb(the_rb)
                setEdcod(the_edcod)
                setEntri(the_entri)

                setLoadingOverallProgres(false);
            });
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
            
                fetch( backendUrl + 'get_info/' + id , requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);

                    setNamaKegiatan(data[0].nama)
                    setIsSurvei(data[0].jenis == 2);

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
                let start_link = backendUrl + "get_progres_kecamatan/"


                fetch(start_link + id , requestOptions)
                .then(response => response.json())
                .then(data => {
                    
                    setDataProgresKecamatan(data);
                    setIsLoadingProgresKecamatan(false);
                });
        }

        fetchDataProgresKecmatan();
        fetchData();
        fetchDataOveralProgres();
        
        // Jika sudah masuk fase production, hapus log ini

    },[isSurvei]);

    return (
        <>
            <TopNavAdmin />
            <div onClick={() => setIsOpen(false)}>
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
                                    <div className="md:text-base transition-all text-sm text-center border-r-4 p-1 border-b-4 border-[#F5F4F4] font-semibold" onClick={() => miniPageClick(1)}>
                                        Receving Batching { loadingOverallProgres ? (<Loading/>) : <>(<span className={`${setColour(rb)}`}>{(rb).toFixed(2)}%</span>)</> }
                                    </div>

                                        <div className="md:text-base transition-all text-sm text-center border-r-4 p-1 border-b-4 border-[#F5F4F4] bg-[#F5F4F4] hover:bg-white cursor-pointer" onClick={() => miniPageClick(2)}>Editing Coding</div>
                                        <div className="md:text-base transition-all text-sm text-center p-1 border-b-4 border-[#F5F4F4] bg-[#F5F4F4] hover:bg-white cursor-pointer" onClick={() => miniPageClick(3)}>Entri</div>
                                    </div>
                                    <div className="flex mt-4">
                                        
                                    </div>

                                    <div className="content p-1">
                                            {
                                                isLoadingProgresKecamatan ? (
                                                    <div className="w-full flex justify-center items-center">
                                                        <Loading />
                                                    </div>
                                                ) : (
                                                    <>
                                                    {
                                                        isLoading ? (
                                                            <> 
                                                            </>
                                                        ) : (
                                                            <>
                                                                {
                                                                    isSurvei ? (
                                                                        <>
                                                                            <ListRekapRBSurvei id={id} data={dataProgresKecamatan} isLoading={isLoadingProgresKecamatan}/>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <ListRekap id={id} data={dataProgresKecamatan} isLoading={isLoadingProgresKecamatan}/>
                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }
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
                                        <div className="md:text-base transition-all text-sm text-center border-r-4 p-1 border-b-4 border-[#F5F4F4] font-semibold" onClick={() => miniPageClick(2)}>
                                            Editing Coding { loadingOverallProgres ? (<Loading/>) : <>(<span className={`${setColour(edcod)}`}>{(edcod).toFixed(2)}%</span>)</> }
                                        </div>
                                        <div className="md:text-base transition-all text-sm text-center p-1 border-b-4 border-[#F5F4F4] bg-[#F5F4F4] cursor-pointer hover:bg-white" onClick={() => miniPageClick(3)}>Entri</div>
                                    </div>
                                        <div className="flex mt-4">
                                            
                                        </div>

                                        <div className="content p-1">
                                            {
                                                isLoadingProgresKecamatan ? (
                                                    <div className="w-full flex justify-center items-center">
                                                        <Loading />
                                                    </div>
                                                ) : (
                                                    <>
                                                        {
                                                            isLoading ? (
                                                                <></>
                                                            ) : (
                                                                <>
                                                                    {
                                                                    isSurvei ? (
                                                                        <>
                                                                            <ListRekapEdcodSurvei id={id} data={dataProgresKecamatan} isLoading={isLoadingProgresKecamatan}/>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <ListRekapEdcod id={id} data={dataProgresKecamatan} isLoading={isLoadingProgresKecamatan}/>
                                                                        </>
                                                                    )
                                                                }
                                                                </>
                                                            )
                                                        }
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
                                            <div className="md:text-base transition-all text-sm text-center p-1 border-b-4 border-[#F5F4F4] font-semibold" onClick={() => miniPageClick(3)}>
                                                Entri { loadingOverallProgres ? (<Loading/>) : <>(<span className={`${setColour(entri)}`}>{(entri).toFixed(2)}%</span>)</> }
                                            </div>
                                        </div>
                                        <div className="flex mt-4">
                                            
                                        </div>

                                        <div className="content p-1">
                                            {
                                                isLoadingProgresKecamatan ? (
                                                    <div className="w-full flex justify-center items-center">
                                                        <Loading />
                                                    </div>
                                                ) : (
                                                    <>
                                                        {
                                                            isLoading ? (
                                                                <></>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        isSurvei ? (
                                                                            <>
                                                                                <ListRekapEntriSurvei id={id} data={dataProgresKecamatan} isLoading={isLoadingProgresKecamatan}/>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <ListRekapEntri id={id} data={dataProgresKecamatan} isLoading={isLoadingProgresKecamatan}/>
                                                                            </>
                                                                        )
                                                                    }
                                                                </>
                                                            )
                                                        }
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