const path = require("path");
module.exports = {
    entry: ["whatwg-fetch", "./js/app.jsx"],
    output: {
        filename: "dist/out.js"
    },
    devServer: {
        inline: true,
        contentBase: './',
        host: '127.0.0.1',
        port: 3000
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
                presets: ['es2015',
                    'stage-2',
                    'react'
                ]
            }

        }]
    }
}
