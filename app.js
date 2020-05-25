const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koajwt = require('koa-jwt');
const cors = require('koa-cors');

const jwtKey = require('./config/key').jwtKey;
// error handler
onerror(app);

app.use(cors());
// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public/dist'));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: '-2000',
        desc: '登陆过期，请重新登陆'
      };
    } else {
      throw err;
    }
  });
});

app.use(
  koajwt({
    secret: jwtKey
  }).unless({
    path: [/^\/api\/user\/login/]
  })
);
// routes
const router = require('./routes');
app.use(router.routes(), router.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
