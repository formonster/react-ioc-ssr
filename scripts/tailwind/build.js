const shell = require('shelljs');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const CACHE_PATH = path.join(__dirname, './md5.json');
const HTML_PATH = path.join(__dirname, '../../public/template.html');

// 读取上一次缓存的 md5
const cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));

// 从文件创建一个可读流
var stream = fs.createReadStream(path.join(__dirname, '../../tailwind.config.js'));
var fsHash = crypto.createHash('md5');

stream.on('data', function (d) {
    fsHash.update(d);
});

stream.on('end', function () {

    var md5 = fsHash.digest('hex');

    if (md5 === cache.md5) return process.exit();

    // 生成新文件
    console.log("📦 build...");
    shell.exec(`NODE_ENV=production npx tailwindcss build public/style.css -o public/index.${md5}.css`);

    // 修改 index.html 文件
    let html = fs.readFileSync(HTML_PATH, 'utf8');
    html = html.replace(cache.md5, md5);
    fs.writeFileSync(HTML_PATH, html);

    // 更新 cache
    cache.md5 = md5;
    cache.cache_time = new Date().getTime();
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache));
});
