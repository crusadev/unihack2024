import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGetFiles from "../../react-logic/hooks/useGetFiles";
import "./index.css"
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import useDownloadFile from "../../react-logic/hooks/useDownloadFile";

const CloudScreen = () => {
    const {files,setCurrentPath,currentPath,pathBack,isLoading} = useGetFiles();
    const {handleDownload} = useDownloadFile()
    return (
        <>
            <div className="filesystem-page">
                <div className="filesystem-container">
                    <div className="file-container file-headers">Google Cloud | {currentPath ? currentPath : "root"}</div>
                    {isLoading ?
                    <div className="filesystem-loading file-container">Loading...</div>
                    :
                    <>
                    {currentPath != "" &&
                    <div
                    className="file-container"
                    onClick={() => pathBack()}>
                    ...
                    </div>}
                    {files.map((file,index) => (
                        <div
                        className="file-container"
                        onClick={() => {
                            if(file.type == "folder"){
                                setCurrentPath(file.path.split("/")[0])
                            }else{
                                handleDownload(file.full_path,file.path)
                            }        
                        }}
                        key={index}>
                            {file.type == "folder" && <FontAwesomeIcon icon={faFolder} className="file-icon"/>}
                            {file.type == "file" && <FontAwesomeIcon icon={faFile} className="file-icon"/>}
                            {file.path}
                        </div>
                    ))}
                    </>
                    }
                </div>
            </div>
        </>
    )
}

export default CloudScreen;