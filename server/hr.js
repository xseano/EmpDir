class HR {
    constructor() {
        this.database = null;
    }

    async registerDatabase(database) {
        this.database = database;
    }

    async searchEmployee(value) {
        try {
            let res = await Fetch(`http://${process.env.HRSERVER_HOST}:${process.env.HRSERVER_PORT}${process.env.HR_API_PATH}?q=${value}`);
            let results = await res.json();

            let employees = [];
            for (const employee of results) {
                let emp_ext = await this.database.getEmployeeExt(employee.id);
                
                let data = {
                    employee,
                    avatar: emp_ext.AvatarURL
                };

                employees.push(data);
            }

            return employees;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async getEmployee(emp_id) {
        try {
            let res = await Fetch(`http://${process.env.HRSERVER_HOST}:${process.env.HRSERVER_PORT}${process.env.HR_API_PATH}/${emp_id}`);
            let employee = await res.json();
            
            return employee;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async getManagerChain(emp_id) {
        try {
            let res = await Fetch(`http://${process.env.HRSERVER_HOST}:${process.env.HRSERVER_PORT}${process.env.HR_API_PATH}/${emp_id}${process.env.HR_MGR_CHAIN_PATH}`);
            let chain = await res.json();
            
            return chain;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async getDirects(emp_id) {
        try {
            let res = await Fetch(`http://${process.env.HRSERVER_HOST}:${process.env.HRSERVER_PORT}${process.env.HR_API_PATH}?ManagerID=${emp_id}`);
            let directs = await res.json();

            let new_directs = [];
            for (const direct of directs) {
                let dir_emp = await this.database.getEmployeeExt(direct.id);
                let dir_name = `${direct.FirstName} ${direct.LastName}`;
                
                let data = {
                    id: dir_emp.EmployeeID,
                    name: dir_name,
                    avatar: dir_emp.AvatarURL
                };

                new_directs.push(data);
            }
            
            return new_directs;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
}

module.exports = HR;