const app = require('./app')

// console.log(app.get('env'))
console.log(process.env)


////  START SERVER
const port = 3000;
app.listen(port, () => {
    console.log('this is running on port 3000');
});


/////////////////
//nodejs and express
