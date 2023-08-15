var express =require('express')
var additem=express.Router(); 
var upload=require('express-fileupload');


    var sql = require("mssql");
    additem.use(express.json());
    additem.use(express.urlencoded({ extended: false }));
    
    var conf=require('./DBConnection/Connection')   ; 

    additem.use(upload())



    additem.post('/', function(req, res, next){
    
     
      sql.connect(conf.config, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        var fl=req.files;
        // query to the database and get the records
         
        request.input('category', sql.NVarChar(50),req.body.category );
        request.input('name', sql.NVarChar(50),req.body.name );
        request.input('description', sql.NVarChar(50),req.body.Description );
        request.input('price', sql.NVarChar(50),req.body.InitialPrice );
        request.input('photo', sql.VarBinary,req.files.file2.data );
        request.input('enddate', sql.DateTime,req.body.closingdate );
          // Call the stored procedure
          const result =  request.execute('add_item');
    
      
  
    
    
        });
    });
    
    












async function add_item(req) {
  try {
    const pool = await sql.connect(conf.config);



    // Create a request object
    const request = pool.request();
    var fln=req.files;

  
   request.input('category', sql.NVarChar(50),req.body.category );
   request.input('name', sql.NVarChar(50),req.body.name );
   request.input('description', sql.NVarChar(50),req.body.Description );
   request.input('price', sql.NVarChar(50),req.body.InitialPrice );
   request.input('photo', sql.VarBinary,req.files.file2.data );
  
  
    const result = await request.execute('add_item');
    sql.close();
    console.log('Done succ', result);
  } catch (err) {
    console.error('Error executing stored procedure:', err);
  } finally {
  
    sql.close();
  }
}





module.exports=additem;