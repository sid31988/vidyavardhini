module.exports.UserModel = class UserModel {
    constructor(id = 0, name = null, username = null, pwd = null) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.pwd = pwd;
    }
}