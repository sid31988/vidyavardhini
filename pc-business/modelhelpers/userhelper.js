const DbContextFactory = require("pc-data").DbContextFactory;
const ContextTypeEnum = require("pc-data").ContextTypeEnum;
const UserModel = require("../models/usermodel").UserModel;

module.exports.UserHelper = class UserHelper {
    constructor() {
        this.dbContextFactory = new DbContextFactory();
        this.dbContext = this.dbContextFactory.createContext(ContextTypeEnum.FileDbContext, "user");
    }

    read(id, callback) {
        this.dbContext.read(id, (err, result) => {
            var users = result.map(x => new UserModel(x.id, x.name, x.username, x.pwd));
            callback(err, users);
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