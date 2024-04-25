import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../components/buttonAdd";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";


function Users() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [data2, setData2 ] = useState();
    const [isLoading, setIsLoading ] = useState(true);

    useEffect(() =>{

        const fetchData = () => {

            const requestOptions = {
                method: 'POST', // Metode HTTP
                headers: {
                    'Content-Type': 'application/json' // Tentukan tipe konten yang Anda kirimkan
                },
                    body: JSON.stringify({ /* Data yang akan dikirimkan, seperti form*/ }) 
                };
            
                fetch('http://localhost:3001/get_all_mitra', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setData2(data);
                    setIsLoading(false)
                });

            
        }
        fetchData();
        
        // Jika sudah masuk fase production, hapus log ini

    },[]);

    const handleClick = () => {
        navigate('Register');
    }

    useEffect(() => {
        //const theHtml = document.querySelector('#root')
        //theHtml.classList.add('bg-white');
    }, []);


    return (
        <>
            <TopNavAdmin />
            {isLoading ? (
                <></>
            ) : (
                <>
                    <div className="font-poppins md:mt-28 mx-auto max-w-4xl">
                        <h2 className="ml-4 mt-6 text-xl">Mitra Management</h2>

                        <div className="the-table mx-auto mt-4 md:mt-8 ml-6">
                            <div className="title mx-auto grid grid-cols-2 md:grid-cols-4 text-slate-600 text-xs mb-4">
                                <div className="col-start-1">Nama</div>
                                <div className="col-start-2 md:block text-center">Status</div>
                                <div className="hidden md:block md:col-start-3 ">Mulai Kontrak</div>
                                <div className="hidden md:col-start-4 md:block">Selesai Kontrak</div>
                            </div>
                            <div className="content  text-slate-600 text-sm">
                                {data2.map((item, index) => {

                                    

                                    return (
                                        <div key={index} className="my-1 grid grid-cols-2 md:grid-cols-4">
                                            <div className="cols-start-1 max-h-6 overflow-hidden">{item.nama}</div>
                                            <div className="cols-start-2 text-center">{item.status} </div>
                                            <div className="hidden md:block cols-start-3 w-fit max-h-8 p-1 rounded-lg">{item.start_contract}</div>
                                            <div className="hidden md:block md:cols-start-4">{item.end_contract}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <ButtonAdd click = {handleClick} />
                    </div>
                </>
            ) }
        </>
        
    )
}

export default Users;