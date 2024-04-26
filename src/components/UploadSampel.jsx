import { useState } from "react";
import excel_png from '../img/excel.png'

const UploadSampel = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const downloadFile = async () => {
        const fileUrl = 'http://localhost:3001/files/template_sampel.xlsx';
    
        try {
          const response = await fetch(fileUrl);
          const blob = await response.blob();
    
          // Membuat anchor element untuk mengunduh file
          const a = document.createElement('a');
          a.href = window.URL.createObjectURL(blob);
          a.download = 'template_sampel.xlsx';
          document.body.appendChild(a);
          a.click();
    
          // Membersihkan URL object setelah pengunduhan
          window.URL.revokeObjectURL(a.href);
          document.body.removeChild(a);
        } catch (error) {
          console.error('Error downloading file:', error);
        }
      };

    return (
        <>
            <div className="rounded-md p-2 mx-auto border-2 max-w-md">
                
                <div className="mx-auto w-fit mb-4 mt-2">
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-[#418EC6] hover:bg-sky-400 text-white font-bold py-2 px-4 rounded"
                    >
                        Upload
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                
                {selectedFile && (
                    <div>
                    <p>Nama file: {selectedFile.name}</p>
                    <p>Tipe file: {selectedFile.type}</p>
                    <p>Ukuran file: {selectedFile.size} bytes</p>
                    </div>
                )}

                <hr className="mb-4"/>


                <div className="title mx-auto w-fit mb-4">Download Template Sampel</div>
                <div className="tempat-logo mx-auto mb-4 flex">
                    <div className="logo-excel w-11 h-10 cursor-pointer mx-auto" onClick={downloadFile}>
                        <img src={excel_png} alt="excel" className="object-cover w-full h-full"/>

                    </div>
                    {/* Tambahkan logo lain disini */}
                </div>
            </div>
        </>
    )
}

export default UploadSampel;