class Routing {
    constructor() {

    }

    async initialize() {
        await this.registerPaths();
    }

    async registerPaths() {
        WebServer.get(process.env.DASH_PATH, (req, res) => {
            // check if the user has authenticated
            if (req.isAuthenticated()) {
                console.log(req.user);
                //res.render("dashboard.ejs", {name: req.user.displayName});
            } else {
                // user needs to relogin
                res.redirect(process.env.LOGIN_PATH);
            }
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
                scope: ['email', 'openid', 'profile']
            })
        );

        WebServer.get(`${process.env.GOOGLE_AUTH_PATH}/callback`, 
            // bring us to the main dashboard if successful, back to login if not
            Passport.authenticate('google', {
                successRedirect: process.env.SUCCESSFUL_LOGIN_PATH, // proceed to dashboard
                failureRedirect: process.env.FAILED_LOGIN_PATH // go back to login
            })
        );

        WebServer.get(process.env.GITHUB_AUTH_PATH,
            // we want to acquire and store the users email and basic profile data for use within the application
            // uses: (future) db lookup
            Passport.authenticate('github', {
                scope: ['email', 'profile']
            })
        );

        WebServer.get(`${process.env.GITHUB_AUTH_PATH}/callback`, 
            // bring us to the main dashboard if successful, back to login if not
            Passport.authenticate('github', {
                successRedirect: process.env.SUCCESSFUL_LOGIN_PATH, // proceed to dashboard
                failureRedirect: process.env.FAILED_LOGIN_PATH // go back to login
            })
        );

        WebServer.get(process.env.FAILED_LOGIN_PATH, (req, res) => {
            return res.status(401).json({
                success: false,
                message: "failed",
            });
        });

        WebServer.get(process.env.SUCCESSFUL_LOGIN_PATH, (req, res) => {
            // check if the user has authenticated
            if (req.isAuthenticated()) {
                console.log(req.user);
                
                return res.status(200).json({
                    success: true,
                    message: "success",
                    user: req.user,
                    cookies: req.cookies
                });
            } else {
                // user needs to relogin
                return res.status(402).json({
                    success: false,
                    message: "failed2",
                });
            }
        });
    }
}

module.exports = Routing;