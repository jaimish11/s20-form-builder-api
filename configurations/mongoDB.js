const monogoDbConfig = {
    USERNAME    : 'admin',
    PASSWORD    : 'admin1234',
    CLUSTER     : 'cluster0',
    DB          : 'form-builder',
};

monogoDbConfig.URL = `mongodb+srv://` + 
    `${monogoDbConfig.USERNAME}:${monogoDbConfig.PASSWORD}@` + 
    `${monogoDbConfig.CLUSTER}.1xvjx.mongodb.net/` + 
    `${monogoDbConfig.DB}?retryWrites=true&w=majority`;



module.exports = monogoDbConfig;