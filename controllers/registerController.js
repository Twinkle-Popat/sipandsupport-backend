const Creator = require("../models/creator");
const passport = require("passport");

const registerController = {
    async registerCreator(req,res, next){
        try{
            Creator.register({firstName: req.body.firstName,lastName: req.body.lastName,username: req.body.email, userId: req.body.userId}, req.body.password, function(err,user){
                if(err){
                    console.log(err);
                    res.redirect("/register");
                }
        
                else{
                    passport.authenticate("local")(req,res, function(){
                        res.redirect("/dashboard");
                    });
                }
            });
        } catch(err){
            return next(err);
        }

        res.send(req.body.userId);
    }

}

module.exports = registerController;