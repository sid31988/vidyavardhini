const HelperConfig = require("./config.json");
const DbContextFactory = require("pc-data").DbContextFactory;
const ContextTypeEnum = require("pc-data").ContextTypeEnum;
const EmployeeModel = require("../models/employeemodel").EmployeeModel;
const DbContextType = ContextTypeEnum[HelperConfig.HelperSettings.DesignationHelper.DbContextType];

module.exports.EmployeeHelper = class EmployeeHelper {
    constructor() {
        this.dbContextFactory = new DbContextFactory();
        this.dbContext = this.dbContextFactory.createContext(DbContextType, "employee");
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

    insert(name, dept, designationId, managerId, callback) {
        var employeeModel = new EmployeeModel(-1, name, dept, designationId, managerId);
        this.dbContext.insert(employeeModel, (err, result) => {
            callback(err, result);
        });
    }

    update(id, name, dept, designationId, managerId, callback) {
        this.read(id, (employeeReadErr, employeeData) => {
            if(typeof employeeReadErr != "undefined" && employeeReadErr != null) {
                callback(employeeReadErr, null);
            }
            else {
                var employeeModel = employeeData[0];
                employeeModel.name = name;
                employeeModel.dept = dept;
                employeeModel.designationId = designationId;
                employeeModel.managerId = managerId;
                this.dbContext.update(employeeModel, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }

    delete(id, callback) {
        this.read(id, (employeeReadErr, employeeData) => {
            if(typeof employeeReadErr != "undefined" && employeeReadErr != null) {
                callback(employeeReadErr, null);
            }
            else {
                var employeeModel = employeeData[0];
                this.dbContext.delete(employeeModel, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }
}