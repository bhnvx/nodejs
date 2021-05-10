const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
let url = "mongodb://localhost:27017/bhnvx";
mongoose.connect(url, {useNewUrlParser:true});

const indexRoute = require("./routes/index");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Session = require('express-session');
const flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(Session);

app.use(flash());

var store = new MongoDBStore({
    url: url,
    collection: 'sessions'
});

store.on('error', function(error){
    console.log(error);
});

app.use(Session({
    secret: 'bhnvx',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {maxAge: 1000*60*60},
    store: store
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', indexRoute);

app.listen(PORT, function(){
    console.log('Example app listening on port', PORT);
});