const pcBusiness = require("pc-business");
const ApiBase = require("./apibase").ApiBase;
const DesignationHelper = pcBusiness.ModelHelpers.DesignationHelper;

module.exports.DesignationApi = class DesignationApi extends ApiBase {
    constructor() {
        super();
        this.designationHelper = new DesignationHelper();
    }

    add(apiParams, callback) {
        this.designationHelper.insert(apiParams.name, apiParams.salary, (insertErr, result) => {
            if(typeof insertErr != "undefined" && insertErr != null) {
                callback(insertErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    update(apiParams, callback) {
        this.designationHelper.update(apiParams.id, apiParams.name, apiParams.salary, (updateErr, result) => {
            if(typeof updateErr != "undefined" && updateErr != null) {
                callback(updateErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    delete(apiParams, callback) {
        this.designationHelper.delete(apiParams.id, (deleteErr, result) => {
            if(typeof deleteErr != "undefined" && deleteErr != null) {
                callback(deleteErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    find(apiParams, callback) {
        this.designationHelper.read(apiParams.id, (readErr, result) => {
            if(typeof readErr != "undefined" && readErr != null) {
                callback(readErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }
}