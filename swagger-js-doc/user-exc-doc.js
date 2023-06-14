// * -------------------------------- Route Doc -------------------------------- * //
/**
 * * -------------------- catatan --------------------
 * * merupakan routes untuk endpoint role USER untuk kemampuan khusus dari role USER
 * ? file routes ada di 'user.js'
 * ? file controller ada di 'userRoleController.js'
 * * ---------------------------
 */


// *! ------------------------------------ BOOKMARK ------------------------------------


// * GET semua data bookmark yang disimpan oleh satu user yang sudah login
// * GET /user/bookmark
/**
 * @swagger
 * /user/bookmark:
 *   get:
 *     summary: mendapatkan semua data bookmark dari satu user untuk ditampilkan dalam menu bookmark
 *     tags: [User Exc - Bookmark]
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
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get user bookmark data
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
 *                       alamat:
 *                         type: object
 *                         properties:
 *                           negara:
 *                             type: string
 *                           kota:
 *                             type: string
 *                           deskripsi_alamat:
 *                             type: string
 *                       deskripsi:
 *                         type: string
 *                       gambar_profil:
 *                         type: string
 *                       wa_link:
 *                         type: string
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
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Not Authorized Access
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





// * GET data user sudah bookmark(follow atau belum)
// * GET /user/bookmark/{bookmark_userId}
/**
 * @swagger
 * /user/bookmark/{bookmark_userId}:
 *   get:
 *     summary: check data user sudah dibookmark atau belum
 *     tags: [User Exc - Bookmark]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookmark_userId
 *         in: path
 *         description: ID yang akan dicek apakah user sudah bookmark(follow) atau belum
 *         required: true
 *
 *     responses:
 *       '200':
 *         description: Success get response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Bookmarked Data User Info
 *                 data:
 *                   type: object
 *                   properties:
 *                     bookmarked_userId:
 *                       type: string
 *                     bookmarked:
 *                       type: boolean
 *       '401':
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Not Authorized Access
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





// * POST satu data untuk dmasukan ke bookmark user array
// * POST /user/bookmark
/**
 * @swagger
 * /user/bookmark:
 *   post:
 *     summary: tambahkan data bookmark baru pada sebuah user
 *     tags: [User Exc - Bookmark]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookmark_userId:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Add Data to Bookmark
 *       '401':
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Not Authorized Access
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
 *
 */





// * DELETE satu data dari daftar bookmark user
// * DELETE /user/bookmark/{bookmark_userId}
/**
 * @swagger
 * /user/bookmark/{bookmark_userId}:
 *   delete:
 *     summary: hapus sebuah data bookmark yang sudah user simpan
 *     tags: [User Exc - Bookmark]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookmark_userId
 *         in: path
 *         description: ID User (yang sudah dibookmark) yang ingin dihapus
 *         required: true
 *
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Delete the Bookmarked Data
 *       '401':
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Not Authorized Access
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





// *! ------------------------------------ CARTS ------------------------------------


// * GET semua data carts user dari semua toko
// * GET /user/carts
/**
 * @swagger
 * /user/carts:
 *   get:
 *     summary: Mendapatkan semua data carts user dari semua toko
 *     tags: [User Exc - Carts]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Success Get Cart Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Get Cart Data
 *                 data:
 *                   type: object
 *                   properties:
 *                    total_data:
 *                      type: integer
 *                    carts:
 *                      type: array
 *                      items:
 *                       type: object
 *                       properties:
 *                        id_cart:
 *                          type: string
 *                        toko:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           telepon:
 *                             type: string
 *                           alamat:
 *                             type: object
 *                             properties:
 *                               negara:
 *                                 type: string
 *                               kota:
 *                                 type: string
 *                               deskripsi_alamat:
 *                                 type: string
 *                           deskripsi:
 *                             type: string
 *                           gambar_profil:
 *                             type: string
 *                           jam_operasional:
 *                             type: object
 *                             properties:
 *                               jam_buka:
 *                                 type: string
 *                               jam_tutup:
 *                                 type: string
 *                               hari_buka_awal:
 *                                 type: string
 *                               hari_buka_akhir:
 *                                 type: string
 *                        cart:
 *                         type: array
 *                         items:
 *                          type: object
 *                          properties:
 *                           id_buah:
 *                            type: string
 *                           name:
 *                            type: string
 *                           harga:
 *                            type: integer
 *                           satuan:
 *                            type: string
 *                           deskripsi:
 *                            type: string
 *                           gambar:
 *                            type: string
 *       '401':
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Not Authorized Access
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





// * POST satu ke carts user
// * POST /user/carts
/**
 * @swagger
 * /user/carts:
 *   post:
 *     summary: tambahkan carts pada sebuah user
 *     tags: [User Exc - Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_buah:
 *                 type: string
 *               id_toko:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success Add Buah to Cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Add Buah to Cart
 *       '401':
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Not Authorized Users
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Buah Data not Found in Toko
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
 *
 */





// * DELETE satu data dari daftar cart user
// * DELETE /user/carts/{id_carts}/{id_buah}
/**
 * @swagger
 * /user/carts/{id_cart}/{id_buah}:
 *   delete:
 *     summary: hapus sebuah data buah cart dari sebuah cart dari satu toko yang sudah user simpan
 *     tags: [User Exc - Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_cart
 *         in: path
 *         description: ID Cart dimana terdapat data buah yang ingin dihapus
 *         required: true
 *       - name: id_buah
 *         in: path
 *         description: ID Buah ingin dihapus
 *         required: true
 *
 *     responses:
 *       '200':
 *         description: Success Delete Buah data From Cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Delete Buah data From Cart
 *       '401':
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Not Authorized Users
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cart Data not Found
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





// * DELETE seluruh data carts DARI SATU TOKO
// * DELETE /user/carts/{id_carts}
/**
 * @swagger
 * /user/carts/{id_cart}:
 *   delete:
 *     summary: hapus semua data carts dari satu toko user simpan
 *     tags: [User Exc - Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_cart
 *         in: path
 *         description: ID Cart ingin dihapus
 *         required: true
 *
 *     responses:
 *       '200':
 *         description: Success Delete Cart Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Delete Cart Data
 *       '401':
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Not Authorized Users
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cart Data not Found
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