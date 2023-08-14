var express =require('express')
var register=express.Router(); 
var upload=require('express-fileupload');


    var sql = require("mssql");
    register.use(express.json());
    register.use(express.urlencoded({ extended: false }));
    
    var conf=require('./DBConnection/Connection')   ; 

     register.use(upload())



    register.post('/', function(req, res, next){

      executeStoredProcedure(req) ;

});
async function executeStoredProcedure(req) {
  try {
    const pool = await sql.connect(conf.config);

    // Define the input parameters
    const param1Value = 'parameter_value_1';
    const param2Value = 'parameter_value_2';

    // Create a request object
    const request = pool.request();
    var fl=req.files;
    // Add input parameters to the request
    console.log(req.body.fname);
   request.input('fname', sql.NVarChar(50),req.body.fname );
   request.input('mname', sql.NVarChar(50),req.body.mname );
   request.input('lname', sql.NVarChar(50),req.body.lname );
   request.input('email', sql.NVarChar(50),req.body.email );
   request.input('street', sql.NVarChar(50),req.body.street );
   request.input('tel', sql.NVarChar(50),req.body.tel );
   request.input('username', sql.NVarChar(50),req.body.username );
   request.input('password', sql.NVarChar(50),req.body.password );
   request.input('type', sql.Int,req.body.type );
   request.input('photo', sql.VarBinary,fl.file.data );

    // Call the stored procedure
    const result = await request.execute('reg_user');

    console.log('Stored procedure executed successfully:', result);
  } catch (err) {
    console.error('Error executing stored procedure:', err);
  } finally {
    // Close the connection pool
    sql.close();
  }
}





module.exports=register;