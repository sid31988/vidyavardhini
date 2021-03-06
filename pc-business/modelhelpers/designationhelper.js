const HelperConfig = require("./config.json");
const DbContextFactory = require("pc-data").DbContextFactory;
const ContextTypeEnum = require("pc-data").ContextTypeEnum;
const DesignationModel = require("../models/designationmodel").DesignationModel;
const DbContextType = ContextTypeEnum[HelperConfig.HelperSettings.DesignationHelper.DbContextType];

module.exports.DesignationHelper = class DesignationHelper {
    constructor() {
        this.dbContextFactory = new DbContextFactory();
        this.dbContext = this.dbContextFactory.createContext(DbContextType, "designation");
    }

    read(id, callback) {
        this.dbContext.read(id, (err, result) => {
            if(typeof err != "undefined" && err != null) {
                callback(err, null);
            }
            else {
                var designations = result.map(x => new DesignationModel(x.id, x.name, x.salary));
                callback(err, designations);
            }
        });
    }

    insert(name, salary, callback) {
        var designationModel = new DesignationModel(-1, name, salary);
        this.dbContext.insert(designationModel, (err, result) => {
            callback(err, result);
        })
    }

    update(id, name, salary, callback) {
        this.read(id, (designationReadErr, designationData) => {
            if(typeof designationReadErr != "undefined" && designationReadErr != null) {
                callback(designationReadErr, null);
            }
            else {
                var designationModel = designationData[0];
                designationModel.name = name;
                designationModel.salary = salary;
                this.dbContext.update(designationModel, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }

    delete(id, callback) {
        this.read(id, (designationReadErr, designationData) => {
            if(typeof designationReadErr != "undefined" && designationReadErr != null) {
                callback(designationReadErr, null);
            }
            else {
                var designationModel = designationData[0];
                this.dbContext.delete(designationModel, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }
}