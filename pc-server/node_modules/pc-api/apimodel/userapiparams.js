const ApiParamsBase = require("./apiparamsbase").ApiParamsBase;

module.exports.UserApiParams = class UserApiParams extends ApiParamsBase {
    constructor(id = 0, name = null, username = null, pwd = null) {
        super(id);
        this.name = name;
        this.username = username;
        this.pwd = pwd;
    }
}