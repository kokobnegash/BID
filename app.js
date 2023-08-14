var express = require('express');
var app = express();
app.use(express.static(__dirname + '/Views'));
const ejs = require('ejs');
app.set('view engine', 'ejs');
var path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var conf=require('./DBConnection/Connection')
var login=require('./DBConnection/auth')
var reg=require('./Routes/Register')
var add=require('./Routes/postitem')



app.use('/Register' , reg);
app.use('/auth' , login);
app.use('/postitem' , add);



    var sql = require("mssql");

app.get('/', function (req, res) {
   
    // connect to your database

  res.render('BidPost')
  //  res.sendFile ( path.join(__dirname ,  'views' ,"index.ejs" ));
    
});



app.get('/login' , function(req, res,next){

    res.sendFile ( path.join(__dirname ,  'views' ,"Login.html" ));

});


app.post('/test' , function(req,res,next){


res.send("test");
});







var server = app.listen(5000, function () {
    console.log('Server is running');
});