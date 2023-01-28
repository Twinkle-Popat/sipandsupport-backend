const Creator = require("../models/creator");
const Post = require("../models/Post");

var postId = 0;
const postController = {
  async addPost(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.params);
      console.log(req.body);
      
      const creator = await Creator.findOne({ userId: req.params.userId });

      const newUser = Post({
        postId: postId,
        content: req.body.content
    }).save(function (err, data) {
        if (err) throw err;
        postId = postId + 1;
        console.log('Post added');
    });

      res.status(200).json("New post added");
    } catch (error) {
      return next(error);
    }
    // res.json("hello");
  },
};

module.exports=  postController;