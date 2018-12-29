const ApiModels = require("./index");

const ApiParamsTypes = {
    Designation: 0,
    Employee: 1,
    Timesheet: 2,
    User: 3,
    Payroll: 4
};
module.exports.ApiParamsTypes = ApiParamsTypes;

module.exports.ApiParamsFactory = class ApiParamsFactory {
    createInstance(type, params) {
        switch(type) {
            case ApiParamsTypes.Designation:
                return new ApiModels.DesignationApiParams(params.id, params.name, params.salary);
            case ApiParamsTypes.Employee:
                return new ApiModels.EmployeeApiParams(params.id, params.name, params.dept, params.designationId, params.managerId);
            case ApiParamsTypes.Timesheet:
                return new ApiModels.TimesheetApiParams(params.id, params.employeeId, params.date, params.hours);
            case ApiParamsTypes.User:
                return new ApiModels.UserApiParams(params.id, params.name, params.username, params.pwd);
            case ApiParamsTypes.Payroll:
                return new ApiModels.PayrollApiParams(params.employeeId);
        }
    }
}