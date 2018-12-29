const pcBusiness = require("pc-business");
const ApiBase = require("./apibase").ApiBase;
const EmployeePayrollViewModelHelper = require("pc-business").ViewModelHelpers.EmployeePayrollViewModelHelper;

module.exports.PayrollApi = class PayrollApi extends ApiBase{
    constructor() {
        super();
        this.empPayVMHelper = new EmployeePayrollViewModelHelper();
    }

    calculate(apiParams, callback) {
        this.empPayVMHelper.createViewModel(apiParams.employeeId, (err, result) => {
            if(typeof err != "undefined" && err != null) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        })
    }
}