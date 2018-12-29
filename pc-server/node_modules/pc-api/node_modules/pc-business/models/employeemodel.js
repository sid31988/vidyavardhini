module.exports.EmployeeModel = class EmployeeModel {
    constructor(id = 0, name = null, dept = null, designationId = null, managerId = null) {
        this.id = id;
        this.name = name;
        this.dept = dept;
        this.designationId = designationId;
        this.managerId = managerId;
    }
}