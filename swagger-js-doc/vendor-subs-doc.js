// * -------------------------------- VENDOR SPECIALIZE DOC -------------------------------- * //

// * GET subs to vendor data
// * GET /vendor/
/**
 * @swagger
 * /vendor/:
 *   get:
 *     summary: ambil semua data vendor subs dari semua toko dengan gunakan pagination
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: tampilkan halaman ke berapa pada data role yang ditampilkan dan akan tampilkan halaman pertama jika tidak diisi
 *       - name: size
 *         in: query
 *         description: berapa data ditampilkan dalam 1 halaman, ketika kosong akan set default tampilkan 5 data tiap halaman
 *       - name: search
 *         in: query
 *         description: search data buah berdasarkan nama buah sesuai dengan query search
 *
 *     responses:
 *       '200':
 *         description: Success Get Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Vendor Subs Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     vendor_subs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           owner:
 *                             type: string
 *                           category:
 *                             type: string
 *                           telepon:
 *                             type: string
 *                           wa_link:
 *                             type: string
 *                           schedule:
 *                             type: string
 *                           deskripsi:
 *                             type: string
 *                           delivered:
 *                             type: boolean
 *                           bergabung:
 *                             type: string
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





// * GET subs to vendor data
// * GET /vendor/{id_subs}
/**
 * @swagger
 * /vendor/{id_subs}:
 *   get:
 *     summary: ambil satu data detail vendor subs berdasarkan id
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_subs
 *         in: path
 *         required: true
 *         description: ID Subs Vendor
 *
 *     responses:
 *       '200':
 *         description: Success Get Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get One Vendor Subs Data
 *                 data:
 *                   type: object
 *                   properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           owner:
 *                             type: string
 *                           category:
 *                             type: string
 *                           telepon:
 *                             type: string
 *                           wa_link:
 *                             type: string
 *                           schedule:
 *                             type: string
 *                           deskripsi:
 *                             type: string
 *                           delivered:
 *                             type: boolean
 *                           bergabung:
 *                             type: string
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
 *       '404':
 *         description: ID Data Subs Vendor not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ID Data Subs Vendor not Found
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





// * POST subs to vendor data
// * POST /vendor/
/**
 * @swagger
 * /vendor/:
 *   post:
 *     summary: post data subs vendor baru
 *     tags: [Vendor]
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
 *               owner:
 *                 type: string
 *               telepon:
 *                 type: string
 *               category:
 *                 type: string
 *               schedule:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *
 *
 *     responses:
 *       '201':
 *         description: success post data baru
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Create New Subs Vendor Data
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





// * PATCH edit subs to vendor data DELIVERED SAHA
// * PATCH /vendor/
/**
 * @swagger
 * /vendor/{id_subs}/{delivered}:
 *   patch:
 *     summary: edit status delivered data subs vendor
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_subs
 *         in: path
 *         required: true
 *         description: ID Subs yang akan diedit
 *       - name: delivered
 *         in: path
 *         required: true
 *         description: nilai harus "delivered" jika ingin berhasil
 *         schema:
 *           type: string
 *           default: delivered
 *
 *     responses:
 *       '200':
 *         description: Success Change Delivered Status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Change Delivered Status
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
 *       '404':
 *         description: ID Data Subs Vendor not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ID Data Subs Vendor not Found
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




// * PATCH edit subs to vendor data
// * PATCH /vendor/
/**
 * @swagger
 * /vendor/{id_subs}:
 *   patch:
 *     summary: edit data subs vendor
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_subs
 *         in: path
 *         required: true
 *         description: ID Subs yang akan diedit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               owner:
 *                 type: string
 *               telepon:
 *                 type: string
 *               category:
 *                 type: string
 *               schedule:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success Edit Data Subs Vendor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Edit Data Subs Vendor
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
 *       '404':
 *         description: ID Data Subs Vendor not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ID Data Subs Vendor not Found
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





// * DELETE subs to vendor data
// * DELETE /vendor/
/**
 * @swagger
 * /vendor/{id_subs}:
 *   delete:
 *     summary: delete data subs vendor
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_subs
 *         description: ID Subs yang akan dihapus
 *         required: true
 *
 *     responses:
 *       '200':
 *         description: Success Delete Subs Vendor Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Delete Subs Vendor Data
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
 *       '404':
 *         description: ID Data Subs Vendor not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ID Data Subs Vendor not Found
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