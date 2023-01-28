const Creator = require("../models/creator");

const postController = {
  async addPost(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.params);
      console.log(req.body);
      
      const { text, hash, commentText } = req.body;
      const creator = await Creator.findOne({ userId: req.params.userId });

      const newPost = {
        text,
        comments: {
            hash,
            commentText
        }
      };
      
      await creator.updateOne({ $push: [{ post: newPost }] });
      res.status(200).json("New post added");
    } catch (error) {
      return next(error);
    }
    // res.json("hello");
  },
};

module.exports=  postController;