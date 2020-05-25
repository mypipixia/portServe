const userModule = require('./user');
const roleModule = require('./role');
const xUserModule = require('./xUser');

const jwt = require('jsonwebtoken');
const tools = require('../public/tool');
const bcrypts = require('../public/bcrypt');
const dz = require('../config/bath').dz;
const fs = require('fs');
const path = require('path');
const expireTime = 60 * 60 * 7;
const jwtKey = require('../config/key').jwtKey;
const panDuan = require('../public/auth');

class userController {
  //注册用户
  static async create(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限',
      };
      return;
    }
    const req = ctx.request.body;
    try {
      const result = await userModule.getUserInfo(req.mobileNo);
      let query = result[0][0];
      if (query) {
        ctx.response.status = 500;
        ctx.body = {
          code: -1,
          desc: '用户已存在',
        };
      } else {
        const param = {
          password: bcrypts.enbcrypt(req.password),
          mobileNo: req.mobileNo,
          username: req.username,
          avatar: req.avatar,
          rid: req.rid,
        };
        const data = await userModule.userRegist(param);

        ctx.response.status = 200;
        ctx.body = {
          code: 0,
          desc: '用户注册成功',
          userInfo: {
            avatar: data.avatar,
            username: data.username,
            userId: data.userId,
          },
        };
      }
    } catch (error) {
      ctx.response.status = 416;
      ctx.body = {
        code: -1,
        desc: '参数不齐全',
      };
    }
  }
  static async login(ctx) {
    const req = ctx.request.body;
    if (!req.mobileNo || !req.password) {
      ctx.status = 500;
      return (ctx.body = {
        code: '-1',
        msg: '用户名或密码不能为空',
      });
    } else {
      const result = await userModule.getUserInfo(req.mobileNo);
      let data = result[0][0];
      if (data) {
        let result = bcrypts.bcryptPassword(req.password, data.password);
        if (result) {
          //生成token，验证登录有效期
          const token = jwt.sign(
            {
              user: req.mobileNo,
              passWord: req.password,
              role: data.authArr,
            },
            jwtKey,
            { expiresIn: expireTime }
          );
          const info = {
            mobileNo: data.mobileNo,
            userId: data.userId,
            avatar: data.avatar,
            rid: data.rid,
            username: data.username,
            auth: data.authArr,
          };
          return (ctx.body = {
            code: '0',
            token: 'Bearer ' + token,
            userInfo: info,
            desc: '登陆成功',
          });
        } else {
          ctx.status = 500;
          return (ctx.body = {
            code: '-1',
            desc: '用户密码错误',
          });
        }
      } else {
        ctx.status = 500;
        return (ctx.body = {
          code: '-1',
          desc: '该用户尚未注册',
        });
      }
    }
  }
  static async getUserInfo(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限',
      };
      return;
    }
    const req = ctx.request.body;
    const token = ctx.headers.authorization;
    if (token) {
      try {
        const result = await tools.verToken(token);
        if (!req.mobileNo) {
          return (ctx.body = {
            code: '-1',
            desc: '参数错误',
          });
        } else {
          const result = await userModule.getUserInfo(req.mobileNo);
          let data = result[0][0];
          if (req.mobileNo == data.mobileNo) {
            const info = {
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              mobileNo: data.mobileNo,
              userId: data.userId,
            };
            return (ctx.body = {
              code: '0',
              userInfo: JSON.stringify(info),
              desc: '获取用户信息成功',
            });
          }
        }
      } catch (error) {
        ctx.status = 401;
        return (ctx.body = {
          code: '-1',
          desc: '登陆过期，请重新登陆',
        });
      }
    } else {
      ctx.status = 401;
      return (ctx.body = {
        code: '-1',
        desc: '登陆过期，请重新登陆',
      });
    }
  }
  //查找全部用户
  static async getAllTable(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限',
      };
      return;
    }
    const req = ctx.request.body.searchInfo;
    const countPerPage = ctx.request.body.countPerPage;
    const currentPage = ctx.request.body.currentPage;
    const roleArr = await roleModule.roleFindLw();
    const result = await userModule.getAllTable(req, countPerPage, currentPage);
    const len = await userModule.getAllTable(req);
    ctx.status = 200;
    ctx.body = {
      code: '0',
      result: result,
      roleArr: roleArr,
      len: len.length,
    };
  }
  //删除用户
  static async del(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限',
      };
      return;
    }
    const req = ctx.request.body.id;
    await xUserModule.delUid(req);
    await userModule.delUser(req);
    ctx.status = 200;
    ctx.body = {
      code: '0',
      desc: '删除成功',
    };
  }
  //上传用户头像
  static async uploadAvatar(ctx) {
    const fileName = ctx.request.body.name;
    const userId = ctx.request.body.userId;
    const file = ctx.request.files.file;
    // 创建可读流
    let BASE_PATH = 'public/';
    const render = fs.createReadStream(file.path);
    let fileNames = fileName + '.' + file.name.split('.').pop();
    let filePath = path.join(BASE_PATH, 'dist/upload/', fileNames);
    const fileDir = path.join(BASE_PATH, 'dist/upload/');
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, (err) => {
        ctx.status = 500;
        ctx.body = '上传失败';
        return;
      });
    }
    // 创建写入流
    const upStream = fs.createWriteStream(filePath);
    render.pipe(upStream);
    let avatar = 'http://' + dz + '/upload/' + fileNames;
    ctx.status = 200;
    await userModule.changeUserAvatar({ userId, avatar });
    ctx.body = {
      url: avatar,
      desc: '上传成功',
    };
  }

  //修改用户信息
  static async updateInfo(ctx) {
    const obj = ctx.request.body;
    if (!obj.password) {
      delete obj.password;
    } else {
      obj.password = bcrypts.enbcrypt(obj.password);
    }
    try {
      await userModule.changeUserInfo(obj);
      ctx.status = 200;
      ctx.body = {
        code: 1,
        desc: '修改成功',
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        desc: error,
      };
    }
  }

  //修改用户信息
  static async changeUserInfo(ctx) {
    const obj = ctx.request.body;
    try {
      await userModule.changeUserInfo(obj);
      ctx.status = 200;
      ctx.body = {
        code: 1,
        desc: '修改成功',
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        desc: error,
      };
    }
  }

  //查找管理员之外的用户
  static async findNotUser(ctx) {
    try {
      const result = await userModule.findNotRoleUser();

      ctx.status = 200;
      ctx.body = {
        code: 1,
        result: result[0],
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        desc: error,
      };
    }
  }
}

module.exports = userController;
