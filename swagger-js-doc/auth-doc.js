// * -------------------------------- Route Doc -------------------------------- * //




// * --------------- POST POST POST

// * /auth/login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user dengan email dan password akan return access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: username1@gmail.com
 *               password:
 *                 type: string
 *                 example: Password1
 *
 *     responses:
 *       '200':
 *         description: a JSON Array User login Information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   exanole: success login
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     token_type:
 *                       example: Bearer
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *       '401':
 *         description: email/ Password Salah!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Wrong Email / Password!
 *       '500':
 *         description: Internal Error
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





//* /auth/signup
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: buah user account baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: username1@gmail.com
 *               password:
 *                 type: string
 *                 example: Password1
 *               name:
 *                 type: string
 *                 example: Lorem Ipsum
 *               role:
 *                 type: string
 *                 enum: [user, toko, vendor]
 *                 example: toko
 *               telepon:
 *                 type: string
 *                 example: 08572717172839
 *               negara:
 *                 type: string
 *                 example: Indonesia
 *               kota:
 *                 type: string
 *                 example: Purbalingga
 *               deskripsi_alamat:
 *                 type: string
 *                 example: Kalimanah wetan RT01/RW10 Blok J no34A
 *
 *
 *     responses:
 *       '201':
 *         description: success Created new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: User Success Created
 *
 *       '422':
 *         description: gagal, data input tidak sesuai
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   exampple: SignUp Gagal, Data tidak sesuai, pastikan password di set harus menggunakan minimal 1 angka dan 1 huruf kapital dengan minimal 6 karakter atau email sudah digunakan
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





//* /auth/logout
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: logout user access dan buat token access tidak valid
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *
 *     responses:
 *       '202':
 *         description: success logout and delete refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Log Out Success!
 *
 *       '401':
 *         description: Auth Error, failed logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Auth Error, Failed Logout!
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
