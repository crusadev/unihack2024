import axios from "axios"

const useSendFiles = () => {
    const sendFiles = async (send_files) => {
        const files = new FormData();
        for(const file of send_files){
            files.append('files',file)
        }
            const result = await axios.post(`${process.env.REACT_APP_AI_URL}/upload_files`,files,{
                headers:{
                    "Content-type":"multipart/form-data"
                }
            })
            console.log(result.data)
    }
    return {sendFiles}
}
export default useSendFiles;