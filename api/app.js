import express from 'express'
import connectDatabase from './src/database/db.js';
import dotenv from 'dotenv'

import professorRoute from './src/routes/professor.route.js';
import userRoute from './src/routes/user.route.js';
import courseRoute from './src/routes/course.route.js';
import authRoute from './src/routes/auth.route.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(express.json())
app.use('/professors', professorRoute);
app.use('/user', userRoute);
app.use('/course', courseRoute);
app.use('/auth', authRoute);


app.listen(port, () => console.log(`App rodando na porta ${port} 💻`));