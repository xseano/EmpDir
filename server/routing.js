class Routing {
    constructor() {
        this.db = null;
    }

    async initialize() {
        await this.registerPaths();
    }

    async registerDatabase(db) {
        this.db = db;
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

        WebServer.get(process.env.AUTH_VALIDATION_PATH, (req, res) => {
            // check if the user has authenticated
            if (req.user) {
                let data = {
                    EmpID: null,
                    EmpExt: null,
                    Contacts: null,
                    Tags: []
                };

                let uid = parseInt(req.user.id);
                console.log(uid);
                
                this.db.query(`SELECT EmployeeID FROM Login WHERE SocialID=${uid}`, (error, result) => {
                    if (error) throw error;
                    console.log(result[0].EmployeeID);

                    data.EmpID = result[0].EmployeeID;

                    this.db.query(`SELECT * FROM EmpExt WHERE EmployeeID=${data.EmpID}`, (error, result) => {
                        data.EmpExt = result.map(o => Object.assign({}, o));
                    });

                    this.db.query(`SELECT * FROM Contacts WHERE EmployeeID=${data.EmpID}`, (error, result) => {
                        data.Contacts = result.map(o => Object.assign({}, o));
                        
                    });

                    this.db.query(`SELECT * FROM EmpTag WHERE EmployeeID=${data.EmpID}`, (error, result) => {

                        for(let attr in result) {
                            let tag = result[attr];

                            this.db.query(`SELECT * FROM Tags WHERE TagID=${tag.TagID}`, (error, result) => {
                                for(let attr in result) {
                                    let tag_label = result[attr].TagLabel;
                                    data.Tags.push(tag_label);
                                }

                                console.log(data);

                                return res.status(200).json({
                                    status: "success",
                                    code: "2000",
                                    message: "Successfully logged in, welcome.",
                                    data: data
                                });
                            });
                        }
                    });
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