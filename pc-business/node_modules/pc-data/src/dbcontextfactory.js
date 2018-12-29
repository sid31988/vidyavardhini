const FileDbContext = require("./filedbcontext").FileDbContext;
const ContextTypeEnum = {
    FileDbContext: 0,
    DocumentDbContext: 1,
    SequelDbContext: 2
}
module.exports.ContextTypeEnum = ContextTypeEnum

module.exports.DbContextFactory = class DbContextFactory {
    createContext(contextType, entityName) {
        switch(contextType) {
            case ContextTypeEnum.FileDbContext:
                return new FileDbContext(entityName);
            case ContextTypeEnum.DocumentDbContext:
                return null;
            case ContextTypeEnum.SequelDbContext:
                return null;
        }
    }
}