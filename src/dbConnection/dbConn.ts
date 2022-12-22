import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName: any = process.env.DBNAME;
const database: any = process.env.DATABASE;
const password: any = process.env.PASSWORD;
const localhost: any = process.env.LOCALHOST;
const dialect: any = process.env.DIALECT;

const sequelize = new Sequelize(dbName, database, password, {
  host: localhost,
  dialect: dialect,
  pool: { max: 5, min: 0, idle: 10000 },
  logging: false,
});

export default sequelize;
