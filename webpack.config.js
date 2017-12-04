module.exports = {
    entry: {
        'index': './app/typescript/Index.ts',
        'help': './app/typescript/Help.ts',
    },
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/public/javascripts/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'}
        ]
    }
    /*
    // minification:
    ,
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]*/
};
