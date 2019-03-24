
// Initialize Firebase
var config = {
	apiKey: 'AIzaSyAW17qXQinCY13slNGBJX720ka_ZMH6fEo',
	authDomain: 'my-awesome-project-e8c3a.firebaseapp.com',
	databaseURL: 'https://my-awesome-project-e8c3a.firebaseio.com',
	projectId: 'my-awesome-project-e8c3a',
	storageBucket: 'my-awesome-project-e8c3a.appspot.com',
	messagingSenderId: '682157073552'
};
firebase.initializeApp(config);

var database = firebase.database();

var dataRef = firebase.database();

//BUTTON FOR ADDING A NEW TRAIN
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

	//GRAB USER INPUTS ADN PUT THEM INTO VARIABLES
	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
    var trainTime = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
	
	//TEMP OBJECT TO HOLD NEW TRAIN DATA
	var newTrain = {
		newTrainName: trainName,
		newDestination: destination,
		newTrainTime: trainTime,
		newFrequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	};

	//UPLOAD TRAIN DATA TO DATABASE
    database.ref().push(newTrain);
    
    //ALERTING FOR ADDING A NEW TRAIN
    alert("New train added successfully!");
    
    //CLEARS ALL THE INPUT FIELDS
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-time-input").val("");
    $("#frequency").val("");
});

//Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(childSnapshot) {

    // STORE ALL SNAPSHOT VALUES INTO VARIABLES
    var trainName = childSnapshot.val().newTrainName;
    var destination = childSnapshot.val().newDestination;
    var trainTime = childSnapshot.val().newTrainTime;
    var frequency = childSnapshot.val().newFrequency;

    console.log(moment());

    // console.log(moment(trainTime, 'HH:mm').format('hh:mm a'));

    console.log(moment("8:00 pm",'HH mm'));


    // var travelTime = moment().add(11, 'minutes').format('hh:mm A');// it will add 11 mins in the current time and will give time in 03:35 PM format; can use m or minutes 

		    
//     // Prettify the employee start
//     var startDateInReadableFormat = moment.unix(empStart).format("MM/DD/YYYY");
//     //console.log("DATE FORMAT IN HUMAN READABLE: " + startDateInReadableFormat);

//     // Calculate the months worked using hardcore math
//     // To calculate the months worked
//     var empMonths = moment().diff(moment(empStart, "X"), "months");
//     //console.log("TOTAL MONTHS WORKED: " + empMonths);

//     // Calculate the total billed rate
//     var empBilled = empMonths * empRate;
//     //console.log("TOTAL BILL: " + empBilled);	
    
//     // Create the new row
//     var newRow = $('<tr>').append(
// 			$('<td>').text(empName),
// 			$('<td>').text(empRole),
// 			$('<td>').text(startDateInReadableFormat),
//       $('<td>').text(empMonths),
//       $("<td>").text(empRate),
//       $("<td>").text(empBilled)      
// 		);

// 		// Append the new row to the table
//     $('#employee-table > tbody').append(newRow);

});
