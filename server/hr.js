class HR {
    constructor() {

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

    async getManager(mgr_id) {
        try {
            let res = await Fetch(`http://${process.env.HRSERVER_HOST}:${process.env.HRSERVER_PORT}${process.env.HR_API_PATH}/${mgr_id}`);
            let manager = await res.json();
            
            return manager;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async getHRRep(rep_id) {
        try {
            let res = await Fetch(`http://${process.env.HRSERVER_HOST}:${process.env.HRSERVER_PORT}${process.env.HR_API_PATH}/${rep_id}`);
            let rep = await res.json();
            
            return rep;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async getDirects(emp_id) {
        try {
            let res = await Fetch(`http://${process.env.HRSERVER_HOST}:${process.env.HRSERVER_PORT}${process.env.HR_API_PATH}?ManagerID=${emp_id}`);
            let directs = await res.json();
            
            return directs;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

}

module.exports = HR;