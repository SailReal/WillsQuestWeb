module.exports = {
    entry: {
        'index': './app/typescript/outdir/Index.js',
        'help': './app/typescript/outdir/Help.js',
    },
    devtool: 'source-map',
    output: {
        path: __dirname + '/public/javascripts/',
        filename: '[name].js'
    }
};
