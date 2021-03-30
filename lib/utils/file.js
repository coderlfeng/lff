const fs = require('fs')
const path = require('path');
const ejs = require('ejs');
const chalk = require('chalk');
const { dir } = require('console');
// 返回指定ejs模板编译结果
const ejsCompile = (templatePath, data = {}, options = {}) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, { data }, options, (err, str) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(str)
        })
    })
}

// 写入文件
const writeFile = (path, content) => {
    if(fs.existsSync(path)) {
        console.log(`${chalk.bgYellow.black(' Warning ')} ${chalk.yellow('the file already exists~')}`);
        return;
    }
    return fs.promises.writeFile(path, content);
}

// 创建文件夹
const mkdirSync = dirname => {
    if(fs.existsSync(dirname)) {
        return true;
    }else {
        // 不存在,判断父亲文件夹是否存在
        if(mkdirSync(path.dirname(dirname))) {
            // 存在父亲文件，就直接新建该文件
            fs.mkdirSync(dirname)
            return true;
        }
    }
}

module.exports = {
    ejsCompile,
    writeFile,
    mkdirSync
}
