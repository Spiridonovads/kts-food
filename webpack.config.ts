import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsCheckerPlugin from 'fork-ts-checker-webpack-plugin';

const buildPath = path.resolve(__dirname, 'build');
const srcPath = path.resolve(__dirname, 'src');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
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
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
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
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },

      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
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

  devServer: {
    host: '127.0.0.1',
    port: 9000,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: './public/logo.svg',
    }),
    !isProd && new ReactRefreshWebpackPlugin(),

    isProd &&
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
      }),
    ,
    new TsCheckerPlugin(),
  ].filter(Boolean),
};
