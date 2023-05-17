// * ----------------------- DOKUMENTASI SWAGGER -----------------------------

// * ---- Swagger Schema

// * USER
/**
 * @swagger
 * components:
 *   schemas:
 *       User:
 *           type: object
 *           required:
 *               - email
 *               - password
 *               - name
 *               - role
 *               - createdAt
 *           description: Struktur dalam database penyimpanan data User
 *           properties:
 *               email:
 *                   type: string
 *                   description: email user untuk login
 *                   example: username@gmail.com
 *               password:
 *                   type: string
 *                   description: user password in hash mode
 *                   example: $2b$12$alQAnrk3uQoLbTm2Q02nV.vega4t4dC.UEEel7ibhP6ZthMZfikCq
 *               name:
 *                   type: string
 *                   description: user account name
 *                   example: joko susilo
 *               telepon:
 *                   type: integer
 *                   example: 85726568163
 *               alamat:
 *                   type: string
 *                   example: Purbalingga, Kec Kalimanah, RT01/RW10, Depan sate Blater
 *               createdAt:
 *                   type: string
 *                   example: 15 Mei 2023
 *               deskripsi:
 *                   type: string
 *                   example: Toko buah x punya spesialiasi pada macam buah mangga
 *               jam_operasional:
 *                   type: object
 *                   properties:
 *                       buka:
 *                           type: string
 *                           example: 08.00
 *                       tutup:
 *                           type: string
 *                           example: 23.00
 *               token:
 *                   type: object
 *                   description: token use for some auth things
 *                   properties:
 *                       auth:
 *                          type: string
 *                          description: auth token for auth confirmation
 *                          example: fe1b888bb3c1a10cc5a18d755311b717d3c896c5ce9778a933d3a7c2c63b9ba5
 *                       forgetPass:
 *                          type: string
 *                          description: auth token for forget password
 *                          example: n7a41838f75e8hd7k3djka6v
 *
 */




// * BUAH
/**
 * @swagger
 * components:
 *   schemas:
 *     Buah:
 *       type: object
 *       required:
 *         - name
 *         - harga
 *         - satuan
 *         - deskripsi
 *         - gambar
 *       description: Struktur data dari data Buah
 *       properties:
 *         name:
 *           type: string
 *         harga:
 *           type: integer
 *         satuan:
 *           type: string
 *         deskripsi:
 *           type: string
 *         gambar:
 *           type: string
 */





// * ---- Swagger Tags
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Proses autentikasi akun
 */

/**
 * @swagger
 * tags:
 *   name: Connection Check
 *   description: Endpoint to check Connecntion to server/ database
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Proses berhubungan dengan user -> lebih ke info data dan proses pada menu profil
 */

/**
 * @swagger
 * tags:
 *   name: Toko
 *   description: Proses tambahan dari user role toko -> lebih ke akses untuk menu profil dari user dengan role Toko dan tambahan yang bisa dilakukan role Toko (kayanya) pada menu profil
 */

/**
 * @swagger
 * tags:
 *   name: Toko / Vendor
 *   description: proses berhubungan bisa salah satu atau berkaitan dengan kedua role toko/ vendor (lebih ke proses misal user akses menu daftar toko / vendor)
 */