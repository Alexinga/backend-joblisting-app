import passport from "passport";
import {
  Strategy as GoogleStrategy,
  StrategyOptionsWithRequest,
} from "passport-google-oauth20";
import prisma from "../../prisma";

const options: StrategyOptionsWithRequest = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "http://localhost:5528/api/auth/google/callback",
  passReqToCallback: true,
};

passport.use(
  new GoogleStrategy(
    options,
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const googleEmail = profile.emails?.[0].value;
        const googleName = profile.displayName;

        if (!googleEmail) return done(null, false);

        let user = await prisma.user.findUnique({
          where: { email: googleEmail },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              authProvider: "GOOGLE",
              email: googleEmail,
              name: googleName,
              password: null, // no password for OAuth users
            },
          });
        }

        return done(null, user); // will be available in req.user
      } catch (error) {
        done(error, undefined);
      }
    }
  )
);

// CREATE SESSIONS only if you want passport to handle authentication
// Since I created my own JWT no need for sessions
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
