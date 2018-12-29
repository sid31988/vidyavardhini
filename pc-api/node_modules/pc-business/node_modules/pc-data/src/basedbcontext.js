module.exports.BaseDbContext = class BaseDbContext {
    constructor(entityName) {
        this.entityName = entityName;
    }
    insert(item, callback) {}
    update(item, callback) {}
    delete(item, callback) {}
    read(id, callback) {}
}