const express=require('express');
const app=express();
const port=8000;

app.use('/',require('./routes'))

app.listen(port,function(err){
	if(err){
		console.log(`error in running the server: ${err}`);
	}
	console.log(`successfully running the server on port : ${port}`);
});