var config = {
    apiKey: "AIzaSyB3zRIE1EMPbaOPH99w0fj9_IN6nIt3j44",
    authDomain: "busscheduler-89f07.firebaseapp.com",
    databaseURL: "https://busscheduler-89f07.firebaseio.com",
    projectId: "busscheduler-89f07",
    storageBucket: "",
    messagingSenderId: "800163272015"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  //These are the variables that pull the info straight from Firebase
  var name = "";
  var destination = "";
  var frequency = "";
  var firstTime = "";
  var nextArrival = "";
  var nextArrivalFormatted = "";
  var minutesAway = "";
  var firstTimeConverted = "";
  var currentTime = "";
  var diffTime = "";
  var timeRemainder = "";
  var minutesTillTrain = "";

  var currentTime = moment().format("kk:mm");

  console.log(currentTime);
  // Capture Button Click
  $("#add-bus").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();
  
    // Get inputs
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstTime = $("#first-time-input").val().trim();
      firstTimeConverted = moment(firstTime, "hh:mm").subtract(1 , "years");
      currentTime = moment();
      diffTime = moment().diff(moment(firstTimeConverted) , "minutes");
      tRemainder = diffTime % frequency;
      minutesTillTrain = frequency - tRemainder;
      nextArrival = moment().add(minutesTillTrain , "minutes");
      nextArrivalFormatted = moment(nextArrival).format("hh:mm");
    
    if ($("#name-input").val() === "") {
      alert("Please enter bus name");
    }
    else if ($("#destination-input").val() === "") {
      alert("Please enter bus destination");
    }
    else if ($("#first-time-input").val() === "") {
      alert("Please enter the first time the bus runs");
    }
    else if ($("#frequency-input").val() === "") {
      alert("Please enter the frequency of the bus");
    }
    else {
      database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        nextArrivalFormatted: nextArrivalFormatted,
        minutesTillTrain: minutesTillTrain
      });
      //clear out all the inputs
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#first-time-input").val("");
      $("#frequency-input").val("");  

      console.log(name);
      console.log(destination);
      console.log(frequency);
      console.log(firstTime);
    }
  });
  
  database.ref().on("child_added", function (snapshot) {
    //new row every time
     
  //the employee is a new table row to hold all the columns 
    var newBus = $("<tr>");
    var newNameCol = $("<td>");
    var newDestinationCol = $("<td>");
    var newFrequencyCol = $("<td>");
    var newNextArrivalCol = $("<td>");
    var newMinutesTillTrainCol = $("<td>");

    newNameCol.text(snapshot.val().name);
    newDestinationCol.text(snapshot.val().destination);
    newFrequencyCol.text(snapshot.val().frequency);
    newNextArrivalCol.text(snapshot.val().nextArrivalFormatted);
    newMinutesTillTrainCol.text(snapshot.val().minutesTillTrain);
 
    newBus.append(newNameCol);
    newBus.append(newDestinationCol);
    newBus.append(newFrequencyCol);
    newBus.append(newNextArrivalCol);
    newBus.append(newMinutesTillTrainCol);

    $("#busStore").append(newBus);
  
    // If any errors are experienced, log them to console.
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  