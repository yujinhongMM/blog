// 首页
let express = require('express');
// 调用Router方法可以得到一个路由的中间件实例
let router = express.Router();
// 当客户端通过GET请求的方式访问到路径/的时候，会交由对应的函数来处理
router.get('/', function(req, res) {
    res.send('首页');
})
module.exports = router;