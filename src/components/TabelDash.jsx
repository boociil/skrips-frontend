
function ConfirmCard({ data, onClose, type}) {

    console.log(data);

    let title = "";
    let title_column1 = "";
    let title_column2 = "";
    let kec = false;

    if(type > 3){
        kec = true;
    }
    
    if (type == 1 ){
        title = "Petugas Receiving Batching";
        title_column2 = "Dokumen"
        title_column1 = "Petugas"
    }else if( type = 2 ){
        title = "Petugas Editing Coding";
        title_column2 = "Dokumen"
        title_column1 = "Petugas"
    }else if( type = 3 ){
        title = "Petugas Entri";
        title_column2 = "Dokumen"
        title_column1 = "Petugas"
    }else if( type = 4 ){
        title = "Progres Kecamatan Receiving Batching";
        title_column2 = "Progres"
        title_column1 = "Kecamatan"
    }else if( type = 5 ){
        title = "Progres Kecamatan Editing Coding";
        title_column2 = "Progres"
        title_column1 = "Kecamatan"
    }else if( type = 6 ){
        title = "Progres Kecamatan Entri Data";
        title_column2 = "Progres"
        title_column1 = "Kecamatan"
    }

    data.map((item,index) => {
        return (
            <div key={index} className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6">
                <div className="text-left ml-1 truncate">{item.firstName + " " + item.lastName}</div>
                <div className="text-center">{item.TOTAL}</div>
            </div>
        )
    })

    const generateContent = () => {
        let ct = []
        if (kec){
            Object.keys(data).map((item,index) => {
                <div key={index} className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6">
                    <div className="text-left ml-1 truncate">{data[item]["nama_kec"]}</div>
                    <div className="text-center">{item.TOTAL}</div>
                </div>
            })
        }else{
            data.map((item,index) => {
                let nama = item.firstName + " " + item.lastName
                if (type != 1){
                    nama = item.nama
                }
                ct.push(
                    <div key={index} className="title grid grid-cols-2 text-xs mt-1 px-1 border-b border-sky-200 items-center min-h-6">
                        <div className="text-left ml-1 truncate">{nama}</div>
                        <div className="text-center">{item.TOTAL}</div>
                    </div>
                )
            })
        }

        return ct;
    }


    return(
        <div className="the-blur fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 font-poppins">
            <div className="container fixed z-50 flex justify-center items-center mt-40">
                <div className="box bg-white m-auto p-2 absolute top-0 rounded-lg">
                    <div className="x-button px-2 absolute right-3 cursor-pointer text-lg rounded-md font-bold bg-[#F5F4F4] hover:bg-red-500 hover:text-white" onClick={onClose}>x</div>
                    <div className="title mt-10">
                        <h2 className="text-center mb-4 font-medium">
                        {
                            title
                        }
                        </h2>
                    </div>

                    <div>
                        <div className="title grid grid-cols-2 p-1 text-sm  rounded-t-md">
                            <div className="text-center ">{title_column1}</div>
                            <div className="text-center ">{title_column2}</div>
                        </div>
                    </div>

                    <div className="the-data mb-8">
                        {
                            generateContent()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmCard;