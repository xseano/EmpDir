class Database {
    constructor() {
        this.connection = null;
    }

    async initialize() {
        this.connection = await MySQL.createConnection({
            host     : process.env.DATABASE_HOST,
            user     : process.env.DATABASE_USR,
            password : process.env.DATABASE_PWD,
            Promise  : Bluebird,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async setup() {
        // create the db if it doesnt already exist
        await this.connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`);

        // use our chosen db
        await this.connection.query(`USE ${process.env.DATABASE_NAME}`);

        // create EmpExt table if it doesnt already exist
        await this.connection.execute(`CREATE TABLE IF NOT EXISTS EmpExt ( EmployeeID MEDIUMINT NOT NULL, AvatarURL LONGTEXT, BannerURL LONGTEXT, BioText TEXT, MobilePhone VARCHAR(12), PRIMARY KEY (EmployeeID) )`);

        // create Contacts table if it doesnt already exist
        await this.connection.execute(`CREATE TABLE IF NOT EXISTS Contacts ( EmployeeID MEDIUMINT, Contact TINYTEXT, ContactAddr VARCHAR(40) NOT NULL )`);

        // create EmpTag table if it doesnt already exist
        await this.connection.execute(`CREATE TABLE IF NOT EXISTS EmpTag ( EmployeeID MEDIUMINT, TagID MEDIUMINT NOT NULL )`);

        // create Tags table if it doesnt already exist
        await this.connection.execute(`CREATE TABLE IF NOT EXISTS Tags ( TagID MEDIUMINT NOT NULL, TagLabel TINYTEXT )`);

        // create Login table if it doesnt already exist
        await this.connection.execute(`CREATE TABLE IF NOT EXISTS Login ( SocialID VARCHAR(40) NOT NULL, EmployeeID MEDIUMINT )`);
    }

    async getEmployeeID(usr_id) {
        // use our chosen db
        await this.connection.query(`USE ${process.env.DATABASE_NAME}`);

        let [result, rows] = await this.connection.query(`SELECT EmployeeID FROM Login WHERE SocialID=${usr_id}`);
        return (result[0] ? result[0].EmployeeID : null);
    }

    async getEmployeeExt(emp_id) {
        // use our chosen db
        await this.connection.query(`USE ${process.env.DATABASE_NAME}`);

        let [result, rows] = await this.connection.execute(`SELECT * FROM EmpExt WHERE EmployeeID=?`, [emp_id]);
        return (result[0] ? result[0] : null);
    }

    async getContacts(emp_id) {
        // use our chosen db
        await this.connection.query(`USE ${process.env.DATABASE_NAME}`);

        let [result, rows] = await this.connection.execute(`SELECT * FROM Contacts WHERE EmployeeID=?`, [emp_id]);
        return (result ? result : null);
    }

    async getTags(emp_id) {
        // use our chosen db
        await this.connection.query(`USE ${process.env.DATABASE_NAME}`);
        
        let tags = [];
        let [result, rows] = await this.connection.execute(`SELECT * FROM EmpTag WHERE EmployeeID=?`, [emp_id]);

        for(let i in result) {
            let tag = result[i];
            let [result2, rows2] =  await this.connection.execute(`SELECT * FROM Tags WHERE TagID=?`, [tag.TagID]);
            for(let i in result2) {
                let tag_label = result2[i].TagLabel;
                tags.push(tag_label);
            }
        }

        return (tags ? tags : null);
    }

    async seed() {
        let fs = require('fs');
        console.log("seeding db");
 
        let contacts = JSON.parse(fs.readFileSync('db-seed/Contacts.json'));
        let empext = JSON.parse(fs.readFileSync('db-seed/EmpExt.json'));
        let emptags = JSON.parse(fs.readFileSync('db-seed/EmpTags.json'));
        let tags = JSON.parse(fs.readFileSync('db-seed/Tags.json'));

        for(let attr in contacts) {
            let contact = contacts[attr];
            let [result, rows] = await this.connection.execute(`INSERT INTO Contacts values(?, ?, ?)`, [contact.EmployeeID, contact.Contact, contact.ContactAddr]);
            //console.log(result, rows);
        }

        for(let attr in empext) {
            let employee = empext[attr];
            let [result, rows] = await this.connection.execute(`INSERT INTO EmpExt values(?, ?, ?, ?, ?)`, [employee.EmployeeID, employee.AvatarURL, employee.BannerURL, employee.BioText, employee.MobilePhone]);
            //console.log(result, rows);
        }

        for(let attr in emptags) {
            let emptag = emptags[attr];
            let [result, rows] = await this.connection.execute(`INSERT INTO EmpTag values(?, ?)`, [emptag.EmployeeID, emptag.TagID]);
            //console.log(result, rows);
        }
        
        for(let attr in tags) {
            let tag = tags[attr];
            let [result, rows] = await this.connection.execute(`INSERT INTO Tags values(?, ?)`, [tag.TagID, tag.TagLabel]);
            //console.log(result, rows);
        }

        if ((process.env.GITHUB_SOCIAL_ID) && (process.env.EMPLOYEE_ID)) {
            let [result, rows] = await this.connection.execute(`INSERT INTO Login values(?, ?)`, [process.env.GITHUB_SOCIAL_ID, process.env.EMPLOYEE_ID]);
        }

        if ((process.env.GOOGLE_SOCIAL_ID) && (process.env.EMPLOYEE_ID)) {
            let [result, rows] = await this.connection.execute(`INSERT INTO Login values(?, ?)`, [process.env.GOOGLE_SOCIAL_ID, process.env.EMPLOYEE_ID]);
        }
    }
}

module.exports = Database;