const Api = require("./index");

const ApiTypes = {
    "Designation": "designation",
    "Employee": "employee",
    "Timesheet": "timesheet",
    "User": "user",
    "Payroll": "payroll"
};
module.exports.ApiTypes = ApiTypes;

module.exports.ApiFactory = class ApiFactory {
    createInstance(apiType) {
        switch(apiType) {
            case ApiTypes.Designation:
            case ApiTypes.designation:
                return new Api.DesignationApi();
            case ApiTypes.Employee:
            case ApiTypes.employee:
                return new Api.EmployeeApi();
            case ApiTypes.Timesheet:
            case ApiTypes.timesheet:
                return new Api.TimesheetApi();
            case ApiTypes.User:
            case ApiTypes.user:
                return new Api.UserApi();
            case ApiTypes.Payroll:
            case ApiTypes.payroll:
                return new Api.PayrollApi();
            default:
                return null;
        }
    }
}