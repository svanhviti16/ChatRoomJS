const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, use: 'eslint-loader' },
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader'] },
            { test: /\.png$/, loader: 'url-loader' },
            { test: /\.less$/, use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'less-loader' },
            ]}
        ],
        loaders: [ {
            test: /\.(png|jpg)$/, loader: 'url-loader' } ]
          
    },
    watch: true,
    resolve: {
        extensions: ['.png', '.js', '.jsx', '.less']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true
    },
    devtool: 'inline-source-map',
    plugins: [new HtmlWebpackPlugin({
        title: 'ChatRoomJS',
        template: './index.html'
    })]
};
