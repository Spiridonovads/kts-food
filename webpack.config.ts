const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

const getSettingsForStyles = (withModules = false) => {
  return [
    'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]',
            },
          },
        },
    'sass-loader',
  ];
};

module.exports = {
  mode: 'development',
  entry: path.resolve(srcPath, 'main.tsx'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.css', '.ts', '.js', '.module.scss', '.module.css'],
    alias: {
      '@': srcPath,
      components: path.resolve(srcPath, 'components'),
      configs: path.resolve(srcPath, 'configs'),
      styles: path.resolve(srcPath, 'styles'),
      utils: path.resolve(srcPath, 'utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
