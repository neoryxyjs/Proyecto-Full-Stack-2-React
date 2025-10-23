import webpackConfig from './webpack.test.js';

export default function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: [
      'src/components/Footer.test.jsx',
      'src/components/ProductCard.test.jsx',
      'src/components/Navbar.test.jsx',
      'src/components/Toast.test.jsx'
    ],
    preprocessors: {
      'src/components/Footer.test.jsx': ['webpack'],
      'src/components/ProductCard.test.jsx': ['webpack'],
      'src/components/Navbar.test.jsx': ['webpack'],
      'src/components/Toast.test.jsx': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-webpack'
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    browsers: ['ChromeHeadless'],
    singleRun: false,
    autoWatch: true
  });
}

