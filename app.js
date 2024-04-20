const express = require('express');
const connectDatabase = require('./src/database/db');
const professorRoute = require('./src/routes/professorRoute');
const usuarioRoute = require('./src/routes/usuarioRoute');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());
app.use('/professores', professorRoute);
app.use('/usuarios', usuarioRoute);

connectDatabase();
app.listen(PORT, () => {
    console.log(`App rodando na porta ${PORT} 💻`);
});

module.exports = app;