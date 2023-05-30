// * -------------------------------- Route Doc -------------------------------- * //

// * --------------- GET GET GET


// * USER INFO
//* GET /user/info
/**
 * @swagger
 * /user/info:
 *   get:
 *     summary: get info user -> ketika klik profil bisa untuk tampilkan data user/ dapatkan informasi user untuk diedit
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: get info user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Get User Info
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
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
 *                     role:
 *                       type: string
 *                     telepon:
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
 *
 *
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
 *                   example: Get Info Failed
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





//* PATCH /user/info
/**
 * @swagger
 * /user/info:
 *   patch:
 *     summary: edit info user
 *     tags: [User]
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
 *                 required: true
 *                 description: nama minimal 4 karakter
 *               negara:
 *                 type: string
 *                 description: bagian dari alamat
 *               kota:
 *                 type: string
 *                 description: bagian dari alamat
 *               deskripsi_alamat:
 *                 type: string
 *                 description: bagian dari alamat
 *               telepon:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               jam_buka:
 *                 type: string
 *                 description: bagian dari waktu operasional *khusus role toko/vendor
 *               jam_tutup:
 *                 type: string
 *                 description: bagian dari waktu operasional *khusus role toko/vendor
 *               hari_buka_awal:
 *                 type: string
 *                 description: bagian dari waktu operasional *khusus role toko/vendor
 *               hari_buka_akhir:
 *                 type: string
 *                 description: bagian dari waktu operasional *khusus role toko/vendor
 *               file:
 *                 type: file
 *
 *     responses:
 *       '200':
 *         description: success edit info user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Edit Data User
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     name:
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
 *                     telepon:
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
 *                     gambar_profil:
 *                       type: string
 *
 *       '400':
 *         description: error upload pic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Edit Failed, Upload Pic Error!
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
 *                   example: Edit Info Failed, User Not Valid!
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





//* PATCH /user/password
/**
 * @swagger
 * /user/password:
 *   patch:
 *     summary: ubah password user dengan sudah login
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password_lama:
 *                 type: string
 *               password_baru:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Sukses ganti password user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: User Success Change Password
 *       '401':
 *         description: gagal autentikasi dan ganti password gagal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *       '500':
 *         description: internal error
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





//* GET /user/forget_password
/**
 * @swagger
 * /user/forget_password:
 *   post:
 *     summary: dapatkan token autentikasi untuk akses perubahan password lewat forget password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 example: username1@gmail.com
 *
 *     responses:
 *       '200':
 *         description: get new token for auth forget password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Send Token to Email
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                         id:
 *                           type: string
 *
 *       '401':
 *         description: auth email failed, failed get token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Failed Get Token, User Not Found!
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





//* PATCH /user/forget_password
/**
 * @swagger
 * /user/forget_password:
 *   patch:
 *     summary: ubah password dari forget password dengan token
 *     tags: [User]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                change_password_token:
 *                  type: string
 *                password:
 *                  type: string
 *
 *     responses:
 *       '200':
 *         description: user success set new password from forget password endpoint
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Change Password from Forget Password Feature
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                         id:
 *                           type: string
 *       '401':
 *         description: token not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
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
