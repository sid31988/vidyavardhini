const pcBusiness = require("pc-business");
const ApiBase = require("./apibase").ApiBase;
const UserHelper = pcBusiness.ModelHelpers.UserHelper;

module.exports.UserApi = class UserApi extends ApiBase{
    constructor() {
        super();
        this.userHelper = new UserHelper();
    }

    add(apiParams, callback) {
        this.userHelper.insert(apiParams.name, apiParams.username, apiParams.pwd, (insertErr, result) => {
            if(typeof insertErr != "undefined" && insertErr != null) {
                callback(insertErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    update(apiParams, callback) {
        this.userHelper.update(apiParams.id, apiParams.name, apiParams.username, apiParams.pwd, (updateErr, result) => {
            if(typeof updateErr != "undefined" && updateErr != null) {
                callback(updateErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    delete(apiParams, callback) {
        this.userHelper.delete(apiParams.id, (deleteErr, result) => {
            if(typeof deleteErr != "undefined" && deleteErr != null) {
                callback(deleteErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }

    find(apiParams, callback) {
        this.userHelper.read(apiParams.id, (readErr, result) => {
            if(typeof readErr != "undefined" && readErr != null) {
                callback(readErr, null);
            }
            else {
                callback(null, result);
            }
        });
    }
}