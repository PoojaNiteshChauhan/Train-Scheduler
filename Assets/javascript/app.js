var firebaseConfig = {
  apiKey: "AIzaSyAg4GUkxsP8XwEor5HCyG5zlo8E8s138w0",
  authDomain: "trainschedule-7a19a.firebaseapp.com",
  databaseURL: "https://trainschedule-7a19a.firebaseio.com",
  projectId: "trainschedule-7a19a",
  storageBucket: "",
  messagingSenderId: "357694067995",
  appId: "1:357694067995:web:156c0b19c629f9da"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var TrainRef = firebase.database().ref('trainDetail');

getTrainInfo();

$("#submit").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#trainName").val()

  var Destination = $("#Destination").val()

  var trainTime = $("#trainTime").val()

  var Frequency = $("#Frequency").val()
  //console.log(trainName,Destination,trainTime,Frequency);

  TrainRef.push().set({
    trainName: trainName,
    Destination: Destination,
    trainTime: trainTime,
    Frequency: Frequency
  })


  getTrainInfo();

});

function getNextArrival( Frequency, FT) {

  var tFrequency = Frequency ;

    // Time is 3:30 AM

    var firstTime = FT ;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    //console.log(firstTimeConverted,);

    // Current Time
    var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    //return tMinutesTillTrain;
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    return moment(nextTrain).format("hh:mm");


}

function getMinutesAway(Frequency, FT) {


  var tFrequency = Frequency ;

    // Time is 3:30 AM
    var firstTime = FT ;
    

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    //console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    return tMinutesTillTrain;
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    //var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    //return (moment(nextTrain).format("hh:mm"));

}

function getTrainInfo() {
  $("#TrainSchedule").empty();
  TrainRef.on("child_added", function (snapshot) {

    $("#TrainSchedule").prepend(
      "<tr scope=\"row\">"
      + "<td>" + snapshot.val().trainName + "</td>"
      + "<td>" + snapshot.val().Destination + "</td>"
      + "<td>" + snapshot.val().Frequency + "</td>"
      + "<td>" + getNextArrival(snapshot.val().Frequency, snapshot.val().trainTime) + "</td>"
      + "<td>" + getMinutesAway(snapshot.val().Frequency, snapshot.val().trainTime) + "</td>"
      + "</tr>")

    ,function (errorObject) {
        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
      }})};