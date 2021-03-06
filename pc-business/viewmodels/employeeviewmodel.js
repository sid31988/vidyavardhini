const EmployeeModel = require("../models/employeemodel").EmployeeModel;
const DesignationModel = require("../models/designationmodel").DesignationModel;
const TimesheetModel = require("../models/timesheetmodel").TimesheetModel;

module.exports.EmployeeViewModel = class EmployeeViewModel {
    constructor() {
        this.employee = new EmployeeModel();
        this.designation = new DesignationModel();
        this.timesheet = [];
    }
}