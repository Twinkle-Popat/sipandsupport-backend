const Creator = require("../models/creator");

const supportController = {
  async supporters(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.params);
      const { hash, message, price } = req.body;
      const creator = await Creator.findOne({ userId: req.params.userId });
      const newsupporter = {
        hash,
        message,
        price,
      };
      
      await creator.updateOne({ $push: { support: newsupporter } });
      res.status(200).json("New supporters added");
    } catch (error) {
      return next(error);
    }
    //res.json(req.body.hash);
  },
};

module.exports=  supportController;