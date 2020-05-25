const Router = require('koa-router');
const userController = require('../../controller/userController');
const router = new Router();
const koaBody = require('koa-body');

//用户注册
router.post('/regist', userController.create);

//密码登陆
router.post('/login', userController.login);

//获取用户信息
router.post('/getUserInfo', userController.getUserInfo);

router.post('/getAllTable', userController.getAllTable);

router.post('/del', userController.del);

router.post('/update', userController.updateInfo);
router.get('/findNotUser', userController.findNotUser);
router.post('/changeUserInfo', userController.changeUserInfo);

router.post(
  '/upload',
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024
    }
  }),
  userController.uploadAvatar
);
module.exports = router.routes();
