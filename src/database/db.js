const mongoose = require('mongoose')

const connectDatabase = () => {
    console.log('Conectando com o banco de dados... ⌛');

    mongoose.connect(
        'mongodb+srv://garibaldimatheus8:fatec123@clusterprofessor.nbs2qed.mongodb.net/',
        {useNewUrlParser: true,
        useUnifiedTopology: true}
    )
   .then(() => console.log('MongoDB Atlas Conectado com sucesso! ✅'))
   .catch((error) => console.log(error))
}

module.exports = connectDatabase