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