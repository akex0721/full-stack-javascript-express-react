var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var cors = require('cors');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// Database Config
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'space91',
  password : '',
  database : 'c9'
});

// connect to database
connection.connect(function(err)
{
  if(!err)  { console.log("Database is connected ..."); } 
  else { console.log("Error connecting database ..."); }
});

var users = [
  {
    id: 1,
    email: 'admin',
    password: '123456'
  },
  {
    id: 2,
    email: 'test',
    password: 'test'
  }
];

// JWT config
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'secretkey';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

// Passport Config
passport.use(strategy);
var app = express();
app.use(passport.initialize());

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// enables CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());

// default route
app.get("/", function(req, res) {
  res.json({message: "API Working!"});
});

// User Login
app.post("/login", function(req, res) {
  
  if(req.body.email && req.body.password){
    var email = req.body.email;
    var password = req.body.password;
  }
  var user = users[_.findIndex(users, {email: email})];
  if( ! user ){
    res.json({message:"email not found"});
  }

  if(user.password === password) 
  {
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({
      message: "ok", 
      token: token,
      user
    });
  } else {
    res.json({message:"Incorrect password"});
  }
});

app.post("/login", function(req, res) {

  var email = req.body.email;
  var password = req.body.password;
  
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) 
  {
    if (error) 
    {
      res.json({
          status:false,
          message:'there are some error with query'
      });
    }
    else
    {
      if(results.length >0)
      {
        if(password==results[0].password)
        {
            var payload = {id: results.id};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({
                status:true,
                message:'successfully authenticated',
                token: token
            });
        }
        else
        {
          res.json({
              status:false,
              message:"Email and password does not match"
          });
        }
      }
      else
      {
        res.json({
            status:false,    
            message:"Email does not exits"
        });
      }
    }
  });
});

// User Registration
app.post("/register", function(req, res) {
  var today = new Date();
  var users={
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "created_at":today,
        "updated_at":today
    };
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) 
    {
      if (error)
      {
        res.json({
            status:false,
            message:'there are some error with query'
        });
      }
      else
      {
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        });
      }
    });
});

app.get("/users", function(req,res){
  connection.query('SELECT * FROM users', function(error, results, fields )
  {
    res.json({
      data:results
    });
  });
});

app.get("/protected", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({message: "Success!"});
});

app.listen(8082 || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Server listening at", "0.0.0.0:8082");
});