const BaseDbContext = require("./basedbcontext").BaseDbContext;
const MongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017";
const dbName = "vidyavardhini";

module.exports.DocumentDbContext = class DocumentDbContext extends BaseDbContext {
    constructor(entityName) {
        super(entityName);
    }

    // overidding super.insert
    insert(item, callback) {
        MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, client) {
            var collection = client.db(dbName).collection(entityName);
            collection.insertOne(item, (err, result) => {
                if(typeof err != "undefined" && err != null) {
                    callback(err, null);
                }
                else {
                    callback(null, result);
                }
                client.close();
            });
        });
    }

    // overidding super.update
    update(item, callback) {
        MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
            if(typeof err != "undefined" && err != null) {
                callback(err, null);
            }
            else {
                var collection = client.db(dbName).collection(entityName);
                collection.find({ "id": item.id }).toArray((err, documents) => {
                    if(typeof err != "undefined" && err != null) {
                        callback(err, null);
                    }
                    else {
                        var oldItem = documents[0];
                        var newItem = { _id: oldItem._id };
                        for(var p in item) {
                            newItem[p] = item[p];
                        }
                        collection.updateOne(oldItem, { $set: newItem }, { upsert: true }, (err, result) => {
                            if(typeof err != "undefined" && err != null) {
                                callback(err, null);
                            }
                            else {
                                callback(null, result);
                            }
                        });
                    }        
                })
            }
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