const getToken = require('jsonwebtoken')
const jwtKey = require('../config/key').jwtKey
exports.verToken = function (token) {
    return new Promise((resolve, rejece) => {
        const info = getToken.verify(token.split(' ')[1], jwtKey);
        resolve(info);
    })
}