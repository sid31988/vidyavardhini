const DbContextFactory = require("pc-data").DbContextFactory;
const ContextTypeEnum = require("pc-data").ContextTypeEnum;
const DesignationModel = require("../models/designationmodel").DesignationModel;

module.exports.DesignationHelper = class DesignationHelper {
    constructor() {
        this.dbContextFactory = new DbContextFactory();
        this.dbContext = this.dbContextFactory.createContext(ContextTypeEnum.FileDbContext, "designation");
    }

    read(id, callback) {
        this.dbContext.read(id, (err, result) => {
            var designations = result.map(x => new DesignationModel(x.id, x.name, x.salary));
            callback(err, designations);
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