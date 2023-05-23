const statusCode = require('../util/response').httpStatus_keyValue


exports.getBerita = async (req, res, next) => {
    try{

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}