// 服务文件
const express = require('express');
const bodyParser = require('body-parser');
const imgs = require('./routes/Imgs');

const app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/api/imgs', imgs);




app.get('/', (req, res) => {
    res.send('Server is works!');
});



const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));








