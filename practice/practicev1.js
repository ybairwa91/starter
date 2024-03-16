//making notes of expressjs do it from here

/*
1.
///   How to setup expressjs and use get request to fulfil
//  some request
//lets practice expressjs

//first lets install it
const express = require('express');
//app contains method which helpful...
const app = express();

// Get request basically means client want to request some data and
//u should provide it
//callback functioon provides two parameters one is request and
//another one is response
//this is how we send response
app.get('/', (req, res) => {
    res.status(200).send('hello')
})

//this is entry point for listening port or saying to start server
// app.listen(8000, (err) => {
//     console.log('hi you are listening at 8000 ');
// })
const port = 8000;
app.listen(8000, (err) => {
    console.log('hi you are listening at 8000 ');
})

/////////////////////
// 2.different res way to send data[send,json,]
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'hello'
    })
})

app.listen(8000, () => {
    console.log('this is running on port 8000');
})


//3.calling different values for different url is called routing
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'hello'
    })
})

app.listen(8000, () => {
    console.log('this is running on port 8000');
})
///////////////////
// Post HTTP Method
//it basically create something from the client side and then send to
//server side then server side react to it
//in simple words we create thing using POSTing

const express = require('express');
const app = express();

//see when we use posting then definitely server reacts basis on client
//data now to fetch client data on our console we use req.body method
//but remember this method need a middleware
//and we install any middleware using app.use(middleware__name)
//here express.json() middleware basically to fetch client side data.
app.use(express.json())

// GET Request
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'u successfully got the data'
    })
})

//POST Request
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'successPost',
        message: 'you successful in creating a data'
    })
})
app.listen(8000, () => {
    console.log('this is running on port 8000');
})

//////////////
//Lets do routing
const express = require('express');
const app = express();

app.use(express.json())

// GET Request
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'u successfully got the data'
    })
})



//POST Request
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'successPost',
        message: 'you successful in creating a data'
    })
})

//
app.get('/:id', (req, res) => {
    res.status(200).send('hi')
})


app.listen(8000, () => {
    console.log('this is running on port 8000');
})

//////////////
//4.some more routing
//Lets do routing
const express = require('express');
const app = express();
app.use(express.json())
// GET Request
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'u successfully got the data'
    })
})
//POST Request
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'successPost',
        message: 'you successful in creating a data'
    })
})
//
app.get('/:id', (req, res) => {
    res.status(200).send('hi')
})
app.get('/:id/:id', (req, res) => {
    res.status(200).send('hihi')
})
app.listen(8000, () => {
    console.log('this is running on port 8000');
})


//////////////
//4.some practice
//Lets do routing and how to get url endpoint using req.params
const express = require('express');
const app = express();
app.use(express.json())
// GET Request
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'u successfully got the data'
    })
})
//POST Request
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'successPost',
        message: 'you successful in creating a data'
    })
})
//
app.get('/:id', (req, res) => {
    console.log(req.params);
    if (req.params.id > 10) {

        res.status(400).json({
            status: 'failed',
            message: 'this is out of range'

        })
    }
    else
        res.status(200).json({
            status: 'success',
            message: 'this is what u want'
        })
})

app.listen(8000, () => {
    console.log('this is running on port 8000');
})

//////////////
//5. UPDATE IN EXPRESSJS

const express = require('express');
const app = express();
app.use(express.json())
// GET Request
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'u successfully got the data'
    })
})
//POST Request
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'successPost',
        message: 'you successful in creating a data'
    })
})
//
app.get('/:id', (req, res) => {
    console.log(req.params);
    if (req.params.id > 10) {

        res.status(400).json({
            status: 'failed',
            message: 'this is out of range'

        })
    }
    else
        res.status(200).json({
            status: 'success',
            message: 'this is what u want'
        })
})

//update using patch and put
//logic is not much useful but to understand that its by patch http url we
//update things

app.patch('/update', (req, res) => {
    if (req.params.id * 1 > 50) {
        return res.status(404).json({
            status: 'fail',
            message: "invalid id"
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...></updated>'
        }
    })

})
app.listen(8000, () => {
    console.log('this is running on port 8000');
})

//////////////
//5. DELETE HTTP REQUEST IN EXPRESSJS

const express = require('express');
const app = express();
app.use(express.json())
// GET Request
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'u successfully got the data'
    })
})
//POST Request
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'successPost',
        message: 'you successful in creating a data'
    })
})
//
app.get('/:id', (req, res) => {
    console.log(req.params);
    if (req.params.id > 10) {

        res.status(400).json({
            status: 'failed',
            message: 'this is out of range'

        })
    }
    else
        res.status(200).json({
    status: 'success',
    message: 'this is what u want'
})
})

//update using patch and put
//logic is not much useful but to understand that its by patch http url we
//update things

app.patch('/update', (req, res) => {
    if (req.params.id * 1 > 50) {
        return res.status(404).json({
            status: 'fail',
            message: "invalid id"
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...></updated>'
        }
    })

})


//DELETE
//focus on code and route
app.delete('/delete', (req, res) => {
    res.status(500).json({
        status: "",
        message: 'this is delete request'
    })
})
app.listen(8000, () => {
    console.log('this is running on port 8000');
})

////////////////////////////////////////////
///Learning about MIDDLEWARES
const express = require('express');
const app = express();
const morgan = require('morgan');
// MIDDLEWARES
//See they execute in the middle of request response cycle

//1.
app.use(express.json())
//2.morgan middleware
app.use(morgan('dev'))
//3.create our own middleware
app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
})

// GET Request
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'u successfully got the data'
    })
})
//POST Request
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'successPost',
        message: 'you successful in creating a data'
    })
})
//Get request.
app.get('/:id', (req, res) => {
    console.log(req.params);
    if (req.params.id > 10) {

        res.status(400).json({
            status: 'failed',
            message: 'this is out of range'

        })
    }
    else
        res.status(200).json({
            status: 'success',
            message: 'this is what u want'
        })
})
//update using patch and put
//logic is not much useful but to understand that its by patch http url we
//update things
app.patch('/update', (req, res) => {
    if (req.params.id * 1 > 50) {
        return res.status(404).json({
            status: 'fail',
            message: "invalid id"
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...></updated>'
        }
    })

})
//DELETE
//focus on code and route
app.delete('/delete', (req, res) => {
    res.status(500).json({
        status: "",
        message: 'this is delete request'
    })
})
app.listen(8000, () => {
    console.log('this is running on port 8000');
})



///////////////////////////
///Learning about how to create route handlers

const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
})

//4.ROUTE HANDLERS
const getRequest = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'u successfully got the data'
    })
}
const createHttpRequest = (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'successPost',
        message: 'you successful in creating a data'
    })
}
const getRequestWithId = (req, res) => {
    console.log(req.params);
    if (req.params.id > 10) {

        res.status(400).json({
            status: 'failed',
            message: 'this is out of range'

        })
    }
    else
        res.status(200).json({
            status: 'success',
            message: 'this is what u want'
        })
}

const updateRequest = (req, res) => {
    if (req.params.id * 1 > 50) {
        return res.status(404).json({
            status: 'fail',
            message: "invalid id"
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...></updated>'
        }
    })

}

const deleteRequest = (req, res) => {
    res.status(500).json({
        status: "",
        message: 'this is delete request'
    })
}
///////////////////////////////////
app.get('/', getRequest)
app.post('/', createHttpRequest)
app.get('/:id', getRequestWithId)
app.patch('/update', updateRequest)
app.delete('/delete', deleteRequest)



app.listen(8000, () => {
    console.log('this is running on port 8000');
})


//////////////////////////
////////CHAINING IN ROUTE METHODS
///chaining helpful when u perform different http method on same url
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
})

//4.ROUTE HANDLERS
const getRequest = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'u successfully got the data'
    })
}
const createHttpRequest = (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'successPost',
        message: 'you successful in creating a data'
    })
}
const getRequestWithId = (req, res) => {
    console.log(req.params);
    if (req.params.id > 10) {

        res.status(400).json({
            status: 'failed',
            message: 'this is out of range'

        })
    }
    else
        res.status(200).json({
            status: 'success',
            message: 'this is what u want'
        })
}

const updateRequest = (req, res) => {
    if (req.params.id * 1 > 50) {
        return res.status(404).json({
            status: 'fail',
            message: "invalid id"
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...></updated>'
        }
    })

}

const deleteRequest = (req, res) => {
    res.status(500).json({
        status: "",
        message: 'this is delete request'
    })
}

// app.get('/', getRequest)
// app.post('/', createHttpRequest)
// app.get('/:id', getRequestWithId)
// app.patch('/update', updateRequest)
// app.delete('/delete', deleteRequest)
app.route('/').get(getRequest).post(createHttpRequest)
app.route('/:id').get(getRequestWithId)
app.route('/update').patch(updateRequest)
app.route('/delete').delete(deleteRequest)

app.listen(8000, () => {
    console.log('this is running on port 8000');
})


//lets refractor our code into smaller modules
const express = require('express');
const app = express();
const morgan = require('morgan');
const practiceRoutes = require('./practiceRoutes')

app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
})


// app.get('/', getRequest) is same as
// app.route('/').get(getRequest)
// app.post('/', createHttpRequest) is same as
// app.route('/').Post(createHttpRequest)
//now we can call both in chaining how see
//app.route('/').get(getRequest).post(createHttpRequest)
// app.get('/:id', getRequestWithId)
// app.patch('/update', updateRequest)
// app.delete('/delete', deleteRequest)
/////////////////////////////
//different way to call http request using app.route()................
app
.route('/')
    .get(getRequest)
    .post(createHttpRequest)
app.
    route('/:id')
    .get(getRequestWithId)
app
    .route('/update')
    .patch(updateRequest)
app
.route('/delete')
    .delete(deleteRequest)

    
    
    app.listen(8000, () => {
        console.log('this is running on port 8000');
    })


    //////////////////////
    // Learn Mounting
    
const express = require('express');
const app = express();
const morgan = require('morgan');
const practiceRoutes = require('./practiceRoutes')

app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
})

//////////////////
//lets create router for each route to handle

//here app is basically express(),means expressjs has methods called an app object and now we fetch different method from this object
//  ,now router is one such another objects which contains all these methods
//lets implement it.
//THis process also know as mounting.

//but how to connect it with the app,so basically we create it as a middleware ,
//since from request to response cycle they will be called depends on the
//URL
const router = express.Router();
//lets create as middleware
//app.use(path,callback)
app.use('', router)

router
.route('/')
.get(getRequest)
.post(createHttpRequest)
router.
route('/:id')
.get(getRequestWithId)
router
.route('/update')
    .patch(updateRequest)
router
.route('/delete')
.delete(deleteRequest)


*/


//////////////////////////////////////

const express = require('express');
const morgan = require('morgan');
const practiceRoutes = require('./practiceRoutes')

const app = express();
const router = express.Router();


app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
})

///ROUTE
app.use('', router)

module.exports = app;

