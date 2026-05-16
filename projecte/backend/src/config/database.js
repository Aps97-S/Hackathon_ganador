const { Sequelize } = require("sequelize");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  define: {
    timestamps: true,// Añade createdAt y updatedAt automáticamente a TODOS los modelos 
    underscored: true, // Usa snake_case en las columnas de la BD (created_at, updated_at)
    freezeTableName: true, // Stop the auto-pluralization performed by Sequelize
  },
  pool: {
    max: 5, //conexiones maximas
    min: 0, //conexiones minimas
    acquire: 60000, // Tiempo máximo en ms que una conexión puede estar inactiva antes de ser liberada
    idle: 10000, // Tiempo máximo en ms que una conexión puede estar inactiva antes de ser cerrada
  },
});

async function ensureDatabaseExists() {
  try {
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await connection.end();

    console.log(`Base de datos "${DB_NAME}" verificada / creada.`);
  } catch (err) {
    console.error("Error creando/verificando DB:", err);
    throw err;
  }
}

async function initDatabase() {
  await ensureDatabaseExists();

  try {
    await sequelize.authenticate();
    console.log("Conexión a DB OK");
    require('../models');
    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados");
  } catch (err) {
    console.error("Error conectando Sequelize:", err);
    throw err;
  }
}

module.exports = { sequelize, initDatabase, ensureDatabaseExists };