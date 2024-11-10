import useGetFiles from "../../react-logic/hooks/useGetFiles";
import "./index.css"

const CloudScreen = () => {
    const {files,setCurrentPath,currentPath,pathBack,isLoading} = useGetFiles();
    return (
        <>
            <div className="filesystem-page">
                <div className="filesystem-container">
                    {isLoading ?
                    <div className="filesystem-loading">Loading</div>
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
                        onClick={() => setCurrentPath(file.path.split("/")[0])}
                        key={index}>
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