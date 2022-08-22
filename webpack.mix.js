const mix = require('laravel-mix');

mix.js('src/index.js', 'dist')
   .vue()
   .setPublicPath('dist')
   .webpackConfig({
     output: {
       library: 'VueKityminder',
       libraryTarget: 'umd',
       umdNamedDefine: true,
       libraryExport: 'default'
     }
   })
   .version()
   .disableNotifications();
