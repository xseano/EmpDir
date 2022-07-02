class LoginAuth {
    constructor(host, port) {
        this.host = null;
        this.port = null;
        this.authStrategy;
    }

    async initialize(host, port) {
        this.host = host;
        this.port = port;

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
        return done(null, profile);
    }

}

module.exports = LoginAuth;