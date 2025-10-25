import passport from 'passport';
import local from 'passport-local';
import userModel from '../models/userModel.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body;
        try {
            const user = await userModel.findOne({email: username});
            if (user) {
                return done(null, false);
            }
            const newUser = await userModel.create({
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            });
            return done(null, newUser);
        } catch (error) {
            return done(error, false);
        }
    }));
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({email: username});
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword({user, password})) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
}