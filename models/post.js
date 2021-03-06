var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: {type: String, required: [true, 'Title is required!']},
    body: {type: String, required: [true, 'Body is required!']},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
});

var Post = mongoose.model('post', PostSchema);
module.exports = Post;