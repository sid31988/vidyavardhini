const HelperConfig = require("./config.json");
const DbContextFactory = require("pc-data").DbContextFactory;
const ContextTypeEnum = require("pc-data").ContextTypeEnum;
const TimesheetModel = require("../models/timesheetmodel").TimesheetModel;
const DbContextType = ContextTypeEnum[HelperConfig.HelperSettings.DesignationHelper.DbContextType];

module.exports.TimesheetHelper = class TimesheetHelper {
    constructor() {
        this.dbContextFactory = new DbContextFactory();
        this.dbContext = this.dbContextFactory.createContext(DbContextType, "timesheet");
    }

    read(employeeId, date, callback) {
        this.dbContext.read(null, (err, result) => {
            if(typeof err != "undefined" && err != null) {
                callback(err, null);
            }
            else {
                if(employeeId != null && date != null) {
                    result = result.filter(x => x.employeeId == employeeId && x.date == date);
                }
                var timesheets = result.map(x => new TimesheetModel(x.id, x.employeeId, new Date(x.date), x.hours));
                callback(err, timesheets);
            }
        });
    }

    insert(employeeId, date, hours, callback) {
        var timesheetModel = new TimesheetModel(-1, employeeId, date, hours);
        this.dbContext.insert(timesheetModel, (err, result) => {
            callback(err, result);
        })
    }

    update(employeeId, date, hours, callback) {
        this.read(employeeId, null, (timesheetReadErr, timesheetData) => {
            if(typeof timesheetReadErr != "undefined" && timesheetReadErr != null) {
                callback(timesheetReadErr, null);
            }
            else {
                var timesheetModel = timesheetData[0];
                timesheetModel.hours = hours;
                this.dbContext.update(timesheetModel, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }

    delete(employeeId, date, callback) {
        this.read(employeeId, date, (timesheetReadErr, timesheetData) => {
            if(typeof timesheetReadErr != "undefined" && timesheetReadErr != null) {
                callback(timesheetReadErr, null);
            }
            else {
                var timesheetModel = timesheetData[0];
                this.dbContext.delete(timesheetModel, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }
}