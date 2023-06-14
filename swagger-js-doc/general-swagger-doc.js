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
 *               - telepon
 *               - alamat
 *           description: Struktur dalam database penyimpanan data untuk role user
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
 *               role:
 *                   type: string
 *                   description: role untuk user
 *               telepon:
 *                   type: integer
 *                   example: 85726568163
 *               alamat:
 *                   type: object
 *                   properties:
 *                     negara:
 *                       type: string
 *                     kota:
 *                       type: string
 *                     deskripsi_alamat:
 *                       type: string
 *               gambar_profil:
 *                   type: string
 *                   value: null
 *                   deskripsi: nilai pada role USER akan selalu null dan tidak bisa mengedit atau mengubah foto ptofil
 *               createdAt:
 *                   type: object
 *               updatedAt:
 *                   type: object
 *               bookmark:
 *                   type: array
 *                   items:
 *                     idToko:
 *                     type: string
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






// * Vendor
/**
 * @swagger
 * components:
 *   schemas:
 *       Vendor:
 *           type: object
 *           required:
 *               - email
 *               - password
 *               - name
 *               - role
 *               - telepon
 *               - alamat
 *           description: Struktur dalam database penyimpanan data untuk role vendor
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
 *               role:
 *                   type: string
 *                   description: role untuk user
 *               telepon:
 *                   type: integer
 *                   example: 85726568163
 *               alamat:
 *                   type: object
 *                   properties:
 *                     negara:
 *                       type: string
 *                     kota:
 *                       type: string
 *                     deskripsi_alamat:
 *                       type: string
 *               gambar_profil:
 *                   type: string
 *                   deskripsi: link dari profil pengguna
 *               createdAt:
 *                   type: object
 *               updatedAt:
 *                   type: object
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






// * TOKO
/**
 * @swagger
 * components:
 *   schemas:
 *       Toko:
 *           type: object
 *           required:
 *               - email
 *               - password
 *               - name
 *               - role
 *               - telepon
 *               - alamat
 *           description: Struktur dalam database penyimpanan data untuk role toko
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
 *               role:
 *                   type: string
 *                   description: role untuk user
 *               telepon:
 *                   type: integer
 *                   example: 85726568163
 *               alamat:
 *                   type: object
 *                   properties:
 *                     negara:
 *                       type: string
 *                     kota:
 *                       type: string
 *                     deskripsi_alamat:
 *                       type: string
 *               gambar_profil:
 *                   type: string
 *                   deskripsi: link dari profil pengguna
 *               createdAt:
 *                   type: object
 *               updatedAt:
 *                   type: object
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
 *               buah:
 *                   type: array
 *                   items:
 *                     idBuah:
 *                     type: string
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
 *         - creator
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
 *         creator:
 *           type: string
 *         createdAt:
 *           type: object
 *         updatedAt:
 *           type: object
 *
 */









// * VENDOR SUBS
/**
 * @swagger
 * components:
 *   schemas:
 *     Vendor Subs:
 *       type: object
 *       required:
 *         - name
 *         - owner
 *         - telepon
 *         - alamat
 *         - category
 *         - schedule
 *         - deskripsi
 *         - creator
 *       description: Struktur data dari Vendor Subs
 *       properties:
 *         name:
 *           type: string
 *         owner:
 *           type: string
 *         telepon:
 *           type: string
 *         alamat:
 *           type: string
 *         category:
 *           type: string
 *         schedule:
 *           type: string
 *         deskripsi:
 *           type: string
 *         creator:
 *           type: string
 *         delivered:
 *           type: boolean
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 */








// * CARTS
/**
 * @swagger
 * components:
 *   schemas:
 *     Carts:
 *       type: object
 *       required:
 *         - id_toko
 *         - id_user
 *         - buah
 *       description: Struktur data dari Cart
 *       properties:
 *         id_toko:
 *           type: string
 *         id_user:
 *           type: string
 *         buah:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 */





// * ---- Swagger Tags
/**
 * @swagger
 * tags:
 *   name: Connection Check
 *   description: Endpoint to check Connection to server/ database || Bukan bagian dari endpoint untuk FE
 */

/**
 * @swagger
 * tags:
 *   name: Machine Learning
 *   description: Prediksi kesegaran buah (perhatikan pemilihan server di atas) menggunakan server/base url berbeda dari endpoint lainnya
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Proses autentikasi akun
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
 *   name: User Exc - Bookmark
 *   description: proses khusus untuk role user yang hanya bisa dilakukan oleh role user saja proses bookmark
 */

/**
 * @swagger
 * tags:
 *   name: User Exc - Carts
 *   description: proses khusus untuk role user yang hanya bisa dilakukan oleh role user saja proses carts
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
 *   name: Vendor
 *   description: Proses tambahan dari user role vendor
 */

/**
 * @swagger
 * tags:
 *   name: Toko / Vendor / Umum
 *   description: proses berhubungan bisa salah satu atau berkaitan dengan kedua role toko/ vendor (lebih ke proses misal user akses menu daftar toko / vendor)
 */

