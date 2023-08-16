
var status = "log out";


var sql = require("mssql");

var conf = require('./DBConnection/Connection');
var restest = [];


function bidStory(itmid) {
   sql.connect(conf.config, function (err) {

      if (err) console.log(err);

      var request = new sql.Request();



      let perinfo = "exec seler_info  @itemid='" + itmid + "';";



      request.query(perinfo, function (err, recordset) {
         if (err) { console.log(err) }
         else {

         }


         restest = recordset.recordset;


      });

   });
   //console.log(restest)
   return restest;


}
//loadImg();

module.exports = { bidStory };