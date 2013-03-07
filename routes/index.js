
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

/*
	GET /
*/


/*
	GET /
*/
exports.index = function(req, res) {
	
	console.log("listings page requested");
	// home page shows gallery of clothes that have been added
	var templateData = {
		subs : subjects,
		pageTitle : "All Classes"
	}

	res.render('index.html', templateData);
}

/*
	GET /c/:clothing_id
*/
exports.detail = function(req, res) {

	console.log("detail page requested for " + req.params.clothing_id);

	//get the requested subject by the param on the url :clothing_id
	var clothing_id = req.params.clothing_id;
	var currentCloth = getClothingById(clothing_id);

	if (!currentSubject) {
		res.status(404).render('404.html');
	}

	// bring in the classes based on the subject
	var currentClasses;
	if (currentSubject.slug === 'technology'){
		currentClasses = techclasses;
	}  
	else if (currentSubject.slug === 'business'){
		currentClasses = businessclasses;
	}
	else if (currentSubject.slug === 'wellness'){
		currentClasses = wellnessclasses;
	}
	var templateData = {
		sub : currentSubject,
		subs : subjects,
		pageTitle : currentSubject.category + " Classes",
		classes : currentClasses
	}

	res.render('detail.html', templateData);
}

/*
	GET /create
*/
exports.addCloth = function(req, res){

	var templateData = {
		page_title : 'Enlist a new astronaut'
	};

	res.render('create_form.html', templateData);
}

/*
	POST /create
*/
exports.createCloth = function(req, res) {
	
	console.log("received form submission");
	console.log(req.body);

	// accept form post data
	var newAstro = {
		name : req.body.name,
		birthdate : req.body.birthdate,
		skills : req.body.skills,
		photo : req.body.photoUrl,
		slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')
	}

	// push newAstro object into the 'astronauts' array.
	// this new astronaut will remain for as long as you 
	astronauts.push(newAstro)

	// redirect to the astronaut's page
	res.redirect('/astronauts/'+ newAstro.slug)

}

/*
	Class Data
*/ 

var techclasses = [];
techclasses.push({
	name : 'Web Basics',
	description : 'Create your first 3 Page Website with HTML, CSS, and a bit of Javascript.',
	photo : 'http://www.softwareconsultancy.net/images/web_design.jpg',
});

techclasses.push({
	name : 'Wordpress Basics',
	description : 'Create and launch your very first Wordpress site.',
	photo : 'http://s.wordpress.org/about/images/logos/wordpress-logo-notext-rgb.png',
});


techclasses.push({
	name : 'Dynamic Web with NodeJS',
	description : 'Learn NodeJS and bring a new level of interactivity to your work.',
	photo : 'http://nodejs.org/images/logos/nodejs-1280x1024.png',
});
techclasses.push({
	name : 'Web Basics',
	description : 'Create your first 3 Page Website with HTML, CSS, and a bit of Javascript.',
	photo : 'http://www.softwareconsultancy.net/images/web_design.jpg',
});

techclasses.push({
	name : 'Wordpress Basics',
	description : 'Create and launch your very first Wordpress site.',
	photo : 'http://s.wordpress.org/about/images/logos/wordpress-logo-notext-rgb.png',
});


techclasses.push({
	name : 'Dynamic Web with NodeJS',
	description : 'Learn NodeJS and bring a new level of interactivity to your work.',
	photo : 'http://nodejs.org/images/logos/nodejs-1280x1024.png',
});
techclasses.push({
	name : 'Web Basics',
	description : 'Create your first 3 Page Website with HTML, CSS, and a bit of Javascript.',
	photo : 'http://www.softwareconsultancy.net/images/web_design.jpg',
});

techclasses.push({
	name : 'Wordpress Basics',
	description : 'Create and launch your very first Wordpress site.',
	photo : 'http://s.wordpress.org/about/images/logos/wordpress-logo-notext-rgb.png',
});


techclasses.push({
	name : 'Dynamic Web with NodeJS',
	description : 'Learn NodeJS and bring a new level of interactivity to your work.',
	photo : 'http://nodejs.org/images/logos/nodejs-1280x1024.png',
});

techclasses.push({
	name : 'Web Basics',
	description : 'Create your first 3 Page Website with HTML, CSS, and a bit of Javascript.',
	photo : 'http://www.softwareconsultancy.net/images/web_design.jpg',
});

techclasses.push({
	name : 'Wordpress Basics',
	description : 'Create and launch your very first Wordpress site.',
	photo : 'http://s.wordpress.org/about/images/logos/wordpress-logo-notext-rgb.png',
});


techclasses.push({
	name : 'Dynamic Web with NodeJS',
	description : 'Learn NodeJS and bring a new level of interactivity to your work.',
	photo : 'http://nodejs.org/images/logos/nodejs-1280x1024.png',
});

// change this to clothes
var subjects = [];
subjects.push({
	slug : 'technology',
	category : 'Technology',
	description : ["See our classes in Programming, Web Development, Design, Multimedia, Office Tools, and more!"],
	photo : ['http://www.softwareconsultancy.net/images/web_design.jpg'],
});

subjects.push({
	slug : 'business',
	category : 'Business',
	description : ["See business classes in Marketing, Productivity, Entrepreneurship, Leadership, and many more"],
	photo : ['http://www.marketplaceleaders.org/wp-content/uploads/2010/06/Business_People_In_Front_Of_A_Green_Map.jpg']
});

subjects.push({
	slug : 'wellness',
	category : 'Wellness',
	description : ["Improve health and happiness with classes in nutrition, fitness, meditation, yoga, cooking, and more."],
	photo: ['http://main.nationalmssociety.org/images/content/pagebuilder/ILD_wellness_summit_jump.jpg']
});

var wellnessclasses = [];
wellnessclasses.push({
	name : 'Yoga',
	description : 'Practice Yoga online with a top guru.',
	photo : 'http://trialx.com/curetalk/wp-content/blogs.dir/7/files/2010/12/Yoga.jpg',
});

wellnessclasses.push({
	name : 'Meditation',
	description : 'Learn the art of meditation to de-stress.',
	photo : 'http://taliamarcheggiani.files.wordpress.com/2012/01/how-to-meditate-properly1.jpg',
});

wellnessclasses.push({
	name : 'Nutrition',
	description : 'Become healthier through this better nutrition class.',
	photo : 'http://www.sonoma.edu/campusrec/images/nutrition.jpeg',
});
wellnessclasses.push({
	name : 'Stress Relief 101',
	description : 'Learn tips and tricks to destress on the job.',
	photo : 'http://tinroofteas.com/wp-content/uploads/2012/02/Herbal-Blend_Tea_Stress-Relief.jpg',
});

wellnessclasses.push({
	name : 'Yoga',
	description : 'Practice Yoga online with a top guru.',
	photo : 'http://trialx.com/curetalk/wp-content/blogs.dir/7/files/2010/12/Yoga.jpg',
});

wellnessclasses.push({
	name : 'Meditation',
	description : 'Learn the art of meditation to de-stress.',
	photo : 'http://taliamarcheggiani.files.wordpress.com/2012/01/how-to-meditate-properly1.jpg',
});

wellnessclasses.push({
	name : 'Nutrition',
	description : 'Become healthier through this better nutrition class.',
	photo : 'http://www.sonoma.edu/campusrec/images/nutrition.jpeg',
});
wellnessclasses.push({
	name : 'Stress Relief 101',
	description : 'Learn tips and tricks to destress on the job.',
	photo : 'http://tinroofteas.com/wp-content/uploads/2012/02/Herbal-Blend_Tea_Stress-Relief.jpg',
});

wellnessclasses.push({
	name : 'Yoga',
	description : 'Practice Yoga online with a top guru.',
	photo : 'http://trialx.com/curetalk/wp-content/blogs.dir/7/files/2010/12/Yoga.jpg',
});

wellnessclasses.push({
	name : 'Meditation',
	description : 'Learn the art of meditation to de-stress.',
	photo : 'http://taliamarcheggiani.files.wordpress.com/2012/01/how-to-meditate-properly1.jpg',
});

wellnessclasses.push({
	name : 'Nutrition',
	description : 'Become healthier through this better nutrition class.',
	photo : 'http://www.sonoma.edu/campusrec/images/nutrition.jpeg',
});
wellnessclasses.push({
	name : 'Stress Relief 101',
	description : 'Learn tips and tricks to destress on the job.',
	photo : 'http://tinroofteas.com/wp-content/uploads/2012/02/Herbal-Blend_Tea_Stress-Relief.jpg',
});

var businessclasses = [];
businessclasses.push({
	name : 'Social Media',
	description : 'Take your social strategy to the next level!',
	photo : 'http://edudemic.com/wp-content/uploads/2013/02/social-media.png',
});

businessclasses.push({
	name : 'Productivity',
	description : 'Learn to work smarter and more productive.',
	photo : 'http://withoutwax.tv/wp-content/uploads/2012/08/Productivity11.jpg',
});

businessclasses.push({
	name : 'Marketing',
	description : 'Become a seasoned marketer in just 4 weeks.',
	photo : 'http://marketingsystemblueprints.com/wp-content/uploads/2009/10/marketing.jpg',
});
businessclasses.push({
	name : 'Leadership',
	description : 'Learn tips and tricks to be a true leader.',
	photo : 'http://www.innislife.utoronto.ca/wp-content/uploads/2011/01/image5.jpeg',

});
businessclasses.push({
	name : 'Social Media',
	description : 'Take your social strategy to the next level!',
	photo : 'http://edudemic.com/wp-content/uploads/2013/02/social-media.png',
});

businessclasses.push({
	name : 'Productivity',
	description : 'Learn to work smarter and more productive.',
	photo : 'http://withoutwax.tv/wp-content/uploads/2012/08/Productivity11.jpg',
});

businessclasses.push({
	name : 'Marketing',
	description : 'Become a seasoned marketer in just 4 weeks.',
	photo : 'http://marketingsystemblueprints.com/wp-content/uploads/2009/10/marketing.jpg',
});
businessclasses.push({
	name : 'Leadership',
	description : 'Learn tips and tricks to be a true leader.',
	photo : 'http://www.innislife.utoronto.ca/wp-content/uploads/2011/01/image5.jpeg',

});
businessclasses.push({
	name : 'Social Media',
	description : 'Take your social strategy to the next level!',
	photo : 'http://edudemic.com/wp-content/uploads/2013/02/social-media.png',
});

businessclasses.push({
	name : 'Productivity',
	description : 'Learn to work smarter and more productive.',
	photo : 'http://withoutwax.tv/wp-content/uploads/2012/08/Productivity11.jpg',
});

businessclasses.push({
	name : 'Marketing',
	description : 'Become a seasoned marketer in just 4 weeks.',
	photo : 'http://marketingsystemblueprints.com/wp-content/uploads/2009/10/marketing.jpg',
});
businessclasses.push({
	name : 'Leadership',
	description : 'Learn tips and tricks to be a true leader.',
	photo : 'http://www.innislife.utoronto.ca/wp-content/uploads/2011/01/image5.jpeg',

});


// Look up a clothing item by id
// accepts an 'id' parameter
// loops through all clothes, checking the 'id' property
// returns found clothing or returns false if not found
var getClothingById = function(id) {
	for(c in clothes) {
		var currentClothing = clothes[c];

		// does current cloting id match requested id?
		if (currentClothing.id == id) {
			return currentClothing;
		}
	}

	return false;
}