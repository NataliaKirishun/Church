const path = require('path');
const webpack= require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        calendar: './src/calendar.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module:{
        rules:[
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'less-loader']
                    })
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },     {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/audio/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new ExtractTextPlugin({filename: 'style.css'}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            chunks: ['page1'],
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            chunks: ['page2'],
            template: './src/calendar.html',
            filename: 'calendar.html'
        }),
        new webpack.ProvidePlugin({
            $:"jquery/dist/jquery.min.js",
            jQuery:"jquery/dist/jquery.min.js",
            "window.jQuery":"jquery/dist/jquery.min.js",
        })
    ]
}