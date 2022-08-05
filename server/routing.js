class Routing {
    constructor() {
        this.database = null;
    }

    async initialize() {
        await this.registerPaths();
    }

    async registerDatabase(database) {
        this.database = database;
    }

    async registerPaths() {
        WebServer.get(process.env.DASH_PATH, (req, res) => {
            // check if the user has authenticated
            if (req.isAuthenticated()) {
                console.log(req.user);
                res.redirect(`http://${process.env.WEBSERVER_HOST}:${process.env.PROXY_PORT}${process.env.DASH_PATH}`);
            } else {
                // user needs to relogin
                res.redirect(`http://${process.env.WEBSERVER_HOST}:${process.env.PROXY_PORT}${process.env.LOGIN_PATH}`);
            }
        });

        WebServer.get(process.env.LOGOUT_PATH, (req, res) => {
            // async function, callback required
            req.logout((err) => {
                if (err) { return next(err); }
                res.redirect(`http://${process.env.WEBSERVER_HOST}:${process.env.PROXY_PORT}${process.env.LOGIN_PATH}`);
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
                successRedirect: `http://${process.env.WEBSERVER_HOST}:${process.env.PROXY_PORT}${process.env.DASH_PATH}`, // proceed to dashboard
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
                successRedirect: `http://${process.env.WEBSERVER_HOST}:${process.env.PROXY_PORT}${process.env.DASH_PATH}`, // proceed to dashboard
                failureRedirect: process.env.FAILED_LOGIN_PATH // go back to login
            })
        );

        WebServer.get(process.env.FAILED_LOGIN_PATH, (req, res) => {
            return res.status(401).json({
                status: "failed",
                code: "1000",
                message: "There was an error authenticating your account, please try again."
            });
        });

        WebServer.get(process.env.AUTH_VALIDATION_PATH, async (req, res) => {
            // check if the user has authenticated
            if (req.user) {
                let uid = parseInt(req.user.id);

                let emp_id = await this.database.getEmployeeID(uid); 
                let emp_ext = await this.database.getEmployeeExt(emp_id); 
                let emp_contacts = await this.database.getContacts(emp_id); 
                let emp_tags = await this.database.getTags(emp_id);

                console.log(emp_id);
                console.log(emp_ext);
                console.log(emp_contacts);
                console.log(emp_tags);
                
                
                return res.status(200).json({
                    status: "success",
                    code: "2000",
                    message: "Successfully logged in, welcome.",
                    data: {
                        user: req.user,
                        cookies: req.cookies
                    }
                });


            } else {
                // user needs to relogin
                return res.status(401).json({
                    status: "failed",
                    code: "1001",
                    message: "We failed to process this request, please try again."
                });
            }
        });
    }
}

module.exports = Routing;