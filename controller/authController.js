const authModule = require('./auth');

class authController {
    //查找角色权限信息
    static async findAuth(ctx) {
        const result = await authModule.authFind();
        ctx.status = 200;
        ctx.body = {
            code: 0,
            result
        }
    }
}

module.exports = authController;
