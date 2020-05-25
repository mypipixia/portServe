const Router = require('koa-router');
const xmInfoController = require('../../controller/xmInfoController');
const router = new Router();

router.get('/find', xmInfoController.find);
router.post('/add', xmInfoController.add);
router.post('/delete', xmInfoController.delete);
module.exports = router.routes();
