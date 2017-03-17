var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	if(req.user) {
		var data = {
		title: "Team Juan",
		user: req.user
	}
	console.log(req.user.username);
	res.render('index', data)
	}
	else {
		res.redirect('/auth/login')
	}
	
});

module.exports = router;
