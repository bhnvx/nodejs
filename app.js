const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
let url = "mongodb://localhost:27017/bhnvx";
mongoose.connect(url, {useNewUrlParser:true});

const indexRoute = require("./routes/index");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', indexRoute);

app.listen(PORT, function(){
    console.log('Example app listening on port', PORT);
});