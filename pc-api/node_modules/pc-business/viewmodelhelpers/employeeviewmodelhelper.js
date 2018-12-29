const EmployeeHelper = require("../modelhelpers/employeehelper").EmployeeHelper;
const DesignationHelper = require("../modelhelpers/designationhelper").DesignationHelper;
const TimesheetHelper = require("../modelhelpers/timesheethelper").TimesheetHelper;
const EmployeeViewModel = require("../viewmodels/employeeviewmodel").EmployeeViewModel;

module.exports.EmployeeViewModelHelper = class EmployeeViewModelHelper {
    constructor() {
        this.employeeHelper = new EmployeeHelper();
        this.designationHelper = new DesignationHelper();
        this.timesheetHelper = new TimesheetHelper();
    }

    createViewModel(employeeId, callback) {
        this.employeeHelper.read(employeeId, (employeeReadErr, employeeData) => {
            if(typeof employeeReadErr != "undefined" && employeeReadErr != null) {
                callback(employeeReadErr, null);
            }
            else {
                var employeeViewModel = new EmployeeViewModel();
                employeeViewModel.employee = employeeData[0];
                this.designationHelper.read(employeeViewModel.employee.designationId, (designationReadErr, designationData) => {
                    if(typeof designationReadErr != "undefined" && designationReadErr != null) {
                        callback(designationReadErr, null);
                    }
                    else {
                        employeeViewModel.designation = designationData[0];
    
                        this.timesheetHelper.read(null, (timesheetReadError, timesheetData) => {
                            if(typeof timesheetReadError != "undefined" && timesheetReadError != null) {
                                callback(timesheetReadError, null);
                            }
                            else {
                                var employeeTimesheetData = timesheetData.filter(x => x.employeeId == employeeViewModel.employee.id);
                                employeeViewModel.timesheet = employeeTimesheetData;

                                callback(null, employeeViewModel);
                            }
                        })
                    }
                });
            }
        })
    }
}