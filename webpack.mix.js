const mix = require('laravel-mix');

mix.js('src/index.js', 'dist')
   .vue()
   .setPublicPath('dist')
   .webpackConfig({
     output: {
       libraryTarget: 'umd',
       umdNamedDefine: true
     }
   })
   .version()
   .disableNotifications();
