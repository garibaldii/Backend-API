const express = require('express');
const { connectDatabase } = require('./src/database/db')
const professorRoute = require('./src/routes/professorRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use('/professores', professorRoute)

connectToDatabase();
app.listen(PORT, () => {
    console.log(`App rodando na porta ${PORT} 💻`);
});

module.exports = app;