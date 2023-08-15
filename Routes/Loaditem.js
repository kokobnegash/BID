
 var status="log out"; 

//login.set('view engine', 'ejs');
    var sql = require("mssql");
   
    var conf=require('./DBConnection/Connection')   ; 
    //var restest=[]; 
    
   // var test=photopar("<Buffer 75 6e 64 65 66 69 6e 65 64>");
   function loaditem(){
  sql.connect(conf.config, function (err) {
    
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
     let perinfo = "exec loaditem  @userid='" + 2  +    "';";
 

    //request.query("select * from TblUser", function (err, recordset) {
       request.query(perinfo , function (err,   recordset) {
        if (err) {console.log(err) } 
        else {

        }
  
        var resl=recordset.recordsets[0];
         restest=recordset.recordset;
        
       
     //  console.log(recordset.recordset)
       

     // res.render(  'BidPost', {result:resl[0]});


 

    }); 

});
//console.log(restest)
return restest;


}


module.exports= {loaditem};