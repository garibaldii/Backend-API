const express = require('express');
const connectDatabase = require('./src/database/db');
const cors = require('cors');
const dotenv = require('dotenv').config();

const professorRoute = require('./src/routes/professor.route');
const userRoute = require('./src/routes/user.route');
const curseRoute = require('./src/routes/curse.route')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());

app.use('/professors', professorRoute);
app.use('/user', userRoute);
app.use('/curse', curseRoute);

connectDatabase();
app.listen(port, () => {
    console.log(`App rodando na porta ${port} 💻`);
});

module.exports = app;