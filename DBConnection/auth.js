var express =require('express')
var login=express.Router(); 



const ejs = require('ejs');

var path = require("path");
 var status="log out"; 

 const oneDay = 1000 * 60 * 60 * 24;
 const cookieParser = require("cookie-parser");
 const sessions = require('express-session');
 login.use(sessions({
     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
     saveUninitialized:true,
     cookie: { maxAge: oneDay },
     resave: false
 }));
 
 var session;
//login.set('view engine', 'ejs');
    var sql = require("mssql");
   login.use(express.json());
    login.use(express.urlencoded({ extended: false }));
    
    var conf=require('../Routes/DBConnection/Connection')   ; 
     

    
   
    login.post('/', function(req, res, next){


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
        
      if(restest){

        session=req.session;
        session.userid=2;
      // res.render('disUserinfo', {result:restest})
      res.send('/')
   //res.sendFile(path.join(__dirname, "../views", "welcome.html"))
      }
      else{
     
res.redirect('/login')
      }



      //res.render(  'disUserinfo', {result:resl[0]});




    });
});

});



module.exports=login;