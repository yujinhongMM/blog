const express = require('express');
const app = express();
// 设置模版引擎 html
app.set('view engine', 'html');
// 指定模版的存放根目录
app.set('views', path.resolve('views'));
// 指定对于html类型的模版使用ejs方法来进行渲染
app.engine('html', require('ejs').__express);
const port = 8080;
const index = require('./routes/index');
const user = require('./routes/user');
const article = require('./routes/article');
/**
 * / 首页
 */
app.use('/', index);
// 当客户端请求过来的路径是 /user开头的话，会交由user中间件来处理 /user/signup
/**
 * /user/signup 注册
 * /user/signin 登录
 * /user/signout 退出
 */
app.use('/user', user)
/**
 * /article/add 发表文章
 */
app.use('/article', article)

app.listen(port, () => {
    console.log("服务在8080端口启动")
});