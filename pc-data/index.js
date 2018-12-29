const DbContextFactory = require("./src/dbcontextfactory").DbContextFactory;
const ContextTypeEnum = require("./src/dbcontextfactory").ContextTypeEnum;

var factory = new DbContextFactory();
var fileDbContext = factory.createContext(ContextTypeEnum.FileDbContext, "user");
fileDbContext.insert({
    id: 1,
    name: "superadmin",
    userName: "superadmin",
    pwd: "abcd@1234"
}, (err, result) => {
    if(typeof err != "undefined" && err != null) {
        console.log(err);
    }
    else {
        console.log(JSON.stringify(result));
    }
})
