const chalk = require('chalk')

const error = (...info) => {
    console.log(chalk.red(...info))
}
const success = (...info) => {
    console.log(chalk.green(...info))
}
const notice = (...info) => {
    console.log(chalk.blueBright(...info))
}
module.exports = {
    error,
    success,
    notice
}
