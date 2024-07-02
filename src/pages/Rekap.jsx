import { useNavigate } from "react-router-dom";
import ListRekap from "../components/ListRekap";
import ButtonAdd from "../components/ButtonAdd";
import { useContext, useEffect, useState } from "react";
import TopNavAdmin from "../components/Navbar";
import { useCookies } from "react-cookie";
import { AuthContext } from "../components/AuthContext";
import Loading from "../components/Loading";


function AdminHomePage() {

    const { isOpen, setIsOpen } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [data,setData] = useState([]);
    const [dataLen,setDataLen] = useState(-1);
    const [ searchItem, setSearchItem ] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [ loadingData, setLoadingData ] = useState(true);

    const handleClick = () => {
        navigate('AddKegiatan');
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
            
                fetch(backendUrl + 'get_all_kegiatan', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setDataLen(data.length - 1);
                    setLoadingData(false);
                });

            
        }

        fetchData();

    },[dataLen]);

    const onSearchChange = (event) => {
        setSearchItem(event.target.value);
    }

    let isAdmin = false;

    if(cookies.role === 'Admin'){
        isAdmin = true;
    }

    return (
        <>
        <TopNavAdmin />
        <div className="mx-4">
            
            {
                loadingData ? (
                
                    <>
                        <div className="mt-10 md:mt-28 h-full font-poppins flex items-center justify-center" onClick={() => setIsOpen(false)}>
                            <Loading/>
                        </div>
                    </>
                ) : (
                    <>
                        {
                            dataLen !== -1 ? (
                                <div className="mt-10 mb-10 md:mt-28 h-full font-poppins" onClick={() => setIsOpen(false)}>
            
                                    <div className="max-w-5xl md:mx-auto">
                                        <h1 className="text-xl mb-4 md:mb-8">Ayo Lanjutkan Kegiatan!</h1>
                                    </div>
                        
                                    
                                    <div className="quick-search">
                                        
                                    </div>
            
                                    <div className="max-w-5xl lg: md:mx-auto">
                                        <input type="text" className="mb-4 rounded-md sm:w-96 w-60 h-6 p-4 lg:mx-auto" placeholder="Search..." onChange={onSearchChange}/>
                                    </div>
                                    
                                    <div className="list-kegiatan mx-auto">
                                        {
                                            data
                                            .filter(item => {
                                                if(typeof item.nama === 'string'){
                                                    return item.nama.toLowerCase().includes(searchItem.toLowerCase());
                                                }
                                                return false;
                                            })
                                            .map((item, index)=>(
                                                <ListRekap key={item.id} position={index !== 0 ? (index === dataLen ? 'BOT' : 'MID' ) : 'TOP'} name={item.nama} id={item.id} metode={item.progres} status={item.status} tgl={item.tanggal_mulai} index={item.length} jenis={item.jenis}/>
                                            ))
                                        }
                                    </div>
                                    
                                    
                                </div>
            
                            ) : (
                                <div className="mx-auto md:pt-48 text-center text-xl text-slate-500 mt-10">
                                    Belum ada kegiatan.
                                </div>
                            )
                        }
                        {
                            isAdmin ? (
                                <>
                                    <ButtonAdd click = {handleClick} />
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
        </>
    )
}

export default AdminHomePage;