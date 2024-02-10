import { useNavigate } from "react-router-dom";
import ListKegiatan from "../components/listKegiatan";
import ButtonAdd from "../components/buttonAdd";

function AdminHomePage() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('AddKegiatan');
    }

    return (
        <div className="mt-10 md:mt-32 mx-4 font-poppins">
            <h1 className="text-xl mb-4 md:mb-8 md:pl-8 lg:pl-48">Mau Monitoring Apa Hari ini?</h1>
            <div className="quick-search">
                
            </div>

            <div className="list-kegiatan ">
                <ListKegiatan 
                    position='TOP'
                    name='Sensus Pertanian 2023' 
                    id='ST2023' 
                    tgl='Oct 1, 2023'
                    status='Pengolahan'
                    metode='PAPI'
                />
                <ListKegiatan 
                    position='MID'
                    name='Sensus Penduduk 2020' 
                    id='SP2020' 
                    tgl='Oct 1, 2023'
                    status='Pencacahan'
                    metode='PAPI'
                />
                <ListKegiatan 
                    position='MID'
                    name='Survei Angkatan Kerja 2022' 
                    id='Sakernas2022' 
                    tgl='Oct 1, 2023'
                    status='Pemutakhiran'
                    metode='PAPI'
                />
                <ListKegiatan 
                    position='BOT'
                    name='Survei Angkatan Kerja 2022' 
                    id='Sakernas2022' 
                    tgl='Oct 1, 2023'
                    status='Selesai'
                    metode='PAPI'
                />
            </div>
        <ButtonAdd click = {handleClick} />
        </div>
    )
}

export default AdminHomePage;