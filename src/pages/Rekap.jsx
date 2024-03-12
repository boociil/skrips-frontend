import { useNavigate } from "react-router-dom";
import ListRekap from "../components/listRekap";
import ButtonAdd from "../components/buttonAdd";
import { useEffect, useState } from "react";
import TopNavAdmin from "../components/topNavAdmin";
import { useCookies } from "react-cookie";

function AdminHomePage() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [data,setData] = useState([]);
    const [dataLen,setDataLen] = useState();

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
            
                fetch('http://localhost:3001/get_all_kegiatan', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setData(data);
                    setDataLen(data.length - 1);
                });

            
        }
        fetchData();
        
        // Jika sudah masuk fase production, hapus log ini

    },[dataLen]);


    return (
        <>
            <TopNavAdmin />
            <div className="mt-10 md:mt-32 mx-4 font-poppins">
                <h1 className="text-xl mb-4 md:mb-8 md:pl-8 lg:pl-48">Ayo Lanjutkan Kegiatan!</h1>
                <div className="quick-search">
                    
                </div>
                
                <div className="list-kegiatan mx-auto">
                    {
                        data.map((item, index)=>(
                            <ListRekap key={item.id} position={index !== 0 ? (index === dataLen ? 'BOT' : 'MID' ) : 'TOP'} name={item.nama} id={item.id} metode={item.initiator_id} status={item.status} tgl={item.tanggal_mulai} index={item.length}/>
                        ))
                    }
                </div>
            <ButtonAdd click = {handleClick} />
            </div>
        </>
    )
}

export default AdminHomePage;