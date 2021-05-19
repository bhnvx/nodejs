var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
});

var Post = mongoose.model('post', PostSchema);
module.exports = Post;