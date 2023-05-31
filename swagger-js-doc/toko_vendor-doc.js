// * -------------------------------- Route Doc -------------------------------- * //

// *! GET all toko/vendor data -> just role data tersebut
// *! code dan routing ada di bagian "user.js" dan "userController.js"
// * GET /user/{role}
/**
 * @swagger
 * /user/{role}:
 *   get:
 *     summary: get semua data detail pada 1 toko/vendor dan hanya detail toko/vendor -> bisa digunakan misal klik  data all toko/ vendor bisa gunakan ini untuk tampilan sebelum detail
 *     tags: [Toko / Vendor / Umum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: role
 *         in: path
 *         required: true
 *         description: role yang akan di GET -> toko/ vendor
 *         schema:
 *           type: string
 *
 *       - name: page
 *         in: query
 *         description: tampilkan halaman ke berapa pada data role yang ditampilkan dan akan tampilkan halaman pertama jika tidak diisi
 *       - name: size
 *         in: query
 *         description: berapa data ditampilkan dalam 1 halaman, ketika kosong akan set default tampilkan 3 data tiap halaman
 *       - name: card
 *         in: query
 *         description: isi nilai dengan true untuk dapatkan 1 data cards random
 *
 *     responses:
 *       '200':
 *         description: success get data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Role Data User
 *                 totalData:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       telepon:
 *                         type: string
 *                       wa_link:
 *                         type: string
 *                       gambar_profil:
 *                         type: string
 *                       deskripsi:
 *                         type: string
 *                       alamat:
 *                         type: object
 *                         properties:
 *                           negara:
 *                             type: string
 *                           kota:
 *                             type: string
 *                           deskripsi_alamat:
 *                             type: string
 *                       bergabung:
 *                         type: string
 *                       jam_operasional:
 *                         type: object
 *                         properties:
 *                           jam_buka:
 *                             type: string
 *                           jam_tutup:
 *                             type: string
 *                           hari_buka_awal:
 *                             type: string
 *                           hari_buka_akhir:
 *                             type: string
 *       '401':
 *         description: not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Parameter Path Value Must Be toko/vendor
 *       '500':
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 */






// * USER GET info detail -> misal user akses detail toko/ vendor
// *! code dan routing ada di bagian "user.js" dan "userController.js"
//* GET /user/info/{userid}
/**
 * @swagger
 * /user/{role}/{id}:
 *   get:
 *     summary: get spesific data for toko/ vendor role -> merupakan misal klik ketika ada data tampilan seluruh toko/vendor yang didapat dari /user/{role} -> ketika klik akan akan masuk ke info detail ini dimana hanya akan menerima param toko/ vendor dan ketika role toko akan tambahan data array buah
 *     tags: [Toko / Vendor / Umum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: role
 *         in: path
 *         required: true
 *         description: role dengan nilai toko/ vendor, jika pakai id role user akan gagal
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: id toko/ vendor disesuaikan dengan data di atas, jika pakai id role user akan gagal
 *         schema:
 *           type: string
 *
 *       - name: page
 *         in: query
 *         description: tampilkan halaman ke berapa khusus untuk role toko untuk tampilkan data buah jika kosong akan ditampilkan halaman pertama
 *       - name: size
 *         in: query
 *         description: berapa data ditampilkan dalam 1 halaman, ketika kosong akan set default tampilkan 3 data tiap halaman
 *
 *
 *     responses:
 *       '200':
 *         description: get data success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Detail User Info
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     alamat:
 *                         type: object
 *                         properties:
 *                           negara:
 *                             type: string
 *                           kota:
 *                             type: string
 *                           deskripsi_alamat:
 *                             type: string
 *                     telepon:
 *                       type: string
 *                     jam_operasional:
 *                       type: object
 *                       properties:
 *                         jam_buka:
 *                           type: string
 *                         jam_tutup:
 *                           type: string
 *                         hari_buka_awal:
 *                           type: string
 *                         hari_buka_akhir:
 *                           type: string
 *                     wa_link:
 *                       type: string
 *                     bergabung:
 *                       type: string
 *                     gambar_profil:
 *                       type: string
 *                     buah:
 *                       description: jika role merupakan pedagang akan ada tambahan response data buah
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           harga:
 *                             type: integer
 *                           stok:
 *                             type: integer
 *                           satuan:
 *                             type: string
 *                           gambar:
 *                             type: string
 *
 *
 *
 *       '404':
 *         description: id not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Error Get Data User!
 *       '500':
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 */





// * USER GET detail buah pada salah satu toko
// *! code dan routing ada di bagian "user.js" dan "userController.js"
// * GET /user/toko/{idToko}/{idBuah}
/**
 * @swagger
 * /user/toko/{idToko}/{idBuah}:
 *   get:
 *     summary: dari /user/toko/{idToko} misal user ingin lihat detail dari salah satu buah bisa ke endpoint ini diharapkannya
 *     tags: [Toko / Vendor / Umum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idToko
 *         in: path
 *         required: true
 *         description: idToko dari halaman toko mana sebelumnya
 *         schema:
 *           type: string
 *       - name: idBuah
 *         in: path
 *         required: true
 *         description: idBuah dari idToko yang dimasukan, jika tidak sama maka gagal
 *         schema:
 *           type: string
 *
 *     responses:
 *       '200':
 *         description: success get buah data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Detail Buah Data
 *                 toko:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     telepon:
 *                       type: string
 *                     alamat:
 *                         type: object
 *                         properties:
 *                           negara:
 *                             type: string
 *                           kota:
 *                             type: string
 *                           deskripsi_alamat:
 *                             type: string
 *                     wa_link:
 *                       type: string
 *                     deskripsi:
 *                       type: string
 *                     jam_operasional:
 *                       type: object
 *                       properties:
 *                         jam_buka:
 *                           type: string
 *                         jam_tutup:
 *                           type: string
 *                         hari_buka_awal:
 *                           type: string
 *                         hari_buka_akhir:
 *                           type: string
 *                     bergabung:
 *                       type: string
 *                     gambar_profil:
 *                       type: string
 *                 buah:
 *                   type: object
 *                   properties:
 *                     idBuah:
 *                       type: string
 *                     name:
 *                       type: string
 *                     harga:
 *                       type: integer
 *                     satuan:
 *                       type: string
 *                     stok:
 *                       type: integer
 *                     gambar:
 *                       type: string
 *                     deskripsi:
 *                       type: string
 *                     creator:
 *                       type: string
 *       '401':
 *         description: User Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Not Authorized
 *       '500':
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 */





// * GET semua data buah yang ada dari semua toko
// *! code dan routing ada di bagian "buah.js" dan "buahController.js"
// * GET /buah/
/**
 * @swagger
 * /buah/:
 *   get:
 *     summary: ambil semua data buah dari semua toko dengan gunakan pagination
 *     tags: [Toko / Vendor / Umum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: tampilkan halaman ke berapa pada data role yang ditampilkan dan akan tampilkan halaman pertama jika tidak diisi
 *       - name: size
 *         in: query
 *         description: berapa data ditampilkan dalam 1 halaman, ketika kosong akan set default tampilkan 3 data tiap halaman
 *
 *     responses:
 *       '200':
 *         description: success get data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Buah Data
 *                 totalData:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idBuah:
 *                         type: string
 *                       name:
 *                         type: string
 *                       harga:
 *                         type: integer
 *                       stok:
 *                         type: integer
 *                       gambar:
 *                         type: string
 *                       creator:
 *                         type: string
 *       '401':
 *         description: User Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Not Authorized
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 */