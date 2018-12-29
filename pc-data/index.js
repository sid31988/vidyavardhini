const DbContextFactory = require("./src/dbcontextfactory").DbContextFactory;
const ContextTypeEnum = require("./src/dbcontextfactory").ContextTypeEnum;

var factory = new DbContextFactory();
var fileDbContext = factory.createContext(ContextTypeEnum.FileDbContext, "user");
var userItem = {
    id: 3,
    name: "superadmin",
    userName: "superadmin",
    pwd: "abcd@1234"
};
fileDbContext.insert(userItem, (err, result) => {
    if(typeof err != "undefined" && err != null) {
        console.log(err);
    }
    else {
        console.log(JSON.stringify(result));

        userItem.name = "admin";
        fileDbContext.update(userItem, (err, result) => {
            if(typeof err != "undefined" && err != null) {
                console.log(err);
            }
            else {
                console.log(JSON.stringify(result));
            
                fileDbContext.delete(userItem, (err, result) => {
                    if(typeof err != "undefined" && err != null) {
                        console.log(err);
                    }
                    else {
                        console.log(JSON.stringify(result));
                    }
                });
            }
        });
    }
});


