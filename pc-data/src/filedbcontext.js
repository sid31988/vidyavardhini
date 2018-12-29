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
            items.push(item);
            var jsonString = JSON.stringify(items);
            this.fileHelper.writeToFile(this.entityName, jsonString, (err, message) => {
                if(typeof err != "undefined" && err != null) {
                    callback(err, null);
                }
                else {
                    callback(null, {
                        addCount: 1,
                        totalRecords: items.length
                    });
                }
            });
        });
    }

    // overidding super.insert
    update(item, callback) {}

    // overidding super.insert
    delete(item, callback) {}

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
                        callback(null, filteredItems[0]);
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