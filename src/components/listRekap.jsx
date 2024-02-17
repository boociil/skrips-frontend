import { useState,useEffect } from "react";


function ListRekap(props) {

    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ dataLen, setDataLen ] = useState();
    const [ prevKec, setPrevKec ] = useState();
    const [ expandedIndex, setExpandedIndex ] = useState(null);


    const handleCardClick = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    useEffect(() =>{

        const fetchData = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
                const link = 'http://localhost:3001/get_pengolahan_data/' + props.id
                fetch(link,  requestOptions)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setDataLen(data.length - 1);
                    setIsLoading(false)
                    // console.log("Data : ", data);
                });

            
        }
        fetchData();
        
        // Jika sudah masuk fase production, hapus log ini

    },[]);

    return (
        <>
            {isLoading ? (
                <div>
                    Lagi Loading
                </div>
            ) : (
                <div>

                    <div className="kecamatan mx-3 mt-3 mb-3 p-1 bg-[#418EC6] text-white text-xs text-center rounded-md hover:bg-sky-400" onClick={handleCardClick.bind(this,1)}>
                        BATANG ANAI
                    </div>
                    {expandedIndex === 1 && (
                        <div className="card-body">
                            <p>fold</p>
                        </div>
                    )}
                    <div className="kecamatan mx-3 mt-3 mb-3 p-1 bg-[#418EC6] text-white text-xs text-center rounded-md hover:bg-sky-400" onClick={handleCardClick.bind(this,2)}>
                        LUBUK ALUNG
                    </div>
                    {expandedIndex === 2 && (
                        <div className="card-body">
                            <p>fold</p>
                        </div>
                    )}
                    <div className="kecamatan mx-3 mt-3 mb-3 p-1 bg-[#418EC6] text-white text-xs text-center rounded-md">
                        VII KOTO
                    </div>
                </div>
            )}
        </>
    )
}

export default ListRekap;