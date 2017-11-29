module.exports = {
    entry: {
        'Index': './app/typescript/outdir/Index.js'
    },
    devtool: 'source-map',
    output: {
        path: __dirname + '/public/javascripts/',
        filename: '[name].js'
    }
};
