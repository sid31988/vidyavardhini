const ApiParamsBase = require("./apiparamsbase").ApiParamsBase;

module.exports.PayrollApiParams = class PayrollApiParams extends ApiParamsBase {
    constructor(employeeId = 0) {
        this.employeeId = employeeId;
    }
}