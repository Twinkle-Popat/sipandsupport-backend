const Creator = require("../models/creator");

const socialController = {
  async addsocials(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.params);
      const { socials } = req.body;
      const creator = await Creator.findOne({ userId: req.params.userId });
      const newsocial = [
       socials,
      ];
      
      await creator.updateOne({ $push: { socials: newsocial } });
      res.status(200).json("New social media added");
    } catch (error) {
      return next(error);
    }
    //res.json(req.body.plan);
  },
};

module.exports=  socialController;