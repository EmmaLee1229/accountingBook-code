/* eslint-disable */
//有些编辑器(比如webstorm)中下段代码可能会报错，为保险起见需要加入 /* eslint-disable */通知编辑器不需要检查该配置
const path = require('path');

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        const dir = path.resolve(__dirname, 'src/assets/icons')
        config.module
            .rule('svg-sprite')  //添加规则
            .test(/\.svg$/)      //以.svg结尾的
            .include.add(dir).end()
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
            .use('svgo-loader').loader('svgo-loader')
            .tap(options => ({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})).end();
        //为了防止出现svg图标出现有色的状态加入此配置不影响后期开发者用css对图标进行颜色上的控制

        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}]);
        config.module.rule('svg').exclude.add(dir);
    }
}