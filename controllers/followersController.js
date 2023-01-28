const Creator = require("../models/creator");

const followersController = {
  async addFollowers(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.params);
      const { hash } = req.body;
      const creator = await Creator.findOne({ userId: req.params.userId });
      const newMember = hash;
      
      await creator.updateOne({ $push: { followers: newMember } });
      res.status(200).json("New follower added");
    } catch (error) {
      return next(error);
    }
    res.json(req.body.userId);
  },
};

module.exports=  followersController;