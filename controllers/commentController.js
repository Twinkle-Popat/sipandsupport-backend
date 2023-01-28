const Creator = require("../models/creator");
const Post = require("../models/Post");

const commentController = {
    async addComment(req, res, next){
        try{
            console.log(req.body);
            console.log(req.params);
            console.log(req.body);
            
            const { hash, commentText } = req.body;
            const creator = await Creator.findOne({ userId: req.params.userId });
            const post = await Post.findById(req.body.id);
    
            const newComment = {
                hash,
                commentText
              };
            
            await post.updateOne({ $push: { comments: newComment } });
            res.status(200).json("New comment added");
    
        }
        catch (error) {
            return next(error);
        }
      }
};

module.exports = commentController;