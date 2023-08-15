
 var status="log out"; 


    var sql = require("mssql");
   
    var conf=require('./DBConnection/Connection')   ; 
    var restest=[]; 
    
   
   function loadImg(){
  sql.connect(conf.config, function (err) {
    
    if (err) console.log(err);
    
    var request = new sql.Request();

    
     let perinfo = "exec load_items_index ;";
 

    
       request.query(perinfo , function (err,   recordset) {
        if (err) {console.log(err) } 
        else {

        }
  
        var resl=recordset.recordsets[0];
         restest=recordset.recordset;
        
       
      console.log(recordset.recordset)
       

     // res.render(  'BidPost', {result:resl[0]});


 

    }); 

});
//console.log(restest)
return restest;


}
loadImg();

module.exports= {loadImg};