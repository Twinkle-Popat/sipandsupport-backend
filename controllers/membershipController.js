const Creator = require("../models/creator");

const membershipController = {
  async addMembership(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.params);
      const { link, plan, amount } = req.body;
      const creator = await Creator.findOne({ userId: req.params.userId });
      const newMember = {
        link,
        plan,
        amount,
      };
      
      await creator.updateOne({ $push: { membership: newMember } });
      res.status(200).json("New membership added");
    } catch (error) {
      return next(error);
    }
    res.json(req.body.plan);
  },
};

module.exports=  membershipController;