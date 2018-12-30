const HelperConfig = require("./config.json");
const DbContextFactory = require("pc-data").DbContextFactory;
const ContextTypeEnum = require("pc-data").ContextTypeEnum;
const UserModel = require("../models/usermodel").UserModel;
const DbContextType = ContextTypeEnum[HelperConfig.HelperSettings.DesignationHelper.DbContextType];

module.exports.UserHelper = class UserHelper {
    constructor() {
        this.dbContextFactory = new DbContextFactory();
        this.dbContext = this.dbContextFactory.createContext(DbContextType, "user");
    }

    read(id, callback) {
        this.dbContext.read(id, (err, result) => {
            if(typeof err != "undefined" && err != null) {
                callback(err, null);
            }
            else {
                var users = result.map(x => new UserModel(x.id, x.name, x.username, x.pwd));
                callback(err, users);
            }
        });
    }

    insert(name, username, pwd, callback) {
        var userModel = new UserModel(-1, name, username, pwd);
        this.dbContext.insert(userModel, (err, result) => {
            callback(err, result);
        });
    }

    update(id, name, username, pwd, callback) {
        this.read(id, (userReadErr, userData) => {
            if(typeof userReadErr != "undefined" && userReadErr != null) {
                callback(userReadErr, null);
            }
            else {
                var userModel = userData[0];
                userModel.name = name;
                userModel.username = username;
                userModel.pwd = pwd;
                this.dbContext.update(userModel, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }

    delete(id, callback) {
        this.read(id, (userReadErr, userData) => {
            if(typeof userReadErr != "undefined" && userReadErr != null) {
                callback(userReadErr, null);
            }
            else {
                var userModel = userData[0];
                this.dbContext.delete(userModel, (err, result) => {
                    callback(err, result);
                });
            }
        });
    }
}