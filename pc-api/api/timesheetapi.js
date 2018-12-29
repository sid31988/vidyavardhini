const pcBusiness = require("pc-business");
const ApiBase = require("./apibase").ApiBase;
const TimesheetHelper = pcBusiness.ModelHelpers.TimesheetHelper;

module.exports.TimesheetApi = class TimesheetApi extends ApiBase{
    constructor() {
        super();
        this.timesheetHelper = new TimesheetHelper();
    }

    add(apiParams, callback) {
        this.timesheetHelper.insert(apiParams.employeeId, apiParams.date, apiParams.hours, (insertErr, result) => {
            if(typeof insertErr != "undefined" && insertErr != null) {
                callback(insertErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    update(apiParams, callback) {
        this.timesheetHelper.update(apiParams.employeeId, apiParams.date, apiParams.hours, (updateErr, result) => {
            if(typeof updateErr != "undefined" && updateErr != null) {
                callback(updateErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    delete(apiParams, callback) {
        this.timesheetHelper.delete(apiParams.employeeId, apiParams.date, (deleteErr, result) => {
            if(typeof deleteErr != "undefined" && deleteErr != null) {
                callback(deleteErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    find(apiParams, callback) {
        this.timesheetHelper.read(apiParams.employeeId, apiParams.date, (readErr, result) => {
            if(typeof readErr != "undefined" && readErr != null) {
                callback(readErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }
}