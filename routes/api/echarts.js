const Router = require('koa-router');
const echartsController = require('../../controller/echartsController');
const router = new Router();
//用户注册
router.get('/getEchartOne', echartsController.getEchartOne);
router.get('/findOutputs', echartsController.findOutputs);
router.get('/findTurnover', echartsController.findTurnover);
router.get('/findProfits', echartsController.findProfits);
router.get('/findlj', echartsController.findlj);
router.get('/findXmInfoYear', echartsController.findXmInfoYear);
router.get('/findEchartJd', echartsController.findEchartJd);
router.get('/findEchartInfoJd', echartsController.findEchartInfoJd);
module.exports = router.routes();
