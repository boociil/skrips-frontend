import ListKegiatan from "../components/listKegiatan";
import { useEffect, useState, useContext } from "react";
import TopNavbarAdmin from '../components/topNavAdmin';
import { useCookies } from "react-cookie";
import { AuthContext } from "../components/AuthContext";

function AdminHomePage() {

    // const navigate = useNavigate();
    const { isOpen, setIsOpen } = useContext(AuthContext);
    const [data,setData] = useState([]);
    const [dataLen,setDataLen] = useState();
    const [ cookie ] = useCookies([]);
    const [ searchItem, setSearchItem ] = useState('');

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    // const handleClick = () => {
    //     navigate('AddKegiatan');
    // }

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

    return (
        <>
        <TopNavbarAdmin />

        <div className="mt-10 md:pt-28 h-full font-poppins" onClick={() => setIsOpen(false)}>

            <div className="max-w-5xl md:mx-auto">
                <h1 className="text-xl mb-4 md:mb-8">Mau Monitoring Apa Hari ini?</h1>
            </div>
            
            <div className="max-w-5xl md:mx-auto">
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
                        <ListKegiatan key={item.id} position={index !== 0 ? (index === dataLen ? 'BOT' : 'MID' ) : 'TOP'} name={item.nama} id={item.id} metode={item.initiator_id} status={item.status} tgl={item.tanggal_mulai} index={item.length}/>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default AdminHomePage;