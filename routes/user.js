// 用户路由
let express = require('express');
let router = express.Router();
// 用户注册 /user/signup
router.get('/signup', function (req, res) {
    res.send('用户注册');
})
// 登录 /user/signin 
router.get('/signup', function (req, res) {
    res.send('用户登录');
})
// 退出 /user/signout 
router.get('/signup', function (req, res) {
    res.send('用户退出');
})
module.exports = router;