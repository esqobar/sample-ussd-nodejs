const express = require('express')
const morgan = require('morgan')
const colors = require('colors')
require('dotenv').config()
require('./configs/db');
const bodyParser = require("body-parser");
const User = require("./models/users");

const app = express()

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

 // route
app.get('/', (req, res) => {
    res.send("Success Message");
})

app.get('/users', async (req, res) => {
   try {
       let users = await User.find({});
       res.json(users);
   } catch (e){
    res.status(500).json({messge: error.message})
   }
})

app.post('/',(req, res) => {
    const { phoneNumber, text, sessionId } = req.body;
    let response;

    if(text==='')
    {
        response = 'CON Enter your full name'
    }
    else if(text !==''){
        let array = text.split('*');
        if(array.length === 1){
            response = 'CON Enter your id number'
        } else if(array.length === 2){
            if(parseInt(array[1]) > 0){
                response = 'CON Please confirm if you want to save this data\n1. Corfirm\n2. Cancel\n3. View All Users'
            } else {
                response = 'END Network Error, Please try again.'
            }

        } else if(array.length === 3){
            if(parseInt(array[2]) === 1){
                let user = new User();
                user.fullname = array[0];
                user.idNumber = array[1];
                user.save( () => {
                    response = 'END Your data was saved successfully.'
                })
            } else if(parseInt(array[2]) === 2){
                response = 'END Sorry, data was not saved.'
            } else if(parseInt(array[2]) === 3){
                User.find({}, (err,users) => {
                    let users_data = `${users.length < 1 ? 'No data found': 
                        `${users.map((item, index) => {
                            return `${index+1}. ${item.fullname}\n`
                        }
                        ).join("")}`
                    }`
                    response = `END Registered users.\n${users_data}`
                })
            } else {
                response = 'END Invalid input'
            }
        }
        else {
            response = 'END Network Error, Please try again.'
        }

    }


    setTimeout(() => {
        console.log(text);
        res.send(response);
        res.end()
    }, 2000);
});

// bhDc419GNOT4DtPl


//port
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.rainbow);
});