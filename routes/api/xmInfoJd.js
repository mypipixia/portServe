const Router = require('koa-router');
const xmInfoJdController = require('../../controller/xmInfoJdController');
const router = new Router();

router.get('/find', xmInfoJdController.find);
router.post('/add', xmInfoJdController.add);
router.post('/delete', xmInfoJdController.delete);
module.exports = router.routes();
