const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = require('./src/config/config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.get('/', (req, res) => {
    res.json({
        "message": "Hello Guys, " + "Welcome to Market-Place"
    });
});
require('./src/routes/routes.js')(app);
app.listen(8000, () => {
    console.log("Waiting.. Server is listening on port 8000");
});