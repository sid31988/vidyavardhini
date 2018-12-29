const EmployeeViewModel = require("./employeeviewmodel").EmployeeViewModel;
const PayrollViewModel = require("./payrollviewmodel").PayrollViewModel;

module.exports.EmployeePayrollViewModel = class EmployeePayrollViewModel extends EmployeeViewModel {
    constructor() {
        super();
        this.payroll = {};
    }
}