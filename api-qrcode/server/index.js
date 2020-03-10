const mongoose = require('mongoose');
const routes = require("../api/index");
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const middleware = require("./middleware");

const port = 6507;

// DB
const mongoUrl = "mongodb://localhost:27017/app-qrcode";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });


// 
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(middleware.tokenCheck);
app.use(routes);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port} D:`)
});

module.exports = app;
