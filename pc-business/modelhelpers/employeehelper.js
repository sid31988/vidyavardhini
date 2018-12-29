const DbContextFactory = require("pc-data").DbContextFactory;
const ContextTypeEnum = require("pc-data").ContextTypeEnum;
const EmployeeModel = require("../models/employeemodel").EmployeeModel;

module.exports.EmployeeHelper = class EmployeeHelper {
    constructor() {
        this.dbContextFactory = new DbContextFactory();
        this.dbContext = this.dbContextFactory.createContext(ContextTypeEnum.FileDbContext, "employee");
    }

    read(id, callback) {
        this.dbContext.read(id, (err, result) => {
            if(typeof err != "undefined" && err != null) {
                callback(err, null);
            }
            else {
                var employees = result.map(x => new EmployeeModel(x.id, x.name, x.dept, x.designationId, x.managerId));
                callback(err, employees);
            }
        });
    }

    insert(item, callback) {
        this.dbContext.insert(item, (err, result) => {
            callback(err, result);
        });
    }

    update(item, callback) {
        this.dbContext.update(item, (err, result) => {
            callback(err, result);
        });
    }

    delete(item, callback) {
        this.dbContext.delete(item, (err, result) => {
            callback(err, result);
        });
    }
}