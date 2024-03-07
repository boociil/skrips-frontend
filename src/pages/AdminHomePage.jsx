// import { useNavigate } from "react-router-dom";
import ListKegiatan from "../components/listKegiatan";
import { useEffect, useState } from "react";
import TopNavbarAdmin from '../components/topNavAdmin';
import { useCookies } from "react-cookie";


function AdminHomePage() {

    // const navigate = useNavigate();

    const [data,setData] = useState([]);
    const [dataLen,setDataLen] = useState();
    const [ cookie ] = useCookies([]);

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


    console.log(cookie);
    return (
        <>
        <TopNavbarAdmin />

        <div className="mt-10 md:mt-32 mx-4 font-poppins">
            <h1 className="text-xl mb-4 md:mb-8 md:pl-8 lg:pl-48">Mau Monitoring Apa Hari ini?</h1>
            <div className="quick-search">
                
            </div>
            
            <div className="list-kegiatan mx-auto">
                {
                    data.map((item, index)=>(
                        <ListKegiatan key={item.id} position={index !== 0 ? (index === dataLen ? 'BOT' : 'MID' ) : 'TOP'} name={item.nama} id={item.id} metode={item.metode} status={item.status} tgl={item.tanggal_mulai} index={item.length}/>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default AdminHomePage;