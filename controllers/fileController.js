const { format } = require('util')
const { Storage } = require('@google-cloud/storage')
const processFile = require('../middleware/upload')
const statusCode = require('../util/response').httpStatus_keyValue

const storage = new Storage({ keyFilename: './cloud_storage_key.json' })
const bucket = storage.bucket('test-api-kepston')

exports.uploadFile = async (req, res, next) => {
    try {

        await processFile(req, res)

        if(!req.file){
            console.log('gada gambar')
        }

        // Create a new blob in the bucket and upload the file data.
        folderName = 'profil'
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