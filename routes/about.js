let express = require('express')
let router = express.Router()
const pool = require('../pool')

/**
 * @swagger
 * tags:
 *   name: about
 *   description: 프로필
 */
/**
 * @swagger
 * /about :
 *   get:
 *     summary: 프로필 정보 가져오기
 *     tags: [about]
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
            const data= await pool.query('select * from about')
            return res.json(data[0])
        }catch (err){
            return  res.status(400).json(err)
        }
})

module.exports = router;