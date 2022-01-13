// @ts-ignore
const { createProxyMiddleware } = require("http-proxy-middleware")

function proxy(){
    return createProxyMiddleware("/api",{
        target:"http://192.168.0.100:9000",
        changeOrigin:true,
        pathRewrite: {
            '/api': '/',
        },
        secure: false, // 是否验证证书
        ws: true, // 启用websocket
    })
}
function mockProxy(){
    return createProxyMiddleware("/api",{
        target:"http://192.168.0.100:3000",
        changeOrigin:true,
        pathRewrite: {
            '/mock': '/mock',
        },
        secure: false, // 是否验证证书
        ws: true, // 启用websocket
    })
}

module.exports = function (app){
    app.use(proxy())
}
