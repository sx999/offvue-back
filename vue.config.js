module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path' : './', 
    outputDir: 'dist',
    devServer: {
        proxy: {
            '/api': {
                target: '线上接口地址',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'  // 根据之前vuejs的配置，用来拿掉URL上的（/api），但是暂时没有什么效果
                }
            },
        }
    },
}