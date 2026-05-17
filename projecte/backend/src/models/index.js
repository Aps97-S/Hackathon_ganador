const Alertas = require('./Alertas');
const Simulaciones = require('./Simulaciones');
const Usuarios = require('./usuarios');
const Historico=require('./historico');
const Divisas= require('./divisas');


// USUARIOS
Usuarios.hasMany(Alertas, {
  foreignKey: "usuario_id"
});
Alertas.belongsTo(Usuarios, {
  foreignKey: "usuario_id"
});
//Un usuario puede tener muchas alertas,pero una alerta trabaja solo en un usuario
Usuarios.hasMany(Simulaciones, {
  foreignKey: "user_id"
});
Simulaciones.belongsTo(Usuarios, {
  foreignKey: "user_id"
});
//Un usuario puede tener varias simulaciones,pero una simulacion trabaja para un usuario (por si luego queremos historico)


// DIVISAS (ASSETS) Internacionalmente le dicen assets
Divisas.hasMany(Alertas, {
  foreignKey: "divisa_id"
});
Alertas.belongsTo(Divisas, {
  foreignKey: "divisa_id"
});
//Una divisa puede tener muchas alertas,pero una alerta trabaja solo sobre una divisa
Divisas.hasMany(Simulaciones, {
  foreignKey: "divisa_id"
});
Simulaciones.belongsTo(Divisas, {
  foreignKey: "divisa_id"
});
//Una divisa tiene muchas simulaciones,pero esta se hace solo sobre una divisa
Divisas.hasMany(Historico, {
  foreignKey: "divisa_id"
});
Historico.belongsTo(Divisas, {
  foreignKey: "divisa_id"
});
//Lo mismo XD el historico trabaja sobre 1 sola divisa,pero una divisa se guarda varias veces en el historico


module.exports = { Alertas, Simulaciones,Historico,Usuarios,Divisas };

