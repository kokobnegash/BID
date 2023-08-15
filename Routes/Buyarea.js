var express =require('express')
var register=express.Router(); 
var upload=require('express-fileupload');
  register.use(upload())

    var sql = require("mssql");
    register.use(express.json());
    register.use(express.urlencoded({ extended: false }));
    
    var conf=require('./DBConnection/Connection')   ; 

   



    register.post('/', function(req, res, next){

   //res.send("i am called")
    //  res.render("/regster")

    
     bid(req) ;

});
async function bid(req) {
  try {
    const pool = await sql.connect(conf.config);
console.log(" I am called")
    
    // Create a request object
    const request = pool.request();
    var fl=req.files;
    request.input('userid', sql.Int,req.body.userid );
     request.input('amount', sql.Money,req.body.inprice );
   
   request.input('itemid', sql.Int,req.body.itemid );
  
  

    // Call the stored procedure
    const result = await request.execute('bid');

    console.log('Data Saved', result);
  } catch (err) {
    console.error('Error executing stored procedure:', err);
  } finally {
    // Close the connection pool
    sql.close();
  }
}





module.exports=register;