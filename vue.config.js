const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/assets/css/all.scss')],
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/thegaze/' : '/',
};
