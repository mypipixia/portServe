const Router = require('koa-router');
const router = new Router();
//用户注册
const roleController = require('../../controller/roleController');

router.get('/find', roleController.findRole);
router.post('/create', roleController.createRole);
router.post('/changeStatus', roleController.changeStatus);
router.post('/setAuthArr', roleController.setAuthArr);
router.post('/delRole', roleController.delRole);
router.post('/findRoleID', roleController.findRoleID);

module.exports = router.routes();
