var express = require('express');
var app = express();

var db=require('./DBConnection/Connection')

app.get('/', function (req, res) {
   
    
  
           
        // query to the database and get the records
       db.request.query('select * from Tbltest', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
  
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});