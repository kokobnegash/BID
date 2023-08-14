var express =require('express')
var additem=express.Router(); 
var upload=require('express-fileupload');


    var sql = require("mssql");
    additem.use(express.json());
    additem.use(express.urlencoded({ extended: false }));
    
    var conf=require('./DBConnection/Connection')   ; 

    additem.use(upload())



    additem.post('/', function(req, res, next){

      //res.send("i am called")
     executeStoredProcedure(req) ;

});
async function executeStoredProcedure(req) {
  try {
    const pool = await sql.connect(conf.config);



    // Create a request object
    const request = pool.request();
    var fl=req.files;
    // Add input parameters to the request
    console.log(req.body.fname);
   request.input('category', sql.NVarChar(50),req.body.category );
   request.input('name', sql.NVarChar(50),req.body.name );
   request.input('description', sql.NVarChar(50),req.body.description );
   request.input('price', sql.NVarChar(50),req.body.InitialPrice );
  
   //request.input('photo', sql.VarBinary,fl.file.data );

    // Call the stored procedure
    const result = await request.execute('add_item');
    sql.close();
    console.log('Done succ', result);
  } catch (err) {
    console.error('Error executing stored procedure:', err);
  } finally {
    // Close the connection pool
    sql.close();
  }
}





module.exports=additem;