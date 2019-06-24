'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...

var app = express();

var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage,limit:{
  fields:100,
  fileSize:1024*1024*5,
  files:1,
  parts:101
} })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse",upload.single('upfile'),function(req,res){
  res.json({
    name:req.file.originalname,
    size:req.file.size,
    type:req.file.mimetype
  })
  
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
