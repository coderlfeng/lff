#!/usr/bin/env node

const {program} = require('commander')
// 引入指令配置文件
const helpOption = require('./lib/core/help')
// 引入创建项目命令文件
const createOption = require('./lib/core/create')
// 版本
program.version(require('./package.json').version)
helpOption()
createOption()

program.parse(process.argv)
