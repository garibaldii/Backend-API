const express = require('express');
const connectDatabase = require('./src/database/db');
const professorRoute = require('./src/routes/professor.route');
const userRoute = require('./src/routes/user.route');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());
app.use('/professores', professorRoute);
app.use('/user', userRoute);

connectDatabase();
app.listen(port, () => {
    console.log(`App rodando na porta ${port} 💻`);
});

module.exports = app;