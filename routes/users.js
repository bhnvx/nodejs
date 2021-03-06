var express = require('express');
var router = express.Router();
var User = require('../models/user');
var util = require('../util');

// Index
router.get('/', function (req, res) {
    User.find({})
        .sort({ username: 1 })
        .exec(function (err, users) {
            if (err) return res.json(err);
            res.render('users/index', { users: users });
        });
});

// New
router.get('/new', function (req, res) {
    var user = req.flash('user')[0] || {};
    var errors = req.flash('errors')[0] || {};
    res.render('users/new', { user: user, errors: errors });
});

// Create
router.post('/', function (req, res) {
    User.create(req.body, function (err, user) {
        if (err) {
            req.flash('user', req.body);
            req.flash('errors', util.parseError(err));
            return res.redirect('/users/new');
        }
        res.redirect('/users');
    });
});

// Show
router.get('/:username', function (req, res) {
    User.findOne({ username: req.params.username }, function (err, user) {
        if (err) return res.json(err);
        res.render('users/show', { user: user });
    });
});

// Edit
router.get('/:username/edit', function (req, res) {
    var user = req.flash('user')[0] || {};
    var errors = req.flash('errors')[0] || {};
    if (!user) {
        User.findOne({ username: req.params.username }, function (err, user) {
            if (err) return res.json(err);
            res.render('users/edit', { user: user });
        });
    }
    else {
        res.render('users/edit', { username: req.params.username, user: user, errors: errors });
    }
});

// Update
router.put('/:username', function (req, res, next) {
    User.findOne({ username: req.params.username })
        .select('password')
        .exec(function (err, user) {
            if (err) return res.json(err);

            user.originalPassword = user.password;
            user.password = req.body.newPassword ? req.body.newPassword : user.password;
            for (var p in req.body) {
                user[p] = req.body[p];
            }

            user.save(function (err, user) {
                if (err) {
                    req.flash('user', req.body);
                    req.flash('errors', util.parseError(err));
                    return res.redirect('/users/' + req.params.username + '/edit');
                }
                res.redirect('/users/' + user.username);
            });
        });
});

// Destroy
router.delete('/:username', function (req, res) {
    User.deleteOne({ username: req.params.username }, function (err) {
        if (err) return res.json(err);
        res.redirect('/users');
    });
});

module.exports = router;