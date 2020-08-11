import passport from "passport"; // Auth middleware
import passportLocal from "passport-local"; // How are we authenticating
import passportJwt from "passport-jwt";
import User from "./models/UserModel.js";
import config from "./config/config.js";
import GoogleStrategy from "passport-google-oauth20";

// Extract jwt token from the request
const cookieExtractor = (req) => {
  let token = null;
  // If req obj exists and req.cookies is not empty
  if (req && req.cookies) token = req.cookies["access_token"];
  return token;
};

// Authorization (to protect a resource/endpoint)
const JwtStrategy = passportJwt.Strategy;
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.jwt.secretKey, // Key used to sign token to check if token is legit when extracted
    },
    (payload, done) => {
      // payload is basically the data of the cookie (token)
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        // If user not null, no error and pass user
        else return done(null, false); // No error, but no user with that primary key
      });
    }
  )
);

// LocalStrategy(verifyCallback(username, password, doneCallback))
export const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      // done(error, boolean if found username)
      if (err) return done(err); // Query error
      if (!user) return done(null, false); // no user exists
      user.comparePassword(password, done); // Check if password is correct (from User.js)
    });
  })
);
