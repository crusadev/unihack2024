import {useEffect,useState} from "react"
import axios from "axios"

const useGetFiles = () => {
    const [files,setFiles] = useState(null);
    const [currentPath,setCurrentPath] = useState("");
    const [isLoading,setIsLoading] = useState(true);
    console.log(files)
    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/files?path=${currentPath}`);
            setFiles(result.data.files)
            setIsLoading(false)
        })()
    },[currentPath])

    const pathBack = () => {
        const temp_path = currentPath.split("/")
        temp_path.pop()
        setCurrentPath(temp_path.join("/"))
        console.log(currentPath)
    }
    return {files,setCurrentPath,currentPath,pathBack,isLoading}
}

export default useGetFiles;