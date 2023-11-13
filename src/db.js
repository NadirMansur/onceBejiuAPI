require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const isLocal = process.env.NODE_ENV !== "production";

// Utiliza las variables de entorno correspondientes
const DB_USER = isLocal ? process.env.DB_USER : process.env.RW_USERdb;
const DB_PASSWORD = isLocal ? process.env.DB_PASSWORD : process.env.RW_PASSWORD;
const DB_HOST = isLocal ? process.env.DB_HOST : process.env.RW_URLdb;
const DB_PORT = isLocal ? process.env.DB_PORT : process.env.RW_PORTdb;
const DB_NAME = isLocal ? process.env.DB_NAME : process.env.RW_DB_NAME;

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
console.log(sequelize.models);
const {
  Favorite,
  Order,
  Pay,
  Producto,
  Proovedor,
  Review,
  Rubro,
  ShoppingCart,
  Tag,
  User,
  //Rating_avg_book,
} = sequelize.models;

//!Revisar todas las relaciones hasMany y pasar a belongto()
// Aca vendrian las relaciones
//(https://www.youtube.com/watch?v=wgLo_0FL0yc
//https://www.youtube.com/watch?v=ocysQ07G4PQ)
//User.hasOne(Address,foreignKey:'UserId'}) añana UserId a la tabla Addresses
//Address.belongsTo(User, {foreignKey:'UserId'}) añana UserId a la tabla Addresses
// luego de una relacion hasOne o HasMay, se genera la relacion BelongsTo
// User.hasMany(Post, {foreignKey:'UserId'}) añade una UserId a la tabla Post
// Post.belongsTo(User, {foreignKey:'UserId'}) // añande una UserId  a la tabla Post

/////////////////////////////////////////////////////////////////////
Producto.belongsToMany(Tag, { through: 'Producto_Tag' });
/////////////////////////////////////////////////////////////////////
Rubro.hasOne(Producto, {foreignKey:'RubroId'}) //a -> b -> b
Producto.belongsTo(Rubro, {foreignKey:'RubroId'}) //a -> b -> a
/////////////////////////////////////////////////////////////////////
Proovedor.hasOne(Producto, {foreignKey:'ProovedorId'}) //a -> b -> b
Producto.belongsTo(Proovedor, {foreignKey:'ProovedorId'}) //a -> b -> a
/////////////////////////////////////////////////////////////////////
Producto.hasMany(Review, {foreignKey:'Productoid'}) //a -> b -> b
Review.belongsTo(Producto, {foreignKey:'Productoid'})  //a -> b -> a
/////////////////////////////////////////////////////////////////////
Producto.hasMany(Favorite, {foreignKey:'Productoid'}) //a -> b -> b
Favorite.belongsTo(Producto, {foreignKey:'Productoid'})  //a -> b -> a
/////////////////////////////////////////////////////////////////////
Producto.belongsToMany(ShoppingCart, { through: 'Producto_ShoppingCart' });
/////////////////////////////////////////////////////////////////////
Producto.belongsToMany(Order, { through: 'Producto_Order' });
/////////////////////////////////////////////////////////////////////
Order.hasMany(Pay, {foreignKey:'OrderId'}) //a -> b -> b
Pay.belongsTo(Order, {foreignKey:'OrderId'}) //a -> b -> a
/////////////////////////////////////////////////////////////////////
User.hasMany(Order, {foreignKey:'UserId'}) //a -> b -> b
Order.belongsTo(User, {foreignKey:'UserId'}) //a -> b -> a
/////////////////////////////////////////////////////////////////////
ShoppingCart.hasOne(User, {foreignKey:'ShoppingCartId'}) //a -> b -> b
User.belongsTo(ShoppingCart, {foreignKey:'RubroId'}) //a -> b -> a
/////////////////////////////////////////////////////////////////////
User.hasMany(Favorite, {foreignKey:'UserId'}) //a -> b -> b
Favorite.belongsTo(User, {foreignKey:'UserId'}) //a -> b -> a
/////////////////////////////////////////////////////////////////////
User.hasMany(Review, {foreignKey:'UserId'}) //a -> b -> b
Review.belongsTo(User, {foreignKey:'UserId'}) //a -> b -> a
/////////////////////////////////////////////////////////////////////
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};