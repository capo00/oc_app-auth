const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const AuthIdentity = require("../abl/auth-identity");
const Config = require("../config/config");

module.exports = {
  init(prefixPath = "/") {
    passport.use(
      new GoogleStrategy(
        {
          clientID: Config.google.clientId,
          clientSecret: Config.google.clientSecret,
          callbackURL: prefixPath + "/" + Config.google.callbackUc,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let identity = await AuthIdentity.getByGoogleId(profile.id);
            if (identity) {
              done(null, identity);
            } else {
              identity = await AuthIdentity.create({
                email: profile.emails[0].value,
                name: profile.displayName,
                firstName: profile.name.givenName,
                surname: profile.name.familyName,
                photo: profile.photos[0]?.value,
                registrationType: "google",
                googleId: profile.id,
              });
              done(null, identity);
            }
          } catch (err) {
            console.error("Unexpected error during working with AuthIdentity.", err);
            done(err, null);
          }
        }
      )
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
      AuthIdentity.get(id).then((user) => done(null, user)).catch((err) => done(err, null));
    });
  }
}
