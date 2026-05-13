const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');

const servidor = express();
const PORT = process.env.PORT || 3000;
const MOTD = process.env.SRV_MOTD || 'El servidor està VIU !';

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

console.log(`${RED}[MOTD]:: ${RESET}${YELLOW}${MOTD}${RESET}`);

servidor.use(express.static(path.join(__dirname, '..', 'public')));

servidor.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

servidor.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
