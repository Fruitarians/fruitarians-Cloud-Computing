const { format } = require('util')
const { Storage } = require('@google-cloud/storage')
const processFile = require('../middleware/upload')
const statusCode = require('../util/response').httpStatus_keyValue

const storage = new Storage({ keyFilename: './cloud_storage_key.json' })
const bucket = storage.bucket('test-api-kepston')

const crypto = require('crypto')


exports.uploadFile = async (req, res, next) => {
    try {

        // * lihat REQ role masuk mana untuk edit foto
        const folderName = req.editData.role
        const roleUserId = req.editData.userId
        let path_name = folderName + '/' + roleUserId + '/'
        //let filename = roleUserId + '.png' //filename = filename.replace(/[^.]+/, roleUserId);
        let filename = crypto.randomBytes(4).toString('hex') + '.png'

        let uploadPath = path_name + filename

        // *? jika diupload adalah gambar dari buah
        if(req.editData.idBuah) {
            //filename = req.editData.idBuah + '.png'
            uploadPath = path_name + 'buah/' + filename

            path_name = path_name + 'buah/'
        }

        console.log(req.editData.replace)
        //* ketika ada gambar maka delete dahulu
        if(req.editData.replace){
            const del_pic = req.editData.photo_url.split('/')
            const name_pic = del_pic[del_pic.length - 1]
            let delete_path = path_name + name_pic

            await bucket.file(delete_path).delete()
        }

        // *? Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(uploadPath);

        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on("error", (err) => {
            //res.status(500).send({ message: err.message });
            throw err
        });

        let publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        blobStream.on("finish", async (data) => {
            // * Create URL for directly file access via HTTP.
            publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
        });

        blobStream.end(req.file.buffer);

        return publicUrl

    } catch (e) {
        return false
    }
}





exports.deleteItem = async (req, res, next) => {
    try{

        const folderName = req.editData.role
        const roleUserId = req.editData.userId
        let filename = roleUserId + '.png' //filename = filename.replace(/[^.]+/, roleUserId);

        let uploadPath = folderName + '/' + roleUserId + '/' + filename
        // *? jika diupload adalah gambar dari buah
        if(req.editData.idBuah) {
            filename = req.editData.idBuah + '.png'
            uploadPath = folderName + '/' + roleUserId + '/buah/' + filename
        }

        await bucket.file(uploadPath).delete()

        return true

    } catch (e) {
        return false
    }
}





//*! --------- VERSI ORI DARI UPLOAD FILE ---------
exports.uploadFileOri = async (req, res, next) => {
    try {
        console.log(req.body)
        await processFile(req, res)

        // lihat REQ role masuk mana untuk edit foto profil
        const folderName = req.body.role
        console.log(req.body)

        if(!req.file){
            return res.status(200).send({
                message: ''
            });
        }

        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(folderName + '/' + req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on("error", (err) => {
            res.status(500).send({ message: err.message });
        });

        blobStream.on("finish", async (data) => {
            // Create URL for directly file access via HTTP.
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );

            try {
                // Make the file public
                await bucket.file(req.file.originalname).makePublic();
            } catch {
                return res.status(200).send({
                    message:
                        `Uploaded the file successfully: ${req.file.originalname}`,
                    url: publicUrl,
                });
            }

            res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
                url: publicUrl,
            });
        });

        blobStream.end(req.file.buffer);

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.readFile = async (req, res, next) => {
    try {
        const [files] = await bucket.getFiles()
        let fileInfos = []

        files.forEach(file => {
            fileInfos.push({
                name: file.name,
                url: file.metadata.mediaLink,
                url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            })
        })

        res.status(statusCode['200_ok']).json(fileInfos)

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.donwloadFile = async (req, res, next) => {
    try{

        const [metaData] = await bucket.file(req.params.name).getMetadata();
        res.redirect(metaData.mediaLink);

    } catch(e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}