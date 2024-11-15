const {Storage} = require('@google-cloud/storage');

const getFile = async (req,res) => {
    try{
        console.log("test")
        const {file_id} = req.body;
        console.log(file_id)
        const storage = new Storage({keyFilename: './google_cloud/controllers/graphrag.json'});
        const bucket = storage.bucket('primarie');
        const file = bucket.file(file_id);

        let fileName = file.name.split("/").pop();
        res.writeHead(200, {
         'Content-Disposition': `attachment;filename=${fileName}`,
        });
        await file.createReadStream().pipe(res)
    }catch(err){
        res.status(400).json(err.message)
    }
}

const getFiles = async (req,res) => {
    console.log("files fetch")
    const storage = new Storage({keyFilename: './google_cloud/controllers/graphrag.json'});
    const bucket = storage.bucket('primarie');
    const files = await bucket.getFiles();
    try{
        const {path} = req.query;
        const page = req.query.page || 1;
        const files_per_page = 10;
        const last_file = page * files_per_page;
        const first_file = last_file - files_per_page;
        let return_files = []
        if(path){
            for(const file of files[0].slice(first_file,last_file)){
                const file_path = file.name;
                if(file_path.includes("vectorized_chunks")){
                    continue
                }
                if(file_path.includes(path)){
                    const temp = file.name.replace(`${path}/`,"")
                    const final = temp.split("/")
                    if(final.length == 1){
                        return_files.push({
                            path:final[0],
                            full_path:file.name,
                            type:"file",
                        })
                    }else{
                        return_files.push({
                            path:final[0],
                            full_path:file.name,
                            type:"folder",
                        })
                    }
                }
            }
        }else{
            for(const file of files[0].slice(first_file,last_file)){
                if(file.name.includes("vectorized_chunks")){
                    continue
                }
                let exists = false;
                if(return_files.length > 0){
                    exists = return_files.some((existing_file) => existing_file.path.includes(file.name.split("/")[0]))
                }
                if(!exists){
                    const temp = file.name.split("/")
                    if(temp.length == 1){
                        return_files.push({
                            path:temp[0],
                            type:"file",
                            full_path:file.name,
                        })
                    }else{
                        return_files.push({
                            path:temp[0],
                            type:"folder",
                            full_path:file.name,
                        })
                    }
                }
            }
        }
        res.status(200).json({files:return_files,total_files:files[0].length})
    }catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
}

module.exports =  {getFiles,getFile}