const sequelize = require('./models/conexao');
const Consumos = sequelize.import('./models/consumos');


module.exports = (req, res)=>{

    Consumos
        .findAll()
        .then((consumos)=>{
           // return res.json({consumos});
            return res.render('public/index.html', {consumos});
        });


};
