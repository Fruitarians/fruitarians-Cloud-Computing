// * -------------------------------- Route Doc -------------------------------- * //

// *? CRUD BUAH TOKO DOC

// * GET detail buah dari toko yang akses
//* GET /user/toko/buah/{idbuah}
/**
 * @swagger
 * /user/toko/buah/{idBuah}:
 *   get:
 *     summary: get 1 detail buah data -> bisa digunakan ketika ingin edit info buah pada menu profil
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
 *       '401':
 *         description: not Authorized
 *       '500':
 *         description: internal server error
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
 *                       type: string
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
 *       '401':
 *         description: not Authorized
 *       '500':
 *         description: internal server error
 */






// * POST new data buah
// * POST /user/toko/buah
/**
 * @swagger
 * /user/toko/buah/:
 *   post:
 *     summary: add new buah data *khusus role toko
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
 *               name:
 *                 type: string
 *               harga:
 *                 type: integer
 *               satuan:
 *                 example: kg
 *               deskripsi:
 *                 type: string
 *               gambar:
 *                 type: string
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
 *                   example: success create new buah
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
 *                     deskripsi:
 *                       type: string
 *                     gambar:
 *                       type: string
 *       '401':
 *         description: not Authorized
 *       '500':
 *         description: internal server error
 */





// * PATCH edit data buah
// * PATCH /user/toko/buah
/**
 * @swagger
 * /user/toko/buah/:
 *   patch:
 *     summary: edit buah data *khusus role toko
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
 *               name:
 *                 type: string
 *               harga:
 *                 type: ineteger
 *               satuan:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               gambar:
 *                 type: string
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
 *                     deskripsi:
 *                       type: string
 *                     gambar:
 *                       type: string
 *
 *       '401':
 *         description: not Authorized
 *       '500':
 *         description: internal server error
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
 *                   example: success delete buah data
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
 *         description: not Authorized
 *       '500':
 *         description: internal server error
 */