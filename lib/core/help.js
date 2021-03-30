// 指令文件

const program = require('commander')

const helpOption = () => {
    // 添加指令（可在-h或--help时查看）
    program.option('-d --dest <dest>', 'destination folder')
    // 监听指令
    program.on('--help', () => {
        console.log('')
        console.log('this is a test message')
    })
}

module.exports = helpOption
