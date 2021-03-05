let express = require('express')
let router = express.Router()
const pool = require('../pool')

/**
 * @swagger
 * tags:
 *   name: portfolio
 *   description: 포트폴리오
 */
/**
 * @swagger
 * /portfolio :
 *   get:
 *     summary: 포트폴리오 정보 가져오기
 *     tags: [portfolio]
 *
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
            const data= await pool.query('select * from portfolio')
            return res.json(data[0])
        }catch (err){
            return  res.status(400).json(err)
        }
})

module.exports = router;