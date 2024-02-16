import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";

const RekapWithID = () => {
    const { id } = useParams();

    const [ data, setData ] = useState([]);
    const [ dataLen, setDataLen ] = useState();
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
                    console.log("DATA : ", data);
                    setNamaKegiatan(data[0].nama)
                    setDataLen(data.length - 1);
                });

            
        }
        fetchData();
        
        // Jika sudah masuk fase production, hapus log ini

    },[id]);

    return (
        <div>
            <div className="cont-atas bg-white rounded-lg shadow-lg mx-3 mt-4 p-3 md:mt-24">
                <h2 className="ml-2 font-semibold">{namaKegiatan}</h2>
                <p className="ml-2 text-slate-600">ST2023</p>
            </div>

            <div className="cont-bawah bg-white rounded-lg shadow-lg">
                <div className="nav">

                </div>
                <div className="progres">

                </div>
                <div className="deadline">
                    Deadline : 
                </div>
                <div className="content">

                </div>
            </div>
        </div>
    )
}

export default RekapWithID