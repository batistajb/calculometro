const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql:root:@localhost:3306/consumo');

sequelize.
    authenticate()
    .then(()=>console.log('Autenticado'))
    .catch(()=>console.log('Erro autenticação'));

sequelize.sync();

module.exports = sequelize;
