const Router = require('koa-router');
const authController = require('../../controller/authController')
const router = new Router();
//用户注册
router.get('/find', authController.findAuth)

module.exports = router.routes();