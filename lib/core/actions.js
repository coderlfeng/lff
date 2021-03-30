// node util模块中promisify可以传入一个函数，返回其promise版本
const { promisify } = require('util')
// download-git-repo包用于拉取git内容
const downloadRepo = promisify(require('download-git-repo'))
const terminal = require('../utils/terminal');
const path = require('path')
const {
    error,
    success,
    notice
} = require('../utils/log')
const {
    ejsCompile,
    writeFile,
    mkdirSync
} = require('../utils/file')

const ora = require('ora');

// 创建项目，拉取模板
const createProject = async (project, options) => {
    notice('lf-cli help you create a mPaaS miniprogram template')
    let spinner = ora('template cloneing, wait a minute...')
    if (!project) {
        error('缺少项目名')
        return;
    }
    spinner.start()
    // 拉取模板
    await downloadRepo('direct:http://172.16.0.25/sp-template/uni-app.git#dev', project, { clone: true })

    // const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    // await terminal.spawn(npm, ['install'], { cwd: `./${project}` });

    spinner.stop()
    success(`create project ${project} successfully!`)
}

// 将对应的ejs模板编译到指定文件夹
const handleEjsToFile = async (name, dest, template, filename) => {
    // 获取模板的路径
    const templatePath = path.resolve(__dirname, template)
    // 获取指定ejs模板编译后结果文件
    const result = await ejsCompile(templatePath, { name, lowerName: name.toLowerCase() })
    // 创建文件夹
    mkdirSync(dest)
    const targetPath = path.resolve(dest, filename)
    // 将结果文件写入到文件夹
    writeFile(targetPath, result)
}

// 添加组件
const addComponent = (name, dest) => {
    handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name}.vue`)
    console.log('dest    ', dest)
}
// 添加页面
const addPage = (name, dest) => {
    addComponent(name, dest);
    handleEjsToFile(name, dest, '../template/vue-router.js.ejs', 'router.js')
}

// 添加store
const addStore = async (name, dest) => {
    handleEjsToFile(name, dest, '../template/vue-store.js.ejs', 'index.js')
    handleEjsToFile(name, dest, '../template/vue-types.js.ejs', 'types.js')
}

module.exports = {
    createProject,
    addComponent,
    addPage,
    addStore
}
