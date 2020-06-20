module.exports = (server)=>{
    server.use('/',require('./consumos/index'));
};
