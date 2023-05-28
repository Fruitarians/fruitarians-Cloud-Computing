// * -------------------------------- Route Doc -------------------------------- * //

// *? CRUD BUAH TOKO DOC

// * GET detail buah dari toko yang akses
//* GET /user/toko/buah/{idbuah}
/**
 * @swagger
 * /user/toko/buah/{idBuah}:
 *   get:
 *     summary: get detail 1 data untuk Buah -> bisa digunakan ketika ingin edit info buah pada menu profil
 *     tags: [Toko]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idBuah
 *         in: path
 *         required: true
 *         description: id buah yang ingin dilihat
 *         schema:
 *           type: string
 *
 *     responses:
 *       '200':
 *         description: success get 1 data buah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 toko:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     telepon:
 *                       type: string
 *                     wa_link:
 *                       type: string
 *                     alamat:
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
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     harga:
 *                       type: integer
 *                     deskripsi:
 *                       type: string
 *                     gambar:
 *                       type: string
 *                     satuan:
 *                       type: string
 *                     stok:
 *                       type: integer
 *       '401':
 *         description: Not Authorized User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Not Authorized User
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





// * GET ALL buah data -> bisa pagination
//* GET /user/toko/buah
/**
 * @swagger
 * /user/toko/buah/:
 *   get:
 *     summary: get all data buah -> bisa digunakan ketika ingin edit info buah pada menu profil ketika klik info jualan/ barang diprofil role toko
 *     tags: [Toko]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: akan tampilkan halaman data ke berapa, kosong/default akan tampilkan halaman 1
 *       - name: size
 *         in: query
 *         description: dalam satu halaman akan ada berapa data, default/kosong akan tampilkan 3 data
 *
 *
 *     responses:
 *       '200':
 *         description: get user and buah data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 toko:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     telepon:
 *                       type: string
 *                     wa_link:
 *                       type: string
 *                     alamat:
 *                       type: object
 *                       properties:
 *                         negara:
 *                           type: string
 *                         kota:
 *                           type: string
 *                         deskripsi_alamat:
 *                           type: string
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
 *                 totalBuah:
 *                   type: integer
 *                 buah:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       harga:
 *                         type: integer
 *                       deskripsi:
 *                         type: string
 *                       gambar:
 *                         type: string
 *                       satuan:
 *                         type: string
 *                       stok:
 *                         type: integer
 *       '401':
 *         description: Not Authorized User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Not Authorized User
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






// * POST new data buah
// * POST /user/toko/buah
/**
 * @swagger
 * /user/toko/buah/:
 *   post:
 *     summary: add new buah data (verif minimal input dilakukan di FE ya(?)) *khusus role toko
 *     tags: [Toko]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               harga:
 *                 type: integer
 *               satuan:
 *                 type: string
 *                 example: kg
 *               deskripsi:
 *                 type: string
 *               stok:
 *                 type: ineteger
 *               file:
 *                 type: file
 *
 *     responses:
 *       '201':
 *         description: success created new data buah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Create New Buah
 *                 picture:
 *                   type: object
 *                   properties:
 *                     with_picture:
 *                       type: boolean
 *                     success_upload:
 *                       type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     creator:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         toko:
 *                           type: string
 *                     nama:
 *                       type: string
 *                     harga:
 *                       type: integer
 *                     satuan:
 *                       type: string
 *                     stok:
 *                       type: integer
 *                     deskripsi:
 *                       type: string
 *                     gambar:
 *                       type: string
 *       '401':
 *         description: Not Authorized User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Not Authorized User
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





// * PATCH edit data buah
// * PATCH /user/toko/buah
/**
 * @swagger
 * /user/toko/buah/:
 *   patch:
 *     summary: edit buah data *khusus role toko (verif minimal input dilakukan di FE ya(?))
 *     tags: [Toko]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               buahId:
 *                 type: string
 *               name:
 *                 type: string
 *               harga:
 *                 type: integer
 *               satuan:
 *                 type: string
 *                 example: kg
 *               stok:
 *                 type: integer
 *               deskripsi:
 *                 type: string
 *               file:
 *                 type: file
 *
 *     responses:
 *       '200':
 *         description: success edit data buah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 picture:
 *                   type: object
 *                   properties:
 *                     new_picture:
 *                       type: boolean
 *                     success_upload:
 *                       type: boolean
 *                 new_buah_data:
 *                   type: object
 *                   properties:
 *                     creator:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: string
 *                         toko:
 *                           type: string
 *                     name:
 *                       type: string
 *                     harga:
 *                       type: number
 *                     satuan:
 *                       type: string
 *                     stok:
 *                       type: integer
 *                     deskripsi:
 *                       type: string
 *                     gambar:
 *                       type: string
 *
 *       '401':
 *         description: Not Authorized User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Not Authorized User
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




// * DELETE data buah
// * DELETE /user/toko/buah
/**
 * @swagger
 * /user/toko/buah/:
 *   delete:
 *     summary: delete data buah *khusus role toko
 *     tags: [Toko]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buahId:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: success delete buah data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Delete Buah Data
 *                 picture:
 *                   type: object
 *                   properties:
 *                     has_picture:
 *                       type: boolean
 *                     success_delete_picture:
 *                       type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           harga:
 *                             type: integer
 *                           satuan:
 *                             type: string
 *                           deskripsi:
 *                             type: string
 *                           gambar:
 *                             type: string
 *
 *       '401':
 *         description: Not Authorized User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Not Authorized User
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