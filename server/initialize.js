
// Webserver Globals
global.Express        = require('express');
global.WebServer      = Express();
global.Session        = require('express-session');
global.BodyParser     = require('body-parser');
global.Cors           = require('cors');
global.Passport       = require('passport');
global.GoogleStrategy = require('passport-google-oidc');
global.GitHubStrategy = require('passport-github2');
global.MySQL          = require('mysql2/promise');
global.Bluebird       = require('bluebird');
global.Fetch          = require('node-fetch');
global.Path         = require('path');

// App Globals
global.Main      = require('./main.js');
global.Login     = require('./login.js');
global.Routing   = require('./routing.js');
global.Database  = require('./database.js');
global.HR = require('./hr.js');

// Config
global.Config    = require('dotenv').config();

// Start the application
const init = async() => {
    try {
        let main = new Main();
        await main.initialize();
    }
    catch(err) {
        console.log(err.message);
    }
};

init();