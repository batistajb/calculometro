const path = require('path');

module.exports = {
    entry: './src/server.js',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'app.js'
    },
    target: 'node',
    mode: 'development'
};
