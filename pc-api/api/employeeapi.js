const pcBusiness = require("pc-business");
const ApiBase = require("./apibase").ApiBase;
const EmployeeHelper = pcBusiness.ModelHelpers.EmployeeHelper;

module.exports.EmployeeApi = class EmployeeApi extends ApiBase{
    constructor() {
        super();
        this.employeeHelper = new EmployeeHelper();
    }

    add(apiParams, callback) {
        this.employeeHelper.insert(apiParams.name, apiParams.dept, apiParams.designationId, apiParams.managerId, (insertErr, result) => {
            if(typeof insertErr != "undefined" && insertErr != null) {
                callback(insertErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    update(apiParams, callback) {
        this.employeeHelper.update(apiParams.id, apiParams.name, apiParams.dept, apiParams.designationId, apiParams.managerId, (updateErr, result) => {
            if(typeof updateErr != "undefined" && updateErr != null) {
                callback(updateErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    delete(apiParams, callback) {
        this.employeeHelper.delete(apiParams.id, (deleteErr, result) => {
            if(typeof deleteErr != "undefined" && deleteErr != null) {
                callback(deleteErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    find(apiParams, callback) {
        this.employeeHelper.read(apiParams.id, (readErr, result) => {
            if(typeof readErr != "undefined" && readErr != null) {
                callback(readErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }
}