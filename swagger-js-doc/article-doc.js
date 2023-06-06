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
 *                 message:
 *                   example: Retrieve all data article
 *                 totalData:
 *                   type: integer
 *                 result:
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
 * /articles/{id}:
 *   get:
 *     summary: ambil articles by id, dengan option query untuk bisa dapatkan tambahan satu data random
 *     tags: [Article]
 *     parameters:
 *       - name: card
 *         in: query
 *         description: isi nilai dengan boolean true untuk dapatkan 1 data cards random
 *       - name: id
 *         in: path
 *         required: true
 *         description: id artikel
 *
 *     responses:
 *       '200_without_random_data':
 *         description: success get data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Get data article random
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
 *       '200_with_random_data':
 *         description: success get data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Get data article random
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
 *                 randomItem:
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
