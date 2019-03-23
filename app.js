// Initialize Firebase
var config = {
    apiKey: "AIzaSyCCBnltuc_jaZMc1r8e2gl3uXeXM2MWeRQ",
    authDomain: "trainscheduling-c6d5d.firebaseapp.com",
    databaseURL: "https://trainscheduling-c6d5d.firebaseio.com",
    projectId: "trainscheduling-c6d5d",
    storageBucket: "trainscheduling-c6d5d.appspot.com",
    messagingSenderId: "748679076275"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// var dataRef = firebase.database();

//BUTTON FOR ADDING A TRAIN
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

	//GRAB USER INPUTS ADN PUT THEM INTO VARIABLES
	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var trainTime = $("#first-train-time-input").val().trim();
	var frequency = $("#frequency").val().trim();

	//TEMP OBJECT TO HOLD NEW TRAIN DATA
	var newTrain = {
		newTrainName: trainName,
		newDestination: destination,
		newTrainTime: trainTime,
		newFrequency: frequency,
		// dateAdded: firebase.database.ServerValue.TIMESTAMP
	};

	//UPLOAD TRAIN DATA TO DATABASE
	database.ref().push(newTrain);

	// console.log(newTrain.newTrainName);
	// console.log(newTrain.newDestination);
	// console.log(newTrain.newTrainTime);
	// console.log(newTrain.newFrequency);

	//CLEARS ALL THE INPUT FIELDS
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-time-input").val("");
	$("#frequency").val("");
});
