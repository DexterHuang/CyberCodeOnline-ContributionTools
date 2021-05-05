const path = require('path');
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  }, 
  webpack: {
        configure: (webpackConfig, { env, paths }) => { 
            paths.appBuild = webpackConfig.output.path = path.resolve('../doc');
            return webpackConfig;
        }
    }
}