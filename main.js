class Main {
    constructor() {
        this.server = null;
        this.host = null;
        this.port = null;

        this.login = new Login();
        this.routing = new Routing();
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
                this.login.initialize(this.host, this.port);  

                console.log(`Webserver deployed at http://${this.host}:${this.port}`);
            });
        } else {
            this.server = WebServer.listen(process.env.WEBSERVER_PORT, () => {     
                this.host = this.server.address().address;
                this.port = this.server.address().port;   
                this.login.initialize(this.host, this.port);

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

        await this.routing.initialize();
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