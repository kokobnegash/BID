var sql = require("mssql");
var request = ""
// config for your database
var config = {
    user: 'sa',
    password: '123',
    server: 'KOKI\\SQLEXPRESS', 
    database: 'BID' ,
    trustServerCertificate: true,
    port:1433
};

// connect to your database
sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    request = new sql.Request();
});

module.exports=config;
