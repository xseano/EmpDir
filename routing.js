class Routing {
    constructor() {

    }

    async initialize() {
        await this.registerPaths();
    }

    async registerPaths() {
        WebServer.get('/login', (req, res) => {
            // render login view
            res.render("login.ejs");
        });

        WebServer.get('/dashboard', (req, res) => {
            // check if the user has authenticated
            if (req.isAuthenticated()) {
                console.log(req.user);
                res.render("dashboard.ejs", {name: req.user.displayName});
            } else {
                // user needs to relogin
                res.redirect('/login');
            }
        });

        // **temporarily** redirect to login on home page, for testing purposes
        WebServer.get('/', (req, res) => {
            res.redirect('/login');
        });

        WebServer.post('/logout', (req, res) => {
            // async function, callback required
            req.logout((err) => {
                if (err) { return next(err); }
                res.redirect('/login');
            });
        });

        WebServer.get('/auth/google',
            // we want to store the users email and basic profile data for use within the application
            // uses: (future) db lookup
            Passport.authenticate('google', {
                scope: ['email', 'profile']
            })
        );

        WebServer.get('/auth/google/callback',
            // bring us to the main dashboard if successful, back to login if not
            Passport.authenticate('google', {
                successRedirect: '/dashboard',
                failureRedirect: '/login' // go back to login
            })
        );
    }
}

module.exports = Routing;