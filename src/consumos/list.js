const sequelize = require('./../models/conexao');
const Consumo = sequelize.import('./../models/consumos');


module.exports = (req, res)=>{

    Consumo
        .findAll()
        .then(()=>{
            //return res.json({donors});
            return res.render('public/index.html')
        });


};
