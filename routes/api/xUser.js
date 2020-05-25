const Router = require('koa-router');
const xUserMgrController = require('../../controller/xUserMgrController');
const router = new Router();

router.post('/xUserCreat', xUserMgrController.create);
router.post('/findTable', xUserMgrController.findTable);
router.post('/delete', xUserMgrController.delete);
module.exports = router.routes();
