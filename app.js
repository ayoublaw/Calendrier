var express = require('express');
var app = express();

app.get('/',function(req,res){
   res.render("Page Principale") 
});

var listener = app.listen(process.env.PORT, function () {
  console.log('application est en cours sur PORT ' + listener.address().port);
});
