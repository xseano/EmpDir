class Routing {
    constructor() {
        this.database = null;
        this.hr = null;
    }

    async initialize() {
        await this.registerPaths();
    }

    async registerDatabase(database) {
        this.database = database;
    }

    async registerHR(hr) {
        this.hr = hr;
    }

    async registerPaths() {
        WebServer.get(process.env.DASH_PATH, (req, res) => {
            // check if the user has authenticated
            if (req.isAuthenticated()) {
                console.log(req.user);
                res.redirect(`http://${process.env.CLIENT_HOST}${process.env.DASH_PATH}`);
            } else {
                // user needs to relogin
                res.redirect(`http://${process.env.CLIENT_HOST}${process.env.LOGIN_PATH}`);
            }
        });

        WebServer.get(process.env.LOGOUT_PATH, (req, res) => {
            // async function, callback required
            req.logout((err) => {
                if (err) { return next(err); }
                res.redirect(`http://${process.env.CLIENT_HOST}${process.env.LOGIN_PATH}`);
            });
        });

        WebServer.get(process.env.GOOGLE_AUTH_PATH,
            // we want to acquire and store the users email and basic profile data for use within the application
            // uses: (future) db lookup
            Passport.authenticate('google', {
                scope: ['email', 'openid', 'profile']
            })
        );

        WebServer.get(`${process.env.GOOGLE_AUTH_PATH}/callback`, 
            // bring us to the main dashboard if successful, back to login if not
            Passport.authenticate('google', {
                successRedirect: `http://${process.env.CLIENT_HOST}${process.env.SUCCESSFUL_LOGIN_PATH}`, // proceed to dashboard
                failureRedirect: process.env.FAILED_LOGIN_PATH // go back to login
            })
        );

        WebServer.get(process.env.GITHUB_AUTH_PATH,
            // we want to acquire and store the users email and basic profile data for use within the application
            // uses: (future) db lookup
            Passport.authenticate('github', {
                scope: ['email', 'profile']
            })
        );

        WebServer.get(`${process.env.GITHUB_AUTH_PATH}/callback`, 
            // bring us to the main dashboard if successful, back to login if not
            Passport.authenticate('github', {
                successRedirect: `http://${process.env.CLIENT_HOST}${process.env.SUCCESSFUL_LOGIN_PATH}`, // proceed to dashboard
                failureRedirect: process.env.FAILED_LOGIN_PATH // go back to login
            })
        );

        WebServer.get(process.env.FAILED_LOGIN_PATH, (req, res) => {
            return res.status(401).json({
                status: "failed",
                code: "1000",
                message: "There was an error authenticating your account, please try again."
            });
        });

        WebServer.get(process.env.SEARCH_MAIN_PATH, async (req, res) => {
            // check if the user has authenticated
            if (req.user) {
                let searchInput = req.query.q;
                console.log(searchInput);

                let result_references = new Set();
                let employees = [];

                if (searchInput) {
                    let hr_search = await this.hr.searchEmployee(searchInput);
                    if (hr_search) { 
                        for (const id of hr_search) {
                            result_references.add(id);
                        }
                    }
                    
                    let empext_search = await this.database.searchEmployeeExt(searchInput);
                    if (empext_search) {
                        for (const emp of empext_search) {
                            result_references.add(emp.EmployeeID);
                        }
                    }

                    let contact_search = await this.database.searchContacts(searchInput);
                    if (contact_search) {
                        for (const contact of contact_search) {
                            result_references.add(contact.EmployeeID);
                        }
                    }

                    let tag_search = await this.database.searchTags(searchInput);
                    let tag_ids = new Set();
                    if (tag_search) {
                        for (const tag of tag_search) {
                            tag_ids.add(tag.TagID);
                        }

                        if (tag_ids) {
                            for (const tag_id of tag_ids) {
                                let matched_tags = await this.database.matchTag(tag_id);
                                for (const match of matched_tags) {
                                    result_references.add(match.EmployeeID);
                                }
                            }
                        }
                    }
                    
                    if (result_references.size > 0) {

                        for (const emp_id of result_references) {
                            let employee = await this.hr.getEmployee(emp_id);
                            let employee_ext = await this.database.getEmployeeExt(emp_id);

                            employees.push({avatar: employee_ext.AvatarURL, employee: employee});
                        }

                        return res.status(200).json({
                            status: "success",
                            code: "2001",
                            message: "Results found.",
                            data: {
                                employees: employees,
                            }
                        });
                    } else {
                        return res.status(404).json({
                            status: "failed",
                            code: "1002",
                            message: "No results found, please try again."
                        });
                    }
                }

            } else {
                // user needs to relogin
            }
        });

        WebServer.get(process.env.AUTH_VALIDATION_PATH, async (req, res) => {
            // check if the user has authenticated
            if (req.user) {
                let uid = parseInt(req.user.id);
                let emp_id = await this.database.getEmployeeID(uid); 

                // default to specified employee if social id not mapped to emp id
                emp_id = (emp_id ? emp_id : process.env.DEFAULT_EMPLOYEE_ID);

                let emp_ext = await this.database.getEmployeeExt(emp_id); 
                let emp_contacts = await this.database.getContacts(emp_id); 
                let emp_tags = await this.database.getTags(emp_id);

                let hr_emp = await this.hr.getEmployee(emp_id);

                let hr_mgr = await this.hr.getEmployee(hr_emp.ManagerID);
                let hr_mgr_ext = await this.database.getEmployeeExt(hr_emp.ManagerID); 

                let hr_rep = await this.hr.getEmployee(hr_emp.HRrepID);
                let hr_rep_ext = await this.database.getEmployeeExt(hr_emp.HRrepID);

                let hr_mgr_chain = await this.hr.getManagerChain(emp_id);
                let hr_directs = await this.hr.getDirects(emp_id);
                
                return res.status(200).json({
                    status: "success",
                    code: "2000",
                    message: "Successfully logged in, welcome.",
                    data: {
                        user: req.user,
                        employee: {
                            id: emp_id,
                            ext: emp_ext,
                            contacts: emp_contacts,
                            tags: emp_tags
                        },
                        hr: {
                            emp: hr_emp,
                            mgr: {
                                main: hr_mgr,
                                ext: hr_mgr_ext
                            },
                            rep: {
                                main: hr_rep,
                                ext: hr_rep_ext
                            },
                            mgr_chain: hr_mgr_chain[0].managers,
                            directs: hr_directs
                        },
                        cookies: req.cookies
                    }
                });


            } else {
                // user needs to relogin
                return res.status(401).json({
                    status: "failed",
                    code: "1001",
                    message: "We failed to process this request, please try again."
                });
            }
        });

        WebServer.get(`${process.env.PROFILE_LOOKUP_PATH}/:id`, async (req, res) => {
            // check if the user has authenticated and we have an id supplied in the url
            let id = req.params.id;
            if (id) {
                let emp_id = parseInt(id); 
                let emp_ext = await this.database.getEmployeeExt(emp_id); 
                let emp_contacts = await this.database.getContacts(emp_id); 
                let emp_tags = await this.database.getTags(emp_id);

                let hr_emp = await this.hr.getEmployee(emp_id);

                let hr_mgr = await this.hr.getEmployee(hr_emp.ManagerID);
                let hr_mgr_ext = await this.database.getEmployeeExt(hr_emp.ManagerID);

                let hr_rep = await this.hr.getEmployee(hr_emp.HRrepID);
                let hr_rep_ext = await this.database.getEmployeeExt(hr_emp.HRrepID);

                let hr_mgr_chain = await this.hr.getManagerChain(emp_id);
                let hr_directs = await this.hr.getDirects(emp_id);
                
                return res.status(200).json({
                    status: "success",
                    code: "2000",
                    message: "Successfully acquired employee.",
                    data: {
                        user: req.user,
                        employee: {
                            id: emp_id,
                            ext: emp_ext,
                            contacts: emp_contacts,
                            tags: emp_tags
                        },
                        hr: {
                            emp: hr_emp,
                            mgr: {
                                main: hr_mgr,
                                ext: hr_mgr_ext
                            },
                            rep: {
                                main: hr_rep,
                                ext: hr_rep_ext
                            },
                            mgr_chain: hr_mgr_chain[0].managers,
                            directs: hr_directs
                        },
                        cookies: req.cookies
                    }
                });


            } else {
                // user needs to relogin
                return res.status(401).json({
                    status: "failed",
                    code: "1001",
                    message: "We failed to process this request, please try again."
                });
            }
        });
    }
}

module.exports = Routing;