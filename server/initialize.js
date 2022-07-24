
// Webserver Globals
global.Express        = require('express');
global.WebServer      = Express();
global.Session        = require('express-session');
global.BodyParser     = require('body-parser');
global.Cors           = require('cors');
global.Passport       = require('passport');
global.GoogleStrategy = require('passport-google-oidc');
global.GitHubStrategy = require('passport-github2');

// App Globals
global.Main      = require('./Main');
global.Login     = require('./Login');
global.Routing   = require('./Routing');

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