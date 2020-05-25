const bcrypt = require('bcrypt');

const bcrypts = {
    enbcrypt(password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    /**
     * 验证用户密码
     * @param {*} password 输入的密码
     * @param {*} value 查找到的用户信息密码
     */
    bcryptPassword(password, value) {
        let result = bcrypt.compareSync(password, value);
        return result;
    }
};

module.exports = bcrypts;
