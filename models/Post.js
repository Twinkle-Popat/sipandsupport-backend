

const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: String,
    content: String,
    comments: [{
        hash: String,
        commentText: String
    }]
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
