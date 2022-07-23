class Main {
    constructor() {
        this.server = null;
        this.host = null;
        this.port = null;

        this.login = new Login();
        this.routing = new Routing();
    }

    async initialize() {
        await this.configSession();
        await this.configServer();
        await this.startWebserver();
        await this.configSerialization();
        await this.routing.initialize();
    }

    async configSession() {
        // configure our session management service
        WebServer.use(Session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: { 
                secure : false, 
                maxAge : (process.env.COOKIE_DURATION_HOURS * 60 * 60 * 1000) 
            }
        }));
    }

    async startWebserver() {
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
    }

    async configServer() {
        // configure our passport instance
        WebServer.use(Passport.initialize());
        WebServer.use(Passport.session());

        // logging middleware
        WebServer.use(this.logging);

        // CORS 
        WebServer.use(Cors({
            origin: "http://localhost:3000",
            methods: "GET, POST, PUT, DELETE",
            credentials: true,
          }));
        
        /*WebServer.all('*', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });*/
    }

    async configSerialization() {
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