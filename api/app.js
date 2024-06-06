import express from 'express'
import connectDatabase from './src/database/db.js';
import dotenv from 'dotenv'
import cors from 'cors'

import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import professorRoute from './src/routes/professor.route.js';
import userRoute from './src/routes/user.route.js';
import courseRoute from './src/routes/course.route.js';
import authRoute from './src/routes/auth.route.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();


connectDatabase();
app.use(cors());
app.use(express.json())
app.use('/professors', professorRoute);
app.use('/user', userRoute);
app.use('/course', courseRoute);
app.use('/auth', authRoute);



// Configuração do Swagger
try {
    const jsonData = fs.readFileSync('./swagger_output.json', 'utf8');
    const swaggerDocument = JSON.parse(jsonData);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('Swagger configurado com sucesso!');
} catch (error) {
    console.error('Erro ao configurar o Swagger:', error);
}


app.listen(port, () => console.log(`App rodando na porta ${port} 💻`));