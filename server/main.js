class Main {
    constructor() {
        this.server = null;
        this.host = null;
        this.port = null;
        this.db = null;

        this.login = new Login();
        this.routing = new Routing();
    }

    async initialize() {
        await this.startDatabase();
        await this.setupDatabase();
        await this.configSession();
        await this.configServer();
        await this.startWebserver();
        await this.configSerialization();
        await this.routing.initialize();
    }

    async startDatabase() {
        this.db = MySQL.createConnection({
            host     : process.env.DATABASE_HOST,
            user     : process.env.DATABASE_USR,
            password : process.env.DATABASE_PWD
        });

        await this.db.connect();
    }

    async setupDatabase() {
        // create the db if it doesnt already exist
        this.db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`, (error, result) => {
            if (error) throw error;
        });

        // use our chosen db
        this.db.query(`USE ${process.env.DATABASE_NAME}`, (error, result) => {
            if (error) throw error;
        });

        // create EmpExt table if it doesnt already exist
        this.db.query(`CREATE TABLE IF NOT EXISTS EmpExt ( EmployeeID MEDIUMINT, AvatarURL LONGTEXT, BannerURL LONGTEXT, BioText TEXT )`, (error, result) => {
            if (error) throw error;
        });

        // create Contacts table if it doesnt already exist
        this.db.query(`CREATE TABLE IF NOT EXISTS Contacts ( EmployeeID MEDIUMINT, Contact TINYTEXT, ContactAddr VARCHAR(40) )`, (error, result) => {
            if (error) throw error;
        });

        // create EmpTag table if it doesnt already exist
        this.db.query(`CREATE TABLE IF NOT EXISTS EmpTag ( EmployeeID MEDIUMINT, TagID MEDIUMINT )`, (error, result) => {
            if (error) throw error;
        });

        // create Tags table if it doesnt already exist
        this.db.query(`CREATE TABLE IF NOT EXISTS Tags ( TagID MEDIUMINT, TagLabel TINYTEXT )`, (error, result) => {
            if (error) throw error;
        });

        // create Login table if it doesnt already exist
        this.db.query(`CREATE TABLE IF NOT EXISTS Login ( SocialID BIGINT, EmployeeID MEDIUMINT )`, (error, result) => {
            if (error) throw error;
        });

        this.routing.registerDatabase(this.db);

        if (process.env.WANT_SEED_DB == "true") {
            await this.seedDatabase();
        }
    }

    async seedDatabase() {
        let fs = require('fs');
        console.log("seeding db");
 
        let contacts = JSON.parse(fs.readFileSync('db-seed/Contacts.json'));
        let empext = JSON.parse(fs.readFileSync('db-seed/EmpExt.json'));
        let emptags = JSON.parse(fs.readFileSync('db-seed/EmpTags.json'));
        let tags = JSON.parse(fs.readFileSync('db-seed/Tags.json'));

        for(let attr in contacts) {
            let contact = contacts[attr];
            this.db.query(`INSERT INTO Contacts values(?, ?, ?)`, [contact.EmployeeID, contact.Contact, contact.ContactAddr], (error, result) => {
                if (error) throw error;
            });
            //console.log(attr, contact);
        }

        for(let attr in empext) {
            let employee = empext[attr];
            this.db.query(`INSERT INTO EmpExt values(?, ?, ?, ?)`, [employee.EmployeeID, employee.AvatarURL, employee.BannerURL, employee.BioText], (error, result) => {
                if (error) throw error;
            });
            //console.log(attr, employee);
        }

        for(let attr in emptags) {
            let emptag = emptags[attr];
            this.db.query(`INSERT INTO EmpTag values(?, ?)`, [emptag.EmployeeID, emptag.TagID], (error, result) => {
                if (error) throw error;
            });
            //console.log(attr, emptag);
        }
        
        for(let attr in tags) {
            let tag = tags[attr];
            this.db.query(`INSERT INTO Tags values(?, ?)`, [tag.TagID, tag.TagLabel], (error, result) => {
                if (error) throw error;
            });
            //console.log(attr, tag);
        }
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
        if (process.env.DEV_ENV) {
            this.server = WebServer.listen(process.env.WEBSERVER_PORT, process.env.WEBSERVER_HOST, () => {  
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
        WebServer.use(Express.json());

        // logging middleware
        //WebServer.use(this.logging);

        // CORS 
        WebServer.use(Cors({
            origin: `http://${process.env.WEBSERVER_HOST}:${process.env.PROXY_PORT}`,
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