const program = require('commander')
const {
    createProject
} = require('../core/actions')

const {
    addComponent,
    addPage,
    addStore
} = require('./actions')

const createOption = () => {
    // 创建项目
    program
        .command('create [options...]')
        .description('clone a template into a folder')
        .action(options => createProject(options[0]))

    // 创建组件
    program
        .command('addcpn <name> [dest]')
        .description('add a vue component, for example: lf addcpn swiper [src/components]')
        .action((name, dest) => { addComponent(name, dest || 'src/components') })

    // 创建页面
    program
        .command('addpage <name> [dest]')
        .description('add a page that contains a base component, for example: lf addpage home src/pages')
        .action((name, dest) => { addPage(name, dest || `src/pages/${name.toLowerCase()}`) })

    // 创建store
    program
        .command('addstore <name> [dest]')
        .description('add vue store, for example: lf addstore favor dest')
        .action((name, dest) => {
            addStore(name, dest || `src/store/modules/${name.toLowerCase()}`)
        })
}
module.exports = createOption
