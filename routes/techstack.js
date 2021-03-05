let express = require('express')
let router = express.Router()
const pool = require('../pool')

/**
 * @swagger
 * tags:
 *   name: tech-stack
 *   description: 기술스택
 */
/**
 * @swagger
 * /tech:
 *   get:
 *     summary: 기슬 스택 정보 가져오기
 *     tags: [tech-stack]
 *     responses:
 *       200:
 *         description: 성공
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       400:
 *         $ref: '#/components/res/BadRequest'
 */
router.get('/', async (req,res,next) => {
    try{
        const data = await pool.query('select * from techstack')
        return res.json(data[0])
    }catch (err){
        return  res.status(400).json(err)
    }
})
/**
 * @swagger
 * /tech/pro:
 *   post:
 *     summary: 기슬 스택 정보 입력하기
 *     tags: [tech-stack]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     requestBody:
 *       content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      stack:
 *                          type: int
 *              required:
 *                  - name
 *                  - stack
 *     responses:
 *       200:
 *         description: 성공
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       400:
 *         $ref: '#/components/res/BadRequest'
 */
router.post('/pro', async (req,res,next) => {
    try{
        let {name, stack}=req.body;
        const data = await pool.query('INSERT INTO techstack (name, stack) values(?,?)',[name,stack])
        return res.json(data[0])
    }catch (err){
        return  res.status(400).json(err)
    }
})

module.exports = router;