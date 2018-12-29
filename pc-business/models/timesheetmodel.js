module.exports.TimsheetModel = class TimesheetModel {
    constructor(id = 0, employeeId = 0, date = null, hours = 0) {
        this.id = id;
        this.employeeId = employeeId;
        this.date = date;
        this.hours = hours;
    }
}