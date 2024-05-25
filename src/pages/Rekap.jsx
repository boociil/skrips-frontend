import { useNavigate } from "react-router-dom";
import ListRekap from "../components/listRekap";
import ButtonAdd from "../components/buttonAdd";
import { useContext, useEffect, useState } from "react";
import TopNavAdmin from "../components/topNavAdmin";
import { useCookies } from "react-cookie";
import { AuthContext } from "../components/AuthContext";

function AdminHomePage() {

    const { isOpen, setIsOpen } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [data,setData] = useState([]);
    const [dataLen,setDataLen] = useState();
    const [ searchItem, setSearchItem ] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL

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
                });

            
        }

        

        fetchData();
        
        // Jika sudah masuk fase production, hapus log ini

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
            <div className="mt-10 md:pt-32 h-full font-poppins" onClick={() => setIsOpen(false)}>

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
                            <ListRekap key={item.id} position={index !== 0 ? (index === dataLen ? 'BOT' : 'MID' ) : 'TOP'} name={item.nama} id={item.id} metode={item.initiator_id} status={item.status} tgl={item.tanggal_mulai} index={item.length} jenis={item.jenis}/>
                        ))
                    }
                </div>
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
                
            </div>

        </div>
        </>
    )
}

export default AdminHomePage;