class Routing {
    constructor() {

    }

    async initialize() {
        await this.registerPaths();
    }

    async registerPaths() {
        WebServer.get(process.env.LOGIN_PATH, (req, res) => {
            // render login view
            res.render("login.ejs");
        });

        WebServer.get(process.env.DASH_PATH, (req, res) => {
            // check if the user has authenticated
            if (req.isAuthenticated()) {
                console.log(req.user);
                res.render("dashboard.ejs", {name: req.user.displayName});
            } else {
                // user needs to relogin
                res.redirect(process.env.LOGIN_PATH);
            }
        });

        // **temporarily** redirect to login on home page, for testing purposes
        WebServer.get(process.env.HOME_PATH, (req, res) => {
            res.redirect(process.env.LOGIN_PATH);
        });

        WebServer.post(process.env.LOGOUT_PATH, (req, res) => {
            // async function, callback required
            req.logout((err) => {
                if (err) { return next(err); }
                res.redirect(process.env.LOGIN_PATH);
            });
        });

        WebServer.get(process.env.GOOGLE_AUTH_PATH,
            // we want to acquire and store the users email and basic profile data for use within the application
            // uses: (future) db lookup
            Passport.authenticate('google', {
                scope: ['email', 'profile']
            })
        );

        WebServer.get(`${process.env.GOOGLE_AUTH_PATH}/callback`,
            // bring us to the main dashboard if successful, back to login if not
            Passport.authenticate('google', {
                successRedirect: process.env.DASH_PATH, // proceed to dashboard
                failureRedirect: process.env.LOGIN_PATH // go back to login
            })
        );
    }
}

module.exports = Routing;