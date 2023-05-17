// * -------------------------------- Route Doc -------------------------------- * //

// * GET all toko/vendor data -> just role data tersebut
// *! code dan routing ada di bagian user
// * GET /user/{role}
/**
 * @swagger
 * /user/{role}:
 *   get:
 *     summary: get semua data detail pada 1 toko/vendor dan hanya detail toko/vendor -> bisa digunakan misal klik  data all toko/ vendor bisa gunakan ini untuk tampilan sebelum detail
 *     tags: [Toko / Vendor]
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
 *                 toko:
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
 *                       deskripsi:
 *                         type: string
 *                       jam_operasional:
 *                         type: string
 *       '401':
 *         description: not authorized
 *       '500':
 *         description: internal server error
 */



// * USER GET info detail -> misal user akses detail toko/ vendor
// *! code dan routing ada di bagian user
//* GET /user/info/{userid}
/**
 * @swagger
 * /user/{role}/{id}:
 *   get:
 *     summary: get spesific data for toko/ vendor role -> merupakan misal klik ketika ada data tampilan seluruh toko/vendor yang didapat dari /user/{role} -> ketika klik akan akan masuk ke info detail ini dimana hanya akan menerima param toko/ vendor dan ketika role toko akan tambahan data array buah
 *     tags: [Toko / Vendor]
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     alamat:
 *                       type: string
 *                     telepon:
 *                       type: string
 *                     jam_operasional:
 *                       type: string
 *                     wa_link:
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
 *                             type: string
 *                           satuan:
 *                             type: string
 *
 *
 *
 *       '404':
 *         description: id not valid
 *       '500':
 *         description: internal server error
 */





// * USER GET detail buah pada salah satu toko
// *! code dan routing ada di bagian user
// * GET /user/toko/{idToko}/{idBuah}
/**
 * @swagger
 * /user/toko/{idToko}/{idBuah}:
 *   get:
 *     summary: dari /user/toko/{idToko} misal user ingin lihat detail dari salah satu buah bisa ke endpoint ini diharapkannya
 *     tags: [Toko / Vendor]
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     idBuah:
 *                       type: string
 *                     nmae:
 *                       type: string
 *                     harga:
 *                       type: integer
 *                     satuan:
 *                       type: string
 *                     gambar:
 *                       type: string
 *                     deskripsi:
 *                       type: string
 *                     creator:
 *                       type: string
 *       '401':
 *         description: not authorized
 *       '500':
 *         description: internal server error
 *
 */