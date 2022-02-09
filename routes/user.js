// 用户路由
let express = require('express');
let router = express.Router();
// 用户注册 /user/signup
/**
 * 注册功能如何实现
 * 1.绘制注册页面模版（usename password email）
 * 2.实现提交用户注册路由 post /user/signup
 * 3.在路由中获得请求体，然后把此用户信息保存到数据库中
 * 4.保存完毕后跳转到登录页
 */
router.get('/signup', function (req, res) {
    res.render('user/signup', {
        title: "用户注册"
    });
})
router.post('/signup', function (req, res) {
    let user = req.body; // 请求体对象(username,passeord,email)
    res.render('user/signup', {
        title: "用户注册"
    });
})
// 登录 /user/signin 
router.get('/signin', function (req, res) {
    res.render('user/signin', {
        title: "用户登录"
    });
})
// 退出 /user/signout 
router.get('/signout', function (req, res) {
    res.render('user/signout', {
        title: "用户退出"
    });
})
module.exports = router;