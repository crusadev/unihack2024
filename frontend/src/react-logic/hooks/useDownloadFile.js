import axios from "axios";

const useDownloadFile = () => {
    const handleDownload = (id,name) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/files/get_file`,{
            file_id:id
        },{
            responseType:"blob"
        })
        .then((res) => {
            const blob = new Blob([res.data]);
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${name}`;
            link.click();
            window.URL.revokeObjectURL(link.href);
        })
    }
    return {handleDownload};
}

export default useDownloadFile;
