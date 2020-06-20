require('./conexao');
module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('consumos',{
        pacote: DataTypes.STRING,
        tempo: DataTypes.STRING,
        servico: DataTypes.STRING,
        caminhoImg: DataTypes.STRING,
        altImg: DataTypes.STRING,
        pesoConsumo: DataTypes.STRING
    },{
        //Options timestamps, relations,  etc...
    });
};
