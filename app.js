var express = require('express');
var app = express();
app.use(express.static(__dirname + '/Views'));
const ejs = require('ejs');
app.set('view engine', 'ejs');
var path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var url = require('url');
var conf=require('./DBConnection/Connection')
var login=require('./DBConnection/auth')
var reg=require('./Routes/Register')
var add=require('./Routes/postitem')
var img=require('./Routes/LoadImage')
var bid=require('./Routes/addBid')
var bidstory=require('./Routes/BIdStory')
var seller=require('./Routes/sellerInfo')



var load=require('./Routes/Loaditem')
var loadsingle=require('./Routes/LoadSingleitem')

app.use('/Register' , reg);
app.use('/auth' , login);
app.use('/postitem' , add);
app.use('/addBid' , bid);


    var sql = require("mssql");

app.get('/', function (req, res) {
   
    // connect to your database
  //
 const resu=img.loadImg()
 // console.log("inside")
 //console.log(img.loadImg());
res.render('index' , {item:img.loadImg()} )
 //
  // res.render ( "Register" );
    
});
app.get('/postbid', function (req, res) {
    const resu=load.loaditem()
res.render('BidPost' , {item:resu} )
});


app.get('/bid' , function(req, res,next){

    var queryData = url.parse(req.url, true).query;
  
    const resu=loadsingle.loadImg(queryData.itemid)
    const resu2=bidstory.bidStory(queryData.itemid)
    const resu3=seller.bidStory(queryData.itemid)
  // res.render('index' , {item:img.loadImg()} )
  console.log("neweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee "); 
  console.log(resu3[0]);
 
   res.render ('Buyarea' , {item:resu[0]  , item2 : resu2 , item3 : resu3[0]} );

});

app.get('/login' , function(req, res,next){

    res.sendFile ( path.join(__dirname ,  'views' ,"Login.html" ));

});


app.get('/signup' , function(req,res,next){


res.render("register");

});





//console.log(img.loadImg());


var server = app.listen(5000, function () {
    console.log('Server is running');
});