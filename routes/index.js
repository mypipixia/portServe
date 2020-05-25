const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const router = new Router();
const apiUrl = __dirname + '/api';
let files = fs.readdirSync(apiUrl);
files
    .filter((fileName) => {
        return ~fileName.search(/^[^\.].*\.js$/);
    })
    .forEach((file) => {
        const file_name = file.substr(0, file.length - 3);
        const file_entity = require(path.join(apiUrl, file));
        router.use(`/api/${file_name}`, file_entity);
    });


module.exports = router;
