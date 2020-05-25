const Router = require('koa-router');
const xmMgrController = require('../../controller/xmMgrController');
const router = new Router();

router.post('/getAllTable', xmMgrController.getAllTable);
router.post('/create', xmMgrController.create);
router.post('/del', xmMgrController.del);
router.post('/update', xmMgrController.update);
module.exports = router.routes();
