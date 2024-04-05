//IMPORT TOUR DATA FROM OUR JSON FILE into the mongoDB database
//since import data in nodejs is simple using reaaFile method

//lets create the script
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel')

dotenv.config({ path: './config.env' });

//mongodb+srv://ybairwa786:<PASSWORD>@cluster0.t6bzj27.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//isko ghumake likhna thaa na 
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

//lets connect this project to mongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => console.log('DB Connection Successfully'))


//first read the json file here
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

//actually game now
//IMPORT DATA INTO DATABASE


const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('Data successfully loaded')
    } catch (err) {
        console.log(err)
    }
}


// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log('Data deleted successfully')
    } catch (err) {
        console.log(err)
    }
    process.exit();
}
//using this process.argv we interact with cli
// console.log(process.argv)

if (process.argv[2] === '--import') {
    importData()
}
if (process.argv[2] === '--delete') {
    deleteData()
}
