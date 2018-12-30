const FileDbContext = require("./filedbcontext").FileDbContext;
const DocumentDbContext = require("./documentdbcontext").DocumentDbContext;

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
                return new DocumentDbContext(entityName);
            case ContextTypeEnum.SequelDbContext:
                return null;
        }
    }
}