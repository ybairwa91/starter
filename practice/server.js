const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./practice');


dotenv.config({ path: './../config.env' })

mongoose.connect('mongodb+srv://ybairwa786:<PASSWORD>@cluster0.cbpawhg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB connections successful")
)
app.listen(8000, () => {
    console.log('this is running on port 8000');
})