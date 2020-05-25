const Router = require('koa-router');
const turnoverController = require('../../controller/turnoverController');
const router = new Router();
//用户注册
router.post('/create', turnoverController.create);
router.post('/update', turnoverController.update);
router.post('/updateStatus', turnoverController.updateStatus);
router.post('/del', turnoverController.del);
router.post('/getAllTable', turnoverController.getAllTable);
router.post('/findOnlyID', turnoverController.findOnlyID);

module.exports = router.routes();
