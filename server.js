/*
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

//basically changed to password from the env file
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

//          using mongoose and connecting it. and it returns a promise
// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// }).then(con => {
//     console.log(con.connections);
//     console.log('DB connection successful')
// })

//  Connect with naturr

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log('DB connection successful')
)

//         connect with local database
// mongoose.connect(process.env.DATABASE_LOCAL,
//     {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//     }
// ).then(() => console.log('Connected successfuly'))

/////////////////////////////////////////////////
//IMPLEMENT SCHEMA,MODELS AND CREATE A SIMPLE TOUR
//mongoose is all about models and model is like a blueprint
//that we use to create models,if u want to understand then suppose it as classes in js and we create objects in js.
//so we create models in mongoose in order to create documents in it.,also to query update and delete these documents
//so to perfom each CRUD operation
//so create,read,update and delete operation we need mongoose model and in order to create a model we actually need a schema.
//so we actually create models out of schema and then we use the schema to describe or validate the data,and all kind of stuffs we going to learn


// const tourSchema=new mongoose.Schema({
//   name:String,
//   rating:Number,
//   price:Number,
// })



// const tourSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },

//     rating: Number,
//     price: {
//         type: Number,
//         required: true,
//     }
// })

// const tourSchema = new mongoose.Schema(

//     {
//         name: {
//             type: String,
//             required: [true, 'A tour must have a name']
//         },
//         rating: Number,

//         price: {
//             type: Number,
//             required: [true, 'A tour must have a price']
//         }


//     }
// )
///////////////////////
//specifying schema

const tourSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true

        },

        rating: {
            type: Number,
            default: 4.5
        },

        price: {
            type: Number,
            required: [true, 'A tour must have a price']
        }


    }
);

///
//create model out of this tourSchema
const Tour = mongoose.model('Tourr', tourSchema)

//lets create document since we developed our scheme and a model out of it ,now times to create a doc

//create an instance of Tour Model which we call it document basically in mongooDB


const testTour = new Tour({
    name: 'The Park Hikers',
    rating: 4.7,
    price: 497
})

///////////////////////////////////////
// testTour.save()
///////////////////////////////////


testTour.save().then(doc => {
    console.log(doc)
}).catch(err => {
    console.log('ERROR🎃:', err)
})

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`this is running on port ${port}`);
});




////////////////////////////////////

//Create another tour



// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const app = require('./app');

// dotenv.config({ path: './config.env' });


// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);



// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// }).then(() => console.log('DB connection successful')
// )


// const tourSchema = new mongoose.Schema(

//     {
//         name: {
//             type: String,
//             required: [true, 'A tour must have a name'],
//             unique: true
//         },

//         rating: {
//             type: Number,
//             default: 4.5
//         },

//         price: {
//             type: Number,
//             required: [true, 'A tour must have a price']
//         }
//     }


// );

// const Tour = mongoose.model('Tourr', tourSchema)

// const testTour = new Tour({
//     name: 'The Park Camper',
//     price: 997

// })


// testTour.save().then(doc => {
//     console.log(doc)
// }).catch(err => {
//     console.log('ERROR🎃:', err)
// })

// const port = process.env.port || 3000;

// app.listen(port, () => {
//     console.log(`this is running on port ${port}`);
// });


///////////////////////////////

//PRACTICE

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log('DB Connection Successful'))


const topSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
        default: 100,
    }


})

const Top = mongoose.model('top', topSchema);

const testTop = new Top({
    name: "hello",
    price: 903249,
    rating: 4.8
})

testTop.save().then(doc => console.log(doc))

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`this is running on port ${port}`);
});

///////////////////////////////////
//back to App

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);



mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log('DB connection successful')
)


const tourSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true
        },

        rating: {
            type: Number,
            default: 4.5
        },

        price: {
            type: Number,
            required: [true, 'A tour must have a price']
        }
    }


);

const Tour = mongoose.model('Tourr', tourSchema)

const testTour = new Tour({
    name: 'The Park Camper',
    price: 997

})


testTour.save().then(doc => {
    console.log(doc)
}).catch(err => {
    console.log('ERROR🎃:', err)
})

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`this is running on port ${port}`);
});

*/

///////////////////////////////////

//AFTER MVC ARCHITECTURE
/*

const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');


//mongodb+srv://ybairwa786:<PASSWORD>@cluster0.t6bzj27.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 
//[DATABASE_PASSWORD = gmj6fAqh8LXJG1gu]
//isko ghumake likhna thaa na 
const DB = process.env.DATABASE.replace('<PASSWORD>',
    process.env.DATABASE_PASSWORD);

//lets connnect our expressjs to mongoDB database as well using mongoose driver
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful')
)

//baki ki chize tourModel me daldi models folder banake kyuki mvc ne bola hai

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`this is running on port ${port}`);
});

*/
//////////////////////////////////////////////////////////

const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));
//   .catch(() => console.log('ERROR'));

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`this is running on port ${port}`);
});

// HANDLING ALL REJECTED PROMISES
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION');
  process.exit(1);
});
