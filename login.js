class Login {
    constructor(host, port) {
        this.host = null;
        this.port = null;
    }

    async initialize(host, port) {
        this.host = host;
        this.port = port;

        if (process.env.WANT_GOOGLE_AUTH) {
            Passport.use(new GoogleStrategy({
                clientID:     process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: `http://${this.host}:${this.port}${process.env.GOOGLE_AUTH_PATH}/callback`,
                passReqToCallback: true
              }, this.registerStrategy));
        }

        if (process.env.WANT_GITHUB_AUTH) {
            Passport.use(new GitHubStrategy({
                clientID:     process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: `http://${this.host}:${this.port}${process.env.GITHUB_AUTH_PATH}/callback`,
                passReqToCallback: true
              }, this.registerStrategy));
        }
    }

    async registerStrategy(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }

}

module.exports = Login;