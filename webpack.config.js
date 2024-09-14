module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.ALGOLIA_API_KEY': JSON.stringify(process.env.ALGOLIA_API_KEY)
        })
    ]
}