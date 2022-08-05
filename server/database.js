class Database {
    constructor() {
        this.connection = null;
    }

    async initialize() {
        this.connection = MySQL.createConnection({
            host     : process.env.DATABASE_HOST,
            user     : process.env.DATABASE_USR,
            password : process.env.DATABASE_PWD
        });

        await this.connection.connect();
    }

    async setup() {
        // create the db if it doesnt already exist
        this.connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`, (error, result) => {
            if (error) throw error;
        });

        // use our chosen db
        this.connection.query(`USE ${process.env.DATABASE_NAME}`, (error, result) => {
            if (error) throw error;
        });

        // create EmpExt table if it doesnt already exist
        this.connection.query(`CREATE TABLE IF NOT EXISTS EmpExt ( EmployeeID MEDIUMINT, AvatarURL LONGTEXT, BannerURL LONGTEXT, BioText TEXT )`, (error, result) => {
            if (error) throw error;
        });

        // create Contacts table if it doesnt already exist
        this.connection.query(`CREATE TABLE IF NOT EXISTS Contacts ( EmployeeID MEDIUMINT, Contact TINYTEXT, ContactAddr VARCHAR(40) )`, (error, result) => {
            if (error) throw error;
        });

        // create EmpTag table if it doesnt already exist
        this.connection.query(`CREATE TABLE IF NOT EXISTS EmpTag ( EmployeeID MEDIUMINT, TagID MEDIUMINT )`, (error, result) => {
            if (error) throw error;
        });

        // create Tags table if it doesnt already exist
        this.connection.query(`CREATE TABLE IF NOT EXISTS Tags ( TagID MEDIUMINT, TagLabel TINYTEXT )`, (error, result) => {
            if (error) throw error;
        });

        // create Login table if it doesnt already exist
        this.connection.query(`CREATE TABLE IF NOT EXISTS Login ( SocialID BIGINT, EmployeeID MEDIUMINT )`, (error, result) => {
            if (error) throw error;
        });

        if (process.env.WANT_SEED_DB == "true") {
            await this.seedDatabase();
        }
    }

    async getEmployeeID(usr_id) {
        this.connection.query(`SELECT EmployeeID FROM Login WHERE SocialID=${usr_id}`, (error, result) => {
            if (error) throw error;
            console.log(result[0].EmployeeID);
            return result[0].EmployeeID;
        });
    }

    async getEmployeeExt(emp_id) {
        this.connection.query(`SELECT * FROM EmpExt WHERE EmployeeID=${emp_id}`, (error, result) => {
            return result[0];
        });
    }

    async getContacts(emp_id) {
        this.connection.query(`SELECT * FROM Contacts WHERE EmployeeID=${emp_id}`, (error, result) => {
            return result.map(o => Object.assign({}, o));
        });
    }

    async getTags(emp_id) {
        let tags = [];
        this.connection.query(`SELECT * FROM EmpTag WHERE EmployeeID=${emp_id}`, (error, result) => {
            for(let i in result) {
                let tag = result[i];
                this.connection.query(`SELECT * FROM Tags WHERE TagID=${tag.TagID}`, (error, result) => {
                    for(let i in result) {
                        let tag_label = result[i].TagLabel;
                        tags.push(tag_label);
                    }
                });
            }
        });
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
            this.connection.query(`INSERT INTO Contacts values(?, ?, ?)`, [contact.EmployeeID, contact.Contact, contact.ContactAddr], (error, result) => {
                if (error) throw error;
            });
            //console.log(attr, contact);
        }

        for(let attr in empext) {
            let employee = empext[attr];
            this.connection.query(`INSERT INTO EmpExt values(?, ?, ?, ?)`, [employee.EmployeeID, employee.AvatarURL, employee.BannerURL, employee.BioText], (error, result) => {
                if (error) throw error;
            });
            //console.log(attr, employee);
        }

        for(let attr in emptags) {
            let emptag = emptags[attr];
            this.connection.query(`INSERT INTO EmpTag values(?, ?)`, [emptag.EmployeeID, emptag.TagID], (error, result) => {
                if (error) throw error;
            });
            //console.log(attr, emptag);
        }
        
        for(let attr in tags) {
            let tag = tags[attr];
            this.connection.query(`INSERT INTO Tags values(?, ?)`, [tag.TagID, tag.TagLabel], (error, result) => {
                if (error) throw error;
            });
            //console.log(attr, tag);
        }
    }
}

module.exports = Database;