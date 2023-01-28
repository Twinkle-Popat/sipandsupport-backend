import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import findOrCreate from "mongoose-findorcreate";

const creatorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    googleId: String,
    desciption: String,
    socials: [String],
    membership: [{
        link: String,
        plan: String,
        amount: Number
    }],
    support: [{
        hash: String,
        message: String,
        amount: Number
    }],
    followers: [String],
    post: {
        text: String,
        comments: [{
            hash: String,
            commentText: String
        }]
    },
    poll: {
        question: String,
        option: {
            text: String,
            count: Number
        }
    }
});

creatorSchema.plugin(passportLocalMongoose);
creatorSchema.plugin(findOrCreate);

const Creator = mongoose.model("Creator", creatorSchema);

passport.use(Creator.createStrategy());

passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    Creator.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    Creator.findOrCreate({ googleId: profile.id }, function (err, user) {
        console.log(profile);
      return cb(err, user);
    });
  }
));

module.exports = Creator;