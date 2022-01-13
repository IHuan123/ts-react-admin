const { override,addWebpackAlias,overrideDevServer } = require('customize-cra')
const path = require('path')
module.exports = {
    webpack:override(
        addWebpackAlias({"@":path.resolve(__dirname,"./src")})
    ),
    devServer:overrideDevServer(config=>{
        return config
    })
}