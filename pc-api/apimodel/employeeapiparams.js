const ApiParamsBase = require("./apiparamsbase").ApiParamsBase;

module.exports.EmployeeApiParams = class EmployeeApiParams extends ApiParamsBase {
    constructor(id = 0, name = null, dept = null, designationId = null, managerId = null) {
        super(id);
        this.name = name;
        this.dept = dept;
        this.designationId = designationId;
        this.managerId = managerId;
    }
}