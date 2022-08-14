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
            
            return directs;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

}

module.exports = HR;