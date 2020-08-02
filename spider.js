// 爬虫文件

const cheerio = require('cheerio');
const request = require('request');
const iconv = require('iconv-lite');
const Imgs = require('./model/Img');


// Imgs 表的数据
const url = 'http://pic.netbian.com/4kfengjing/';
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
    encoding: null
};
request.get(url, headers, async (err, response, body) => {
    if(err) throw err;
    // console.log(html);
    let html = iconv.decode(body, 'gb-2312');
    const $ = cheerio.load(html, {decodeEntities: false});
    let count = $('#main .slist .clearfix li a').length;
    let getImg = new Promise((resolve, reject) => {
        let imgs = [];
        $('#main .slist .clearfix li a').each(async (index, ele) => {
            let relativePath = $(ele).attr('href');
            // console.log(relativePath);
            let url = 'http://pic.netbian.com' + relativePath;
            await getSingleImg(url, headers).then(res => {
                console.log(res);
                let obj = {
                    title: 'img ' + (index + 1),
                    path: res,
                    description: 'img' + (index + 1)
                };
                imgs.push(obj);
            });
            if(imgs.length == count) resolve(imgs);
        });
    });

    getImg.then(res => {
        console.log(res.length, res);
        res.forEach(item => {
            Imgs.create(item).then(res => {
                console.log(res);
            });
        });
    });
});

/** 
 * 获取单张图片
 * @param url  网页路径
 * @param headers 请求头
*/
function getSingleImg(url, headers) {
    return new Promise((resolve, reject) => {
        request.get(url, headers, (err, response, body) => {
            let html = iconv.decode(body, 'gb2312');
            let _$ = cheerio.load(html, {decodeEntities: false});
            // console.log(_$('body #main .photo .photo-pic #img img').attr('src'));
            let imgPath = _$('body #main .photo .photo-pic #img img').attr('src');
            // console.log(imgPath);
            resolve('http://pic.netbian.com' + imgPath);
        });
    });
}











