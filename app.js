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
var add=require('./Routes/Bidpost')
var img=require('./Routes/Index')
var bid=require('./Routes/Buyarea')

var bidstory=require('./Routes/BIdStory')
var seller=require('./Routes/sellerInfo')
/// Coookies 
const oneDay = 1000 * 60 * 60 * 24;
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

var session;
//////////////////////
var load=require('./Routes/Loaditem')
var loadsingle=require('./Routes/LoadSingleitem')

app.use('/Register' , reg);
app.use('/auth' , login);
app.use('/Bidpost' , add);
app.use('/Buyarea' , bid);


    var sql = require("mssql");

app.get('/', function (req, res) {
   
    // connect to your database
  //
 const resu=img.loadImg()
 // console.log("inside")
 //console.log(img.loadImg());

 session=req.session;
    if(session.userid){
res.render('index' , {item:img.loadImg()} )
 }


 else {

    res.sendFile ( path.join(__dirname ,  'views' ,"Login.html" ));

 }






 //
  // res.render ( "Register" );
    
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});


app.get('/postbid', function (req, res) {

    session=req.session;
    if(session.userid){
  const resu=load.loaditem()
res.render('BidPost' , {item:resu} )
    }
    else{
        res.sendFile ( path.join(__dirname ,  'views' ,"Login.html" ));

    }


  
});


app.get('/bid' , function(req, res,next){

    var queryData = url.parse(req.url, true).query;
  
    const resu=loadsingle.loadImg(queryData.itemid)
    const resu2=bidstory.bidStory(queryData.itemid)
    const resu3=seller.bidStory(queryData.itemid)
  // res.render('index' , {item:img.loadImg()} )
  session=req.session;
  if(session.userid){


res.render ('Buyarea' , {item:resu[0]  , item2 : resu2 , item3 : resu3[0]} );

  }

  else {

    res.sendFile ( path.join(__dirname ,  'views' ,"Login.html" ));

  }
 
   

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