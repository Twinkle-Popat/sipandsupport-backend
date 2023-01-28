const Creator = require("../models/creator");
const passport = require("passport");

const loginController = {
    async loginCreator(req,res, next){
        try{
            const creator = new Creator({
                username: req.body.username,
                password: req.body.password
            });
        
            req.login(creator, function(err){
                if(err) throw err;
                
                else{
                    passport.authenticate("local")(req,res, function(){
                        res.redirect("/dashboard");
                    });
                }
            });
        } catch(err){
            return next(err);
        }

        res.json(req.body.email);
    }

}

module.exports = loginController;