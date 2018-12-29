const pcBusiness = require("pc-business");
const TimesheetHelper = pcBusiness.ModelHelpers.TimesheetHelper;

module.exports.TimesheetApi = class TimesheetApi {
    constructor() {
        this.timesheetHelper = new TimesheetHelper();
    }

    add(empId, date, hrs) {

    }
}