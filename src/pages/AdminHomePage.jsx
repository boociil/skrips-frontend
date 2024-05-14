import ListKegiatan from "../components/listKegiatan";
import { useEffect, useState } from "react";
import TopNavbarAdmin from '../components/topNavAdmin';
import { useCookies } from "react-cookie";


function AdminHomePage() {

    // const navigate = useNavigate();

    const [data,setData] = useState([]);
    const [dataLen,setDataLen] = useState();
    const [ cookie ] = useCookies([]);
    const [ searchItem, setSearchItem ] = useState('');

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
            
                fetch('http://localhost:3001/get_all_kegiatan', requestOptions)
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

        <div className="mt-10 md:mt-32 mx-4 font-poppins">

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