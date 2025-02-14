import pkg from 'sequelize';
const {Sequelize} = pkg 
import SecretsManagerResponse from "./db.js";
const sequelize = new Sequelize(
 'SampleDB',
 SecretsManagerResponse.username,
 SecretsManagerResponse.password,
  {
    host: SecretsManagerResponse.host,
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 export default sequelize;