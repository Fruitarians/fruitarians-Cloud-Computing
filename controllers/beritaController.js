const statusCode = require('../util/response').httpStatus_keyValue


exports.getBerita = async (req, res, next) => {
    try {
        // Mendapatkan judul, konten, tanggal, dan URL dari database atau sumber data lainnya
        const judul = 'Judul Artikel';
        const konten = 'Konten artikel';
        const tanggal = '2023-05-24';
        const url = 'https://www.example.com/artikel-kesehatan-buah';
    
        // Membuat objek berita
        const berita = {
          judul,
          konten,
          tanggal,
          url,
        };

        // Mengirim respon dengan data berita
        res.status(statusCode['200_ok']).json(berita);

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}