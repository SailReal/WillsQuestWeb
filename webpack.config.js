module.exports = {
    entry: {
        'index': './app/typescript/src/Index.ts',
    },
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/public/javascripts/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'},
            {test: /\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' }
        ]
    }
    /*
    // minification:
    ,
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]*/
};
