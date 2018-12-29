const EmployeeHelper = require("../modelhelpers/employeehelper").EmployeeHelper;
const DesignationHelper = require("../modelhelpers/designationhelper").DesignationHelper;
const TimesheetHelper = require("../modelhelpers/timesheethelper").TimesheetHelper;
module.exports.EmployeeViewModel = class EmployeeViewModel {
    constructor() {
        this.employeeHelper = new EmployeeHelper();
        this.designationHelper = new DesignationHelper();
        this.timesheetHelper = new EmployeeHelper();
    }

    createViewModel(employeeId) {
        
    }
}