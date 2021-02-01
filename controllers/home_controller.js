module.exports.home=function(req,res){
	res.cookie('nish',44);
	console.log(req.cookie);
	return res.render('home',{
		title:'home'
	})
}