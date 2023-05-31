// * GET semua data article
// *! code dan routing ada di bagian "article.js" dan "articleController.js"
// * GET /articles
/**
 * @swagger
 * /articles/:
 *   get:
 *     summary: ambil semua data articles
 *     tags: [Article]
 *
 *     responses:
 *       '200':
 *         description: success get data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalData:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       konten:
 *                         type: string
 *                       photo:
 *                         type: string
 *                       author:
 *                         type: string
 *                       createdAt:
 *                         type: string
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

// * GET semua article by id
// *! code dan routing ada di bagian "article.js" dan "articleController.js"
// * GET /articles/:id
/**
 * @swagger
 * /articles/:id:
 *   get:
 *     summary: ambil articles by id
 *     tags: [Article]
 *
 *     responses:
 *       '200':
 *         description: success get data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       konten:
 *                         type: string
 *                       photo:
 *                         type: string
 *                       author:
 *                         type: string
 *                       createdAt:
 *                         type: string
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
