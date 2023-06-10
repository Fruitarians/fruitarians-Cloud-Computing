// * -------------------------------- Machine Learning Doc -------------------------------- * //

// * POST prediction using ML Model
// * POST /prediction
/**
 * @swagger
 * /prediction:
 *   post:
 *     summary: Prediksi kesegaran buah dengan inputkan gambar
 *     tags: [Machine Learning]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image_data:
 *                 required: true
 *                 type: file
 *
 *     responses:
 *       '200':
 *         description: success using prediction model
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 model-prediction:
 *                   type: string
 *                 model-prediction-confidence-score:
 *                   type: string
 *       '422':
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 detail:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       loc:
 *                         type: array
 *                         items:
 *                           error:
 *                             type: string
 *                           error_num:
 *                             example: 0
 *                       msg:
 *                         type: string
 *                       type:
 *                         type: string
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