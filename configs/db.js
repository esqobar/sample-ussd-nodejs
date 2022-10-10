const mongoose = require('mongoose');

const database = process.env.MONGO_URI;

mongoose.connect(database, {}).then(()=>{
    console.log('connected to the database successfully'.bgGreen);
}).catch((e) => {
    console.log('Connection to the database Failed!'.bgRed);
})