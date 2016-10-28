var express=require("express");
var app=express();

var PORT=process.env.PORT || 3000;

app.get("/",function(req,res){

	res.send("Hello Singapur!!!");
})

app.listen(PORT,function(){
	console.log("server is listening at port "+PORT);
})