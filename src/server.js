const express = require("express");
const nunjucks = require("nunjucks");
const cors = require("cors");
const morgan = require("morgan");

const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.urlencoded({extended:true}));

nunjucks.configure('./',{
    express: server,
    noCache: true,
});

require('./models/conexao');

require('./routes')(server);

server.use(express.static('public'));

server.listen(3000, function () {
    console.log('Servidor iniciado com nodemon');
});
