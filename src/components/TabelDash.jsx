import { useState,useEffect } from "react";

function ConfirmCard({ data, onClose, type}) {

    let title = "";
    let title_column1 = "";
    let title_column2 = "";

    if (type == 1 ){
        title = "Petugas Receiving Batching";
        title_column2 = "Dokumen"
        title_column1 = "Petugas"
    }else if( type == 2 ){
        title = "Petugas Editing Coding";
        title_column2 = "Dokumen"
        title_column1 = "Petugas"
    }else if( type == 3 ){
        title = "Petugas Entri";
        title_column2 = "Dokumen"
        title_column1 = "Petugas"
    }else if( type == 4 ){
        title = "Progres Per Kecamatan Receiving Batching";
        title_column2 = "Progres"
        title_column1 = "Kecamatan"
    }else if( type == 5 ){
        title = "Progres Per Kecamatan Editing Coding";
        title_column2 = "Progres"
        title_column1 = "Kecamatan"
    }else if( type == 6 ){
        title = "Progres Per Kecamatan Entri Data";
        title_column2 = "Progres"
        title_column1 = "Kecamatan"
    }

    const clicked = () => {
        console.log("Clicked");
    }


    const generateContent = () => {
        let ct = []
        if (type > 3){

            Object.keys(data).map((item,index) => {

                let progres = data[item]["progres_rb"];

                if (type === 5){
                    progres = data[item]["progres_edcod"];
                }else if (type === 6){
                    progres = data[item]["progres_entri"];
                }

                let isLow,isMed,isHigh = null;
                if (progres <= 35){
                    isLow = true
                } else if(progres <= 65){
                    isMed = true
                } else{
                    isHigh = true
                }
                
                ct.push(
                    <div key={index} className="title pl-1 grid grid-cols-2 text-xs mt-1 border-b border-sky-200 items-center min-h-6 ">
                        <div className="text-left pl-2">{data[item]["nama_kec"]}</div>
                        <div className={`text-center font-medium ${isLow ? ('text-[#EC5F4C]') : ('')} ${isMed ? ('text-[#418EC6]') : ('')} ${isHigh ? ('text-[#14CB11]') : ('')}`}>{progres.toFixed(2)} %</div>
                    </div>
                )
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
                <div className="box bg-white min-w-72 m-auto p-2 absolute top-0 rounded-lg">
                    <div className="x-button px-2 absolute right-3 cursor-pointer text-lg rounded-md font-bold bg-[#F5F4F4] hover:bg-red-500 hover:text-white transition-all duration-300" onClick={onClose}>x</div>
                    <div className="title mt-10">
                        <h2 className="text-center mb-4 font-medium max-w-64 mx-auto">
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

                    <div className="the-data mb-8 max-h-52 overflow-y-auto">
                        {
                            generateContent()
                        }
                    </div>
                    <div className=" text-center flex items-center justify-center">
                        <div className="w-fit bg-red-500 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-red-400 hover:text-white transition-all duration-300" onClick={onClose}>
                            Close
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmCard;