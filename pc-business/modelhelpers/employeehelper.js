const DbContextFactory = require("pc-data").DbContextFactory;
const ContextTypeEnum = require("pc-data").ContextTypeEnum;

module.exports.EmployeeHelper = class EmployeeHelper {
    constructor() {
        this.dbContextFactory = new DbContextFactory();
        this.dbContext = this.dbContextFactory.createContext(ContextTypeEnum.FileDbContext, "employee");
    }

    read(id, callback) {
        this.dbContext.read(id, (err, result) => {
            callback(err, result);
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