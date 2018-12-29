const ApiParamsBase = require("./apiparamsbase").ApiParamsBase;

module.exports.TimesheetApiParams = class TimesheetApiParams extends ApiParamsBase {
    constructor(id = 0, employeeId = 0, date = null, hours = 0) {
        super(id);
        this.employeeId = employeeId;
        this.date = date;
        this.hours = hours;
    }
}