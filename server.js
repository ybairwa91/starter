const app = require('./app')
////  START SERVER
const port = 3000;
app.listen(port, () => {
    console.log('this is running on port 3000');
});
