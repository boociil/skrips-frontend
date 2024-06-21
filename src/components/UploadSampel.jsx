import { useState, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Alert from "../components/Alert"
import FileUploadIcon from '@mui/icons-material/DriveFolderUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import excelIcon from "../img/excel.png"
import CloseIcon from '@mui/icons-material/Close';
import Loading from "../components/Loading";

const UploadSampel = () => {

    const { id } = useParams();
    const [ loading,setLoading ] = useState(false);
    const uploadedFileRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [ isValidated, setIsValidated ] = useState(false);
    const [msg, setMsg] = useState();
    const [submsg, setSubMsg] = useState();
    const [dragging, setDragging] = useState(false);
    const [ eks, setEks ] = useState(null);
    const bottomRef = useRef(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const scrollToBottom = () => {
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setEks(file.name.split('.').pop())
        setSelectedFile(file);
        scrollToBottom();        
    };

    const validate = () => {
        const fileName = selectedFile.name;
        const fileExtension = fileName.split('.').pop();
        const bytes = selectedFile.size
        const megabytes = bytes / (1024 * 1024);

        if(fileExtension !== "xlsx"){
            setMsg('Ekstensi File Tidak Sesuai!');
            setSubMsg('Ekstensi file yang diperbolehkan hanyalah .xlsx');
            return false;
        } 

        if (megabytes > 25){
            setMsg('Ukuran File Tidak Sesuai!');
            setSubMsg('Ukuran file yang diperbolehkan hanyalah tidak boleh lebih dari 25MB');
            return false;
        }

        return true;
    }

    const downloadFile = async () => {
        const fileUrl = backendUrl + 'files/template_sampel.xlsx';
    
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
        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('id_kegiatan', id);

        if(validate()){
            try {
                const response = await fetch(backendUrl + 'upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    setMsg('Upload Gagal!');
                    setSubMsg('Pastikan file telah sesuai dengan template dan tidak ada missing data');
                    setIsValidated(true);
                }
                
                // Toast Success
                toast.success("Upload Berhasil", {
                    position: "bottom-right",
                    hideProgressBar: true,
                    autoClose: 1000,
                    closeOnClick: true,
                    theme: "light",
                    transition: Bounce,
                    pauseOnHover: false,
                })

                navigate("/Rekap")

            } catch (error) {
                toast.error(error, {
                    position: "bottom-right",
                    hideProgressBar: true,
                    autoClose: 1000,
                    closeOnClick: true,
                    theme: "light",
                    transition: Bounce,
                    pauseOnHover: false,
                });
            }
        }else{
            setIsValidated(true);
        }
        setLoading(false);
    }

    
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        setDragging(false);
    };  

    const clearSelectedFile = () => {
        setSelectedFile(null);
        setEks(null);
    }

    const byteToMB = (bytes) => {
        if (bytes === 0) return '0';
        const megabytes = bytes / (1024 * 1024);
        return `${megabytes.toFixed(2)}`;
    }

    return (
        <>
            <div className="rounded-md p-2 mx-auto max-w-full">
                <Alert open={isValidated} setOpen={setIsValidated} isConfirm={false} msg={msg} subMsg={submsg}/>

                <label 
                    htmlFor='file-upload'
                    className={`border-2 flex flex-col justify-center items-center group border-slate-300 ${
                        dragging ? 'border-sky-400 bg-sky-100' : ( !selectedFile ? ' h-24 sm:h-48  cursor-pointer' : 'h-20 sm:h-24')
                      } w-full  rounded-lg border-dashed hover:bg-sky-100 hover:border-sky-400`}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    
                    <>
                        <div className="for-icon">
                            <FileUploadIcon style={{ fontSize:"40" }} className={`text-slate-500 group-hover:text-sky-500 ${dragging && ("text-sky-500")}`}/>
                        </div>
                        
                        <div className="for-small-phone sm:hidden">
                            Upload File
                        </div>

                        <div className="ml-1 hidden sm:block">
                            {
                                dragging ? (
                                    <div className="animate-pulse">
                                        Jatuhkan File
                                    </div>
                                ) : (
                                    <>
                                        Seret File Ke Sini atau Pilih File dengan Klik <span className="underline">Di Sini.</span>
                                    </>
                                )
                            }
                        </div>
                    </>
                    
                </label>

                <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                <div className="w-full mb-10 rounded-lg block sm:relative mt-2">
                    <div className="sm:absolute sm:left-0 sm:top-0 text-slate-500 rounded-l-lg">
                        Ekstensi yang didukung : XLSX
                    </div>
                    <div className="sm:absolute sm:right-0 sm:top-0 text-slate-500 rounded-r-lg">
                        Ukuran Maksimal : 25MB
                    </div>
                </div>


                {selectedFile && (
                    <div className="mb-8">
                        <div className="block text-center font-semibold mb-3">
                            File yang diupload :
                        </div>
                        
                        <div className="flex items-center justify-center " id="the-uploaded-file" ref={uploadedFileRef}>
                            
                            <div className="bg-slate-200  w-fit py-1 px-2 rounded-md flex items-center">
                                
                                <div className="inline-block">
                                    <InsertDriveFileIcon className="text-slate-500 mr-2 text-sm"/>
                                </div>
                                
                                <div className="inline-block">
                                    <div>
                                        {selectedFile.name} 
                                    </div>
                                    <div className="text-slate-500">
                                        {byteToMB(selectedFile.size)} MB 
                                    </div>
                                </div>
                                <div className="inline-block ml-4 rounded-full px-1 cursor-pointer hover:text-red-500" onClick={clearSelectedFile}> <CloseIcon/> </div>
                            </div>
                            <div className="button-submit w-fit ml-4 bg-sky-500 p-2 rounded-md text-white font-semibold cursor-pointer hover:bg-sky-400" onClick={sendFile}>
                                { loading ? (<Loading/>) : ('Submit')}
                            </div>
                        </div>

                        
                    </div>
                )}

                <div className="w-full flex justify-center items-center">
                    
                    <div className="download-section flex items-center w-full md:w-1/2 bg-slate-100 px-3 py-4 rounded-lg">
                        <div className="inline-block">
                            <div className="flex items-center">
                                <div className="img inline-block mr-2">
                                    <img src={excelIcon} alt="" className="w-8 h-7" />
                                </div>
                                <div className="inline-block text-lg font-semibold  ">
                                    Template Sampel
                                </div>
                            </div>
                            <div className="Desc mt-2">
                                <p className="text-slate-500 text-">
                                    Anda bisa mendwonload file template sampel ini, lalu menyesuaikan dengan sampel yang ada.
                                </p>
                            </div>
                        </div>
                        <div className="inline-block bg-white ml-4 p-2 rounded-md border-slate-300 border-2 font-semibold cursor-pointer hover:bg-slate-50" onClick={downloadFile}>
                            Download
                        </div>
                    </div>

                </div>
                
            </div>
            <div ref={bottomRef}></div>
        </>
    )
}

export default UploadSampel;