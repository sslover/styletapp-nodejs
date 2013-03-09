/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

var moment = require("moment"); // date manipulation library
var clothingModel = require("../models/clothes.js"); //db model


/*
	GET /
*/
exports.index = function(req, res) {

	console.log("home page requested");

	// query for all clothing 
	// .find will accept 3 arguments
	// 1) an object for filtering {} (empty here)
	// 2) a string of properties to be return, 'name id photo caption' will return only the name, id, photo, and caption of all returned clothes
	// 3) callback function with (err, results)
	//    err will include any error that occurred
	//	  allClothes is our resulting array of clothes
	clothingModel.find({}, 'name _id photo caption', function(err, allClothes){

		if (err) {
			res.send("Unable to query database for this clothing :(").status(500);
		};

		console.log("retrieved " + allClothes.length + " clothes from database");

		var templateData = {
			clths : allClothes,
			pageTitle : "Styletapp | Your Style Tracker"
		}

		res.render('index.html', templateData);
	});

}

/*
	GET /c/:clothing_id
*/
exports.detail = function(req, res) {

	console.log("detail page requested for " + req.params.clothing_id);

	//get the requested clothing by the param on the url :clothing_id
	var clothing_id = req.params.clothing_id;

	// query the database for that clothing id
	clothingModel.findOne({_id:clothing_id}, function(err, currentClothing){

		if (err) {
			return res.status(500).send("There was an error on this clothing query :(");
		}

		if (currentClothing == null) {
			return res.status(404).render('404.html');
		}

		console.log("Found clothing!");
		console.log(currentClothing.name);

			//prepare template data for view
			var templateData = {
				clothing : currentClothing,
				pageTitle : currentClothing.name
			}

			// render and return the template
			res.render('detail.html', templateData);

	}); // end of .findOne query

}

/*
	GET /c/:clothing_id/edit
	edit clothing form - to do
*/
exports.editForm = function(req, res) {

	console.log("edit form requested for " + req.params.clothing_id);

	//get the requested clothing by the param on the url :clothing_id
	var clothing_id = req.params.clothing_id;

	// query the database for that clothing id
	clothingModel.findOne({_id:clothing_id}, function(err, currentClothing){

		if (err) {
			return res.status(500).send("There was an error on this clothing query :(");
		}

		if (currentClothing == null) {
			return res.status(404).render('404.html');
		}

		console.log("Found clothing!");
		console.log(currentClothing.name);

			//prepare template data for view
			var templateData = {
				clothing : currentClothing,
				pageTitle : "Edit " + currentClothing.name
			}

			// render and return the template
			res.render('edit_form.html', templateData);

	}); // end of .findOne query

}
/*
	POST /edit
*/
exports.editClothing = function(req, res) {

	console.log("received form submission");
	console.log(req.body);

	// accept form post data
	newClothing = new clothingModel();
		newClothing.name = req.body.name;
		newClothing.photo = req.body.photoUrl;
		newClothing.type = req.body.type;
		newClothing.caption = req.body.caption;
		newClothing.brand = req.body.brand;
		newClothing.id = 1;

    console.log(newClothing.name + newClothing.photo + newClothing.type + newClothing.caption + newClothing.brand + newClothing.id);
	// save the newClothing to the database
	newClothing.save(function(err){
		if (err) {
			console.error("Error on saving new clothing");
			console.error("err");
			return res.send("There was an error when creating the new clothing");

		} else {
			console.log("Created a new clothing!");
			console.log(newClothing);

			// redirect to the clothing page
			res.redirect('/c/'+ newClothing.id)
		}

	});

}

/*
	GET /create
*/
exports.addClothing = function(req, res){

	var templateData = {
		pageTitle : "Add New Clothing!"
	};

	res.render('create_form.html', templateData);
}

/*
	POST /create
*/
exports.createClothing = function(req, res) {

	console.log("received form submission");
	console.log(req.body);

	// accept form post data
	newClothing = new clothingModel();
		newClothing.name = req.body.name;
		newClothing.photo = req.body.photoUrl;
		newClothing.type = req.body.type;
		newClothing.caption = req.body.caption;
		newClothing.brand = req.body.brand;
		newClothing.id = 1;

    console.log(newClothing.name + newClothing.photo + newClothing.type + newClothing.caption + newClothing.brand + newClothing.id);
	// save the newClothing to the database
	newClothing.save(function(err){
		if (err) {
			console.error("Error on saving new clothing");
			console.error("err");
			return res.send("There was an error when creating the new clothing");

		} else {
			console.log("Created a new clothing!");
			console.log(newClothing);

			// redirect to the clothing page
			res.redirect('/c/'+ newClothing.id)
		}

	});

}

exports.loadData = function(req, res) {

	// load initial clothing into the database
	for(c in clothes) {

		//get loop's current clothing
		currClothing = clothes[c];

		// prepare clothing for database
		tmpClothing = new clothingModel();
		//tmpClothing._id = currClothing._id;
		tmpClothing.name = currClothing.name;
		tmpClothing.photo = currClothing.photo;
		tmpClothing.type = currClothing.type;
		tmpClothing.caption = currClothing.caption;
		tmpClothing.brand = currClothing.brand;

		// save tmpClothing to database
		tmpClothing.save(function(err){
			// if an error occurred on save.
			if (err) {
				console.error("error on save");
				console.error(err);
			} else {
				console.log("Clothing loaded/saved in database");
			}
		});

	} //end of for-in loop

	// respond to browser
	return res.send("loaded clothing!");

} // end of loadData function

//mobile app
exports.parseJson = function(req, res) {

	console.log("received new JSON");
	console.log(req.body);

	// accept form post data
	newClothing = new clothingModel();
		newClothing.name = req.body.name;
		newClothing.photo = req.body.photoUrl;
		newClothing.type = req.body.type;
		newClothing.caption = req.body.caption;
		newClothing.brand = req.body.brand;
		newClothing.id = 1;

    console.log(newClothing.name + newClothing.photo + newClothing.type + newClothing.caption + newClothing.brand + newClothing.id);
	// save the newClothing to the database
	newClothing.save(function(err){
		if (err) {
			console.error("Error on saving new clothing");
			console.error("err");
			return res.send("There was an error when creating the new clothing");

		} else {
			console.log("Created a new clothing!");
			console.log(newClothing);

			// redirect to the clothing page
			res.redirect('/c/'+ newClothing.id)
		}

	});

}

/*
	Initial Test Data
*/ 

var clothes = [];
clothes.push({
	//_id : 0,
	//user_id : 0,
	photo : 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPN-2000-001027.jpg/394px-GPN-2000-001027.jpg',
	name : 'John Varvatos Slacks',
	type : 'Pants',
	caption : 'Stylish John Varvatos Converse slacks. <8',
	brand : 'John Varvatos!'
});



// Look up a clothing item by id
// accepts an 'id' parameter
// loops through all clothes, checking the 'id' property
// returns found clothing or returns false if not found
var getClothingById = function(_id) {
	for(c in clothes) {
		var currentClothing = clothes[c];

		// does current cloting id match requested id?
		if (currentClothing._id == _id) {
			return currentClothing;
		}
	}

	return false;
}