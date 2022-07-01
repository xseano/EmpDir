class LoginAuth {
    constructor() {
        this.authStrategy;
    }

    async initiate() {
        if (process.env.WANT_GOOGLE_AUTH) {
            this.authStrategy = Passport.use(new GoogleStrategy({
                clientID:     process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: `http://${this.host}:${this.port}/auth/google/callback`,
                passReqToCallback: true
              }, this.registerStrategy));
        } else {
            this.authStrategy = null;
            // add alternate authentication strategies (Twitter, etc)
        }
    }

    async registerStrategy(request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        //return done(null, profile);
    }

}

module.exports = LoginAuth;