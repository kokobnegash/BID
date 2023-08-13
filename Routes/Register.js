var express =require('express')
var register=express.Router(); 

    var sql = require("mssql");
    register.use(express.json());
    register.use(express.urlencoded({ extended: false }));
    
    var conf=require('./DBConnection/Connection')   ; 




    register.post('/', function(req, res, next){

  var user=req.body.fname; 
  sql.connect(conf.config, function (err) {
    
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
       
    // query to the database and get the records
let perinfo = "exec reg_user  @fname='" + req.body.fname  + "', @mname='" + req.body.mname   
 + "', @lname='" + req.body.lname +  "', @email='" + req.body.email +   "', @street='" + req.body.street +  "', @tel='" + req.body.tel + 
  "', @username='" + req.body.username +  "', @password='" + req.body.password + "', @type='" + req.body.type  + "', @photo='" + req.body.photo +    "';";

    console.log( perinfo);
    //request.query("select * from TblUser", function (err, recordset) {
       request.query(perinfo , function (err,   recordset) {
        if (err) {console.log(err) } 
        else {

        }

        // send records as a response
        res.send(perinfo);
        
    });
});

});



module.exports=register;