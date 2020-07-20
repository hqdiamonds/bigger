const path = require('path')
const resolve = (dir) => {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@src', resolve('src'))
            .set('@com', resolve('src/components'))
            .set('@comp-com', resolve('src/components/common'))
    }
}