import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../components/buttonAdd";
import { useCookies } from "react-cookie";
import TopNavAdmin from "../components/topNavAdmin";
import ListMitra from "../components/listMitra";


function Users() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [data2, setData2 ] = useState();
    const [isLoading, setIsLoading ] = useState(true);
    const [ len, setLen ] = useState();
    const [ searchItem, setSearchItem ] = useState('');

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
                    // console.log(data);
                    setLen(data.length)
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


    let isAdmin = false;

    if(cookies.role === 'Admin'){
        isAdmin = true;
    }

    const onSearchChange = (event) => {
        setSearchItem(event.target.value);
    }

    return (
        <>
            <TopNavAdmin />
            <div className="mb-10 mx-4">

            
                {isLoading ? (
                    <>
                    </>
                ) : (
                    <>
                        <div className="font-poppins md:mt-28 mx-auto max-w-4xl">
                            <h2 className="ml-4 mt-6 text-xl">Mitra Management</h2>

                            <div className="the-table mx-auto mt-4 md:mt-8 ml-6">
                                
                            </div>

                            <div className="max-w-5xl md:mx-auto">
                                <input type="text" className="mb-4 rounded-md sm:w-96 w-60 h-6 p-4 lg:mx-auto" placeholder="Search..." onChange={onSearchChange}/>
                            </div>

                            <div className="the-table mx-auto">
                                


                                {data2
                                
                                .filter(item => {
                                    if(typeof item.nama === 'string'){
                                        return item.nama.toLowerCase().includes(searchItem.toLowerCase());
                                    }
                                    return false;
                                })

                                .map((item, index) => {
                                    return (

                                        <div key={index}>
                                            {/* <ListBuble pos={index !== 0 ? (index === len-1 ? 'BOT' : 'MID' ) : 'TOP'} item={[item.nama,item.status,item.start_contract,item.end_contract]} title={['Nama','Status','Start','End']} small={[1,1,0,0]} /> */}
                                            <ListMitra position={index !== 0 ? (index === len-1 ? 'BOT' : 'MID' ) : 'TOP'} nama={item.nama} status={item.status} start={item.start_contract}  end={item.end_contract}/>
                                        </div>
                                    )
                                })}
                                
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
                    </>
                ) }
            </div>
        </>
        
    )
}

export default Users;