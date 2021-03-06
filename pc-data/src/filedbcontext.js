const BaseDbContext = require("./basedbcontext").BaseDbContext;
const FileHelper = require("../helpers/filehelper").FileHelper;

module.exports.FileDbContext = class FileDbContext extends BaseDbContext {
    constructor(entityName) {
        super(entityName);
        this.fileHelper = new FileHelper();
    }

    // overidding super.insert
    insert(item, callback) {
        this.read(null, (err, items) => {
            var maxId = 0;
            items.forEach(x => { maxId = maxId > x.id ? maxId : x.id; });
            item.id = maxId + 1;
            items.push(item);
            var jsonString = JSON.stringify(items);
            this.fileHelper.writeToFile(this.entityName, jsonString, (err, message) => {
                if(typeof err != "undefined" && err != null) {
                    callback(err, null);
                }
                else {
                    callback(null, {
                        addCount: 1,
                        totalRecords: items.length,
                        addedItem: item
                    });
                }
            });
        });
    }

    // overidding super.update
    update(item, callback) {
        this.read(null, (err, items) => {
            var dbItem = items.filter(x => x.id == item.id);
            for(var x in item) {
                dbItem[x] = item[x];
            }
            var jsonString = JSON.stringify(items);
            this.fileHelper.writeToFile(this.entityName, jsonString, (err, message) => {
                if(typeof err != "undefined" && err != null) {
                    callback(err, null);
                }
                else {
                    callback(null, {
                        updateCount: 1,
                        totalRecords: items.length
                    });
                }
            });
        });
    }

    // overidding super.delete
    delete(item, callback) {
        this.read(null, (err, items) => {
            items = items.filter(x => x.id != item.id);
            var jsonString = JSON.stringify(items);
            this.fileHelper.writeToFile(this.entityName, jsonString, (err, message) => {
                if(typeof err != "undefined" && err != null) {
                    callback(err, null);
                }
                else {
                    callback(null, {
                        updateCount: 1,
                        totalRecords: items.length
                    });
                }
            });
        });
    }

    // overidding super.insert
    read(id, callback) {
        this.fileHelper.readFromFile(this.entityName, (err, jsonString) => {
            if(typeof err != "undefined" && err != null) {
                callback(err, null);
            }
            else {
                try {
                    var items = jsonString.length > 0 ? JSON.parse(jsonString) : [];
                    if(typeof id != "undefined" && id != null) {
                        var filteredItems = items.filter(x => x.id == id);
                        callback(null, filteredItems);
                    }
                    else {
                        callback(null, items);
                    }
                }
                catch (readException) {
                    callback(readException, null);
                }
            }
        })
    }
}