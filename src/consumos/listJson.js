const sequelize = require('./../models/conexao');
const Consumo = sequelize.import('./../models/consumos');


module.exports = (req, res)=>{

    Consumo
        .findAll()
        .then((consumos)=>{
            return res.json({consumos});
           // return res.render('public/index.html', {consumos})
        });


};
