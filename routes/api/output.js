const Router = require('koa-router');
const outputController = require('../../controller/outputController');
const router = new Router();
//用户注册
router.post('/create', outputController.create);
router.post('/update', outputController.update);
router.post('/updateStatus', outputController.updateStatus);
router.post('/del', outputController.del);
router.post('/getAllTable', outputController.getAllTable);
router.post('/findOnlyID', outputController.findOnlyID);

module.exports = router.routes();
