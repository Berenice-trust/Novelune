const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

//const ExtractTextPlugin = require("extract-text-webpack-plugin"); // старый плагин для выделения CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // более современный плагин для выделения CSS

// со старым плагином
// const extractCSS = new ExtractTextPlugin({
//     filename: "bundle.css" // имя итогового CSS-файла
// });

module.exports = { 
    entry: "./App.js", // точка входа
    output:{ 
        path: path.resolve(__dirname, 'dist'), // сюда складываем итоговые файлы (папка dist)
        filename: "bundle.js"  
    }, 
    mode: 'development', // режим сборки для разработки
    devtool:'source-map', // для отладки в браузере
    module:{ 
        rules:[
            { 
                test: /\.jsx?$/, // .js и .jsx 
                exclude: /node_modules/, // кроме node_modules
                use: { loader: "babel-loader" } // использовать babel-loader для транспиляции
            },
            {
                test: /\.css$/, //  все .css 
                // use: extractCSS.extract({
                //     use: ["css-loader"] // для старого плагина
                // })
                use: [MiniCssExtractPlugin.loader, "css-loader"] // использовать для импорта CSS
            },
            {
                test: /\.scss$/, //  для SCSS
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] // в этом порядке
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                filename: 'assets/[name][hash][ext][query]' // картинки в dist/assets/
            }
            }
        ]
    },
    plugins: [
        //extractCSS // плагин для выделения CSS
         new MiniCssExtractPlugin({
            filename: "bundle.css" // имя итогового CSS-файла
        }),

        new HtmlWebpackPlugin({
            template: './index.html', // путь к твоему исходному index.html
        }),
    ],
    // по умолчанию ищет public/index.html
    // но у нас в корне лежит
    devServer: {
        static: {
            directory: __dirname, // указываем корень проекта, где лежит index.html
        },
        port: 8080,
    }
}