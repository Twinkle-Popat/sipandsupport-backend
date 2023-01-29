const Creator = require("../models/creator");
const Post = require("../models/Post");

const postController = {
  async addPost(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.params);
      console.log(req.body);
      
      const creator = await Creator.findOne({ userId: req.params.userId });

      const newUser = Post({
        content: req.body.content,
        userId: req.params.userId
    }).save(function (err, data) {
        if (err) throw err;
        console.log('Post added');
    });

      res.status(200).send(Post.findOne({userId: req.params.userId}));
    } catch (error) {
      return next(error);
    }
    // res.json("hello");
  },
};

module.exports=  postController;