const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const PRODUCTION_CSS_STYLE_NAME = '[hash:base64:5]';
const DEVELOPMENT_CSS_STYLE_NAME = '[path][name]__[local]--[hash:base64:5]';

const MODE_PRODUCTION = 'production';
const MODE_DEVELOPMENT = 'development';

module.exports = (env, options) => {
    const cssClassName = options.mode === MODE_PRODUCTION
        ? PRODUCTION_CSS_STYLE_NAME
        : DEVELOPMENT_CSS_STYLE_NAME;

    let config = {
        entry: './src/index.tsx',
        mode: options.mode,
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                modules: true,
                                namedExport: true,
                                sourceMap: true,
                                localIdentName: cssClassName,
                                importLoader: 1
                            }
                        },
                        'sass-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [require('autoprefixer')({
                                    'browsers': ['> 1%', 'last 2 versions']
                                })],
                            }
                        },
                    ]
                }
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css',
            })
        ],
        output: {
            filename: 'bundle.js',
            publicPath: "/dist/",
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new TerserPlugin(),
            ],
        },
    };

    if (options.mode === MODE_DEVELOPMENT) {
        config.devServer = {
            contentBase: path.join(__dirname, 'dist'),
        };
        config.plugins || (config.plugins = []);
        config.plugins.push(new webpack.HotModuleReplacementPlugin());

        config.devtool = 'source-map';
    }

    return config;
};