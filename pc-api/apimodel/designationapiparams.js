const ApiParamsBase = require("./apiparamsbase").ApiParamsBase;

module.exports.DesignationApiParams = class DesignationApiParams extends ApiParamsBase {
    constructor(id = 0, name = null, salary = 0) {
        super(id);
        this.name = name;
        this.salary = salary;
    }
}