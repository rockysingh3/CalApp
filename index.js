const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");
const mongoose = require('mongoose');
// check if the db is connected
const db = require('./app/db');


// Addanevent Schema
const AddAnEvent = require('./models/Event');



// app config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');







const Calendar = [
	{
		month: "January", days: moment('2017-01').daysInMonth()
	},
	{
		month: "February", days: moment('2017-02').daysInMonth()
	},
	{
		month: "March", days: moment('2017-03').daysInMonth()
	},
	{
		month: "April", days: moment('2017-04').daysInMonth()
	},
	{
		month: "May", days: moment('2017-05').daysInMonth()
	},
	{
		month: "June", days: moment('2017-06').daysInMonth()
	},
	{
		month: "July", days: moment('2017-07').daysInMonth()
	},
	{
		month: "August", days: moment('2017-08').daysInMonth()
	},
	{
		month: "September", days: moment('2017-09').daysInMonth()
	},
	{
		month: "October", days: moment('2017-10').daysInMonth()
	},
	{
		month: "November", days: moment('2017-11').daysInMonth()
	},
	{
		month: "December", days: moment('2017-12').daysInMonth()
	}
];



// gives you the current year
var CurrentYear = moment().year();
// gives you the current day of the month
var CurrentDayOfTheMonth = moment().date();
// gives you the current month of the year
var CurrentMonthOfTheYear = moment().month();







function daysInMonth(month, year){
	return new Date(year, month, 0).getDate();
}

// appends each day into the ul for the days
var n = daysInMonth(CurrentMonthOfTheYear, CurrentYear);






// all the routes
// main route
app.get("/", function(req, res){
	AddAnEvent.find({}, function(err, newEvent){
		if(err){
			console.log(err);
		}else{
			res.render("main", {
			CurrentDayOfTheMonth: CurrentDayOfTheMonth,
			Calendar: Calendar,
			CurrentYear: CurrentYear,
			CurrentMonthOfTheYear: CurrentMonthOfTheYear,
			newEvent: newEvent,
			n: n
			});
		}
	});
});

// add an event page
app.get("/addAnEvent", function(req, res){
	res.render("addAnEvent");
});

app.post("/main", function(req, res){
	var title = req.body.title;
	var location = req.body.location;
	var notes = req.body.notes;
	var newEventAdded = {title: title, location: location, notes: notes};

	AddAnEvent.create(newEventAdded, function(err, newEvent){
		if(err){
			console.log(err);
		} else {
			res.redirect("/");
		}
	});
});


// exporting moment to ejs
exports.index = function(req, res){
	res.render('index', {moment: moment});
}


app.listen(3000, function(){
	console.log("The app is running on port 3000");
});
