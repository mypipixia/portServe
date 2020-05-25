const Router = require('koa-router');
const ljController = require('../../controller/ljController');
const router = new Router();
//用户注册
router.post('/create', ljController.create);
router.post('/update', ljController.update);
router.post('/updateStatus', ljController.updateStatus);
router.post('/del', ljController.del);
router.post('/getAllTable', ljController.getAllTable);
router.post('/findOnlyID', ljController.findOnlyID);

module.exports = router.routes();
