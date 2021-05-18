var express = require('express');
var router = express.Router();

// index Page Setting
router.get('/', function(req, res){
    res.render('index');
});

router.get('/about', function(req, res){
    res.render('about');
});

module.exports = router;