class Main {
    constructor() {
        this.server = null;
        this.host = null;
        this.port = null;

        this.loginAuth = new LoginAuth();
    }

    async initialize() {
        WebServer.use(Session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie : { secure : false, maxAge : (process.env.COOKIE_DURATION_HOURS * 60 * 60 * 1000) }
        }));

        WebServer.use(Passport.initialize());
        WebServer.use(Passport.session());
        WebServer.use(this.logging);
        
        if (process.env.DEV_ENV) {
            this.server = WebServer.listen(process.env.WEBSERVER_PORT, "127.0.0.1", () => {  
                this.host = this.server.address().address;
                this.port = this.server.address().port;     
                this.loginAuth.initialize(this.host, this.port);  

                console.log(`Webserver deployed at http://${this.host}:${this.port}`);
            });
        } else {
            this.server = WebServer.listen(process.env.WEBSERVER_PORT, () => {     
                this.host = this.server.address().address;
                this.port = this.server.address().port;   
                this.loginAuth.initialize(this.host, this.port);  

                console.log(`Webserver deployed at http://${this.host}:${this.port}`);
            });
        }

        Passport.serializeUser((user, done) => { 
            console.log(`Serialized:`);
            console.log(user);        
            done(null, user);
        });

        Passport.deserializeUser((user, done) => {
            console.log(`Deserialized:`);
            console.log(user);        
            done(null, user);
        });

        WebServer.get('/login', (req, res) => {
            // render login view
            res.render("login.ejs");
        });

        WebServer.get('/dashboard', (req, res) => {
            // check if the user has authenticated
            if (this.isAuthenticated(req)) {
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

    async isAuthenticated(req) {
        // checks that the user has a valid session 
        return req.isAuthenticated();
    }

    async logging(req, res, next) {
        console.log("===========================================");
        console.log(`req.session.passport: `);
        console.log(req.session.passport);
      
        console.log(`req.user: `);
        console.log(req.user);
    
        console.log(`req.session.id: ${req.session.id}`);
        console.log(`req.session.cookie: `);
        console.log(req.session.cookie);
        console.log("===========================================");
    
        next();
    }
}

module.exports = Main;