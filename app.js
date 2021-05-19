var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// DB Setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once('open', function(){
    console.log('DB Connected!');
});
db.on('error', function(err){
    console.log('Error! : ',err);
});

// Setting
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// Route
app.use('/', require('./routes/index'));
app.use('/posts', require('./routes/posts'));

// Port Setting
var port = 3000;
app.listen(port, function(){
    console.log('Server is Connect! http://localhost:'+port);
});