
import ListKegiatan from "../components/listKegiatan";

function AdminHomePage() {
    return (
        <div className="mt-32 mx-4 font-poppins">
            <h1 className="text-xl mb-4">Mau Monitoring Apa Hari ini?</h1>
            <div className="quick-search">
                
            </div>

            <div className="list-kegiatan ">
                <ListKegiatan 
                    position='TOP'
                    name='Sensus Pertanian 2023' 
                    id='ST2023' 
                    tgl='Oct 1, 2023'
                    status='Pencacahan'
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
                    position='BOT'
                    name='Survei Angkatan Kerja 2022' 
                    id='Sakernas2022' 
                    tgl='Oct 1, 2023'
                    status='Pencacahan'
                    metode='PAPI'
                />
            </div>

        </div>
    )
}

export default AdminHomePage;