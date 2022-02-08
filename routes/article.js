// 文章路由
let express = require('express');
let router = express.Router();
// /article/add
router.get('/add', function (req, res) {
    // 路径是相对路径，相对于模版根目录
    res.render('article/add', {
        title: "首页"
    });
})

module.exports = router;