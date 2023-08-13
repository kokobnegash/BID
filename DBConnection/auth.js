var express =require('express')
var login=express.Router(); 


const ejs = require('ejs');

var path = require("path");
 var status="log out"; 

//login.set('view engine', 'ejs');
    var sql = require("mssql");
   login.use(express.json());
    login.use(express.urlencoded({ extended: false }));
    
    var conf=require('../Routes/DBConnection/Connection')   ; 
     
    var photopar=require('./image')
    
    var test=photopar("<Buffer 75 6e 64 65 66 69 6e 65 64>");
    login.post('/', function(req, res, next){

  var user=req.body.fname; 
  sql.connect(conf.config, function (err) {
    
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
       
    // query to the database and get the records
     let perinfo = "exec Login_  @username='" + req.body.username  + "', @password='" + req.body.password   +    "';";
 

    console.log( perinfo);
    //request.query("select * from TblUser", function (err, recordset) {
       request.query(perinfo , function (err,   recordset) {
        if (err) {console.log(err) } 
        else {

        }
  
        var resl=recordset.recordsets[0];
        var restest=resl[0];
        console.log( restest);
      
      if(restest){
      //  res.send('/login')
      
   res.sendFile(path.join(__dirname, "../views", "welcome.html"))
      }
      else{
     
res.redirect('/login')
      }



      //res.render(  'disUserinfo', {result:resl[0]});




    });
});

});



module.exports=login;