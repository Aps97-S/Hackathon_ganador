const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');

const { initDatabase } = require("./src/config/database");
const routes = require('./src/routes');


const servidor = express();

const PORT = process.env.PORT || 3000;
const MOTD = process.env.SRV_MOTD || 'El servidor està VIU !';

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

console.log(`${RED}[MOTD]:: ${RESET}${YELLOW}${MOTD}${RESET}`);
//Middleware basico
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true }));

//Cors base- importante para react
servidor.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // en hackathon vale
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//Routes
servidor.use('/api', routes);

//Healthchek
servidor.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: MOTD,
    time: new Date().toISOString()
  });
});

//Iniciar servidor
async function startServer() {
  try {
    await initDatabase();
    await sequelize.sync({ alter: true });
    console.log('DB conectada correctamente');
  } catch (err) {
    console.error('Error inicializando DB:', err);
    process.exit(1);
  }

  servidor.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();