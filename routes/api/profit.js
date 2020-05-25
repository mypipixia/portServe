const Router = require('koa-router');
const profitController = require('../../controller/profitController');
const router = new Router();
//用户注册
router.post('/create', profitController.create);
router.post('/update', profitController.update);
router.post('/updateStatus', profitController.updateStatus);
router.post('/del', profitController.del);
router.post('/getAllTable', profitController.getAllTable);
router.post('/findOnlyID', profitController.findOnlyID);

module.exports = router.routes();
