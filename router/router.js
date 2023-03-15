module.exports=function(app){
    app.get('/',function(req,res){
        res.render('korea.html');
    });
    app.get('/data',function(req,res){
        res.render('data.html');
    });
}