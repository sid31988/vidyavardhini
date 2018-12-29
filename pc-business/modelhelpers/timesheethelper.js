const DbContextFactory = require("pc-data").DbContextFactory;
const ContextTypeEnum = require("pc-data").ContextTypeEnum;
const TimesheetModel = require("../models/timesheetmodel").TimsheetModel;

module.exports.TimesheetHelper = class TimesheetHelper {
    constructor() {
        this.dbContextFactory = new DbContextFactory();
        this.dbContext = this.dbContextFactory.createContext(ContextTypeEnum.FileDbContext, "timesheet");
    }

    read(id, callback) {
        this.dbContext.read(id, (err, result) => {
            var timesheets = result.map(x => new TimesheetModel(x.id, x.employeeId, x.date, x.hours));
            callback(err, timesheets);
        })
    }

    insert(item, callback) {
        this.dbContext.insert(item, (err, result) => {
            callback(err, result);
        })
    }

    update(item, callback) {
        this.dbContext.update(item, (err, result) => {
            callback(err, result);
        })
    }

    delete(item, callback) {
        this.dbContext.delete(item, (err, result) => {
            callback(err, result);
        })
    }
}