const express=require('express');
const app=express();
var router = require('./router/router')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(express.static('js'))

var server = app.listen(3529, function(){
    console.log("Express server has started on port 3529")
});