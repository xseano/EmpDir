class Login {
    constructor() {
    }

    async initialize() {
        if (process.env.WANT_GOOGLE_AUTH) {
            Passport.use(new GoogleStrategy({
                clientID:     process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: `http://${process.env.WEBSERVER_HOST}${process.env.GOOGLE_AUTH_PATH}/callback`,
                passReqToCallback: true
              }, (request, issuer, profile, cb) => {
                cb(null, profile);
              }));
        }

        if (process.env.WANT_GITHUB_AUTH) {
            Passport.use(new GitHubStrategy({
                clientID:     process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: `http://${process.env.WEBSERVER_HOST}${process.env.GITHUB_AUTH_PATH}/callback`,
                passReqToCallback: true
              }, (request, accessToken, refreshToken, profile, done) => {
                done(null, profile);
              }));
        }
    }
}

module.exports = Login;