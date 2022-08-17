class Main {
    constructor() {
        this.server = null;
        this.host = null;
        this.port = null;
        this.db = null;

        this.login = new Login();
        this.routing = new Routing();
        this.database = new Database();
        this.hr = new HR();
    }

    async initialize() {
        await this.configSession();
        await this.configServer();
        await this.startWebserver();
        await this.configSerialization();

        await this.login.initialize(); 
        await this.database.initialize();
        await this.database.setup();
        if (process.env.WANT_SEED_DB == "true") { await this.database.seed() }
        
        await this.routing.initialize();
        await this.routing.registerDatabase(this.database);
        await this.hr.registerDatabase(this.database);
        await this.routing.registerHR(this.hr);
    }

    async configSession() {
        // configure our session state manager
        WebServer.use(Session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge : (process.env.COOKIE_DURATION_HOURS * 60 * 60 * 1000) }
        }));
    }

    async startWebserver() {
        this.server = WebServer.listen(process.env.WEBSERVER_PORT, () => {  
            this.host = this.server.address().address;
            this.port = this.server.address().port; 

            console.log(`Webserver deployed at http://${this.host}:${this.port}`);
        });
    }

    async configServer() {
        // configure our passport instance
        WebServer.use(Passport.initialize());
        WebServer.use(Passport.session());
        WebServer.use(Express.json());

        // logging middleware
        WebServer.use(this.logging);

        // CORS 
        WebServer.use(Cors({
            origin: `http://${process.env.CLIENT_HOST}`,
            methods: "GET, POST, PUT, PATCH, DELETE",
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
            done(null, user);
        });

        Passport.deserializeUser((user, done) => {       
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