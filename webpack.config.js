require("babel-core/register");
require("babel-polyfill");
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    // devtool: 'inline-source-map',
    context: path.join(__dirname, '/src'),
    entry: ['babel-polyfill', './index.js'],
    output: {
        path: path.join(__dirname, '/server/public/'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode: 'development',
    // watch: true, //Bundle on saved changes
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-2'],
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: [
                    // Creates `style` nodes from JS strings
                    // 'style-loader',
                    process.env.npm_lifecycle_script === "nodemon server/index.js" ? 'style-loader' : MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ] 
            }
            
        ],
        
    },
    devServer: {
        publicPath: '/',
        liveReload: true,
        disableHostCheck: true,   
        // proxy: {'**': 'http://localhost:4000'},
        contentBase: path.join(__dirname, '/server/public'),
        watchContentBase: true,
        compress: true,
        port: 9000,
        overlay: true,
        historyApiFallback: true,
            
    },
    plugins: [
        new CopyWebpackPlugin(
            {
                patterns:
                    [{ from: 'graphics', to: 'assets/' },
                    ]
            }
        ),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: '[id].css',
          }),
    ],
    
    // optimization: {
    //     minimizer: [new UglifyJsPlugin({
    //         sourceMap: true, 
    //         uglifyOptions: {
    //           ecma:8,  
    //           compress: {
    //             warnings: false
    //           }
    //         }
    //       })]
    // }
};
