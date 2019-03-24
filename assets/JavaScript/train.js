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

// var dataRef = firebase.database();

//BUTTON FOR ADDING A NEW TRAIN
$('#submit-btn').on('click', function(event) {
	event.preventDefault();

	//IF ALL FIELDS DO NOT HAVE INPUTS, SHOW ERROR MESSAGE
	if (
		$('#train-name-input').val().trim() === '' ||
		$('#destination-input').val().trim() === '' ||
		$('#first-train-time-input').val().trim() === '' ||
		$('#frequency-input').val().trim() === ''
	) {
		alert('Please fill in all details to add new train');
	} else {
		//GRAB USER INPUTS ADN PUT THEM INTO VARIABLES
		var trainName = $('#train-name-input').val().trim();
		var destination = $('#destination-input').val().trim();
		var trainTime = $('#first-train-time-input').val().trim();
		var frequency = $('#frequency-input').val().trim();

		//CLEAR ALL THE INPUT FIELDS
		$('#train-name-input').val('');
		$('#destination-input').val('');
		$('#first-train-time-input').val('');
		$('#frequency-input').val('');

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
		alert('New train added successfully!');
	}
});

//Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on('child_added', function(childSnapshot) {
	// STORE ALL SNAPSHOT VALUES INTO VARIABLES
	var trainName = childSnapshot.val().newTrainName;
	var destination = childSnapshot.val().newDestination;
	var trainTime = childSnapshot.val().newTrainTime;
	var frequency = parseInt(childSnapshot.val().newFrequency);

	// CALCULATING TIMES WITH MOMENT.JS
	//CONVERT MILITARY TIME 
	var firstStartTimeConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');

	//GETTING THE TIME DIFFERENCE IN MINUTES
	var timeDiff = moment().diff(moment(firstStartTimeConverted), 'minutes');

	var timeRemain = timeDiff % frequency;

	var minutesAway = frequency - timeRemain;

	var nextArrival = moment().add(minutesAway, 'minutes');
	//nextArrival = moment(nextArrival).format("LT");

	//Create the new row
	var newRow = $('<tr>').append(
		$('<td>').text(trainName),
		$('<td>').text(destination),
		$('<td>').text(frequency),
		$('<td>').text(moment(nextArrival).format('LT')),
		$('<td>').text(minutesAway)
	);

	// Append the new row to the table
	$('#current-train-table > tbody').append(newRow);
});
