class Main {
    constructor() {
        this.host = null;
        this.port = null;
        this.loginAuth;
    }

    async initialize() {
        WebServer.use(Session({
            secret: "secret",
            resave: false,
            saveUninitialized: true,
        }));

        Passport.serializeUser((user, done) => { 
            console.log(`\n--------> Serialize User:`);
            console.log(user);        
            done(null, user);
        });

        Passport.deserializeUser((user, done) => { 
            console.log(`\n--------> Deserialized User:`);
            console.log(user);        
            done(null, user);
        });

        WebServer.use(Passport.initialize());
        WebServer.use(Passport.session());
        WebServer.use(this.logging);
        
        let server = WebServer.listen(process.env.WEBSERVER_PORT, () => {
            this.host = server.address().address;
            this.port = server.address().port;
            
            console.log(`WebServer deployed at http://${this.host}:${this.port}`);
        });

        WebServer.get('/auth/google',
            Passport.authenticate('google', {
                scope: ['email', 'profile']
            })
        );

        WebServer.get('/auth/google/callback',
            Passport.authenticate('google', {
                successRedirect: '/dashboard',
                failureRedirect: '/' // go back to login
            })
        );
    }

    async logging(req, res, next) {
        console.log(`\n req.session.passport -------> `);
        console.log(req.session.passport);
      
        console.log(`\n req.user -------> `);
        console.log(req.user);
      
        console.log("\n Session and Cookie")
        console.log(`req.session.id -------> ${req.session.id}`);
        console.log(`req.session.cookie -------> `);
        console.log(req.session.cookie);
      
        console.log("===========================================\n");
    
        next();
    }
}

module.exports = Main;