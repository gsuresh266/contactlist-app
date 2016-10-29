var express=require("express");
var app=express();
var mongoose=require("mongoose");

var contact=require("./mongoose/contact")
var bodyparsar =require("body-parser");



mongoose.connect("mongodb://localhost/contactlist",function(){

	console.log("successfully connected");
})

var PORT=process.env.PORT || 3000;


app.use(express.static(__dirname +"/public"))
app.use(bodyparsar.json());

app.get("/contactList",function(req,res){

contact.getContact(function(err,data){
	if(err)
	{
		throw err;
		console.log(err);
	}
	res.json(data);
})

app.post("/contactList",function(req,res){
 
 var body=req.body;
 contact.addContact(body,function(err,data){
 	if(err){
 		throw err;
 	}
	res.json(data);
 })

})
	/*var person1={

	name:"suresh",
	email:"suresh@tcs.com",
	mobile:"8121929530"
}

var person2={

	name:"kumar",
	email:"kumar@tcs.com",
	mobile:"7416565181"
}

var person3={

	name:"bhaskar",
	email:"bhaskar@tcs.com",
	mobile:"9052325232"
}
*/
/*var contactList=[person1,person2,person3];
res.send(contactList);*/
})

app.get("/contactList/:id",function(req,res){
var id=req.params.id;
console.log(id);
contact.getContactById(id,function(err,data){
	if(err)
	{
		throw err;
	}
	res.json(data);
})


})

app.put("/contactList/:id",function(req,res){
	var id=req.params.id;
	var body=req.body;

	contact.updateContact(id,body,function(err,data){
		if(err)
		{
			throw err;
		}
		res.json(data);
	})
})

app.delete("/contactList/:id",function(req,res){
	var id=req.params.id;
	console.log(id);
	contact.removeContact(id,function(err,data){
		if(err)
		{
			throw err;
		}
		res.json(data);
	})
})



app.listen(PORT,function(){
	console.log("server is listening at port "+PORT);
})