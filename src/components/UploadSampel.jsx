import { useState } from "react";
import { useParams } from "react-router-dom"
import excel_png from '../img/excel.png'
import * as XLSX from 'xlsx';


const UploadSampel = () => {

    const { id } = useParams();

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

    const sendFile = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        formData.append('id_kegiatan', id);

        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }
            
            console.log('File uploaded successfully');

        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    }

    return (
        <>
            <div className="rounded-md p-2 mx-auto border-2 max-w-md">
                
                <div className="mx-auto w-fit mb-4 mt-2">
                    
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-[#418EC6] hover:bg-sky-400 text-white font-bold py-2 px-4 rounded  mr-4"
                    >   
                    {selectedFile ? (
                        <>
                            Reupload
                        </>
                    ) : (
                        <>
                            Upload
                        </>
                    )}
                        
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <button className="cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded" onClick={downloadFile}>Download template (xlsx)</button>
                </div>
                
                {selectedFile && (
                    <div className="mx-auto flex flex-col items-center">
                        <p className="text-center mb-1">{selectedFile.name} Uploaded</p>
                        <button className="cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded" onClick={sendFile}>Submit</button>
                    </div>
                )}

                
            </div>
        </>
    )
}

export default UploadSampel;