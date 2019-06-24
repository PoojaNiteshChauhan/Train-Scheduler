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
    
    var trainName =  $("#trainName").val()

    var Destination = $("#Destination").val()

    var trainTime = $("#trainTime").val()

    var Frequency = $("#Frequency").val()
    //console.log(trainName,Destination,trainTime,Frequency);
    
    TrainRef.push().set({
        trainName : trainName,
        Destination : Destination,
        trainTime : trainTime,
        Frequency : Frequency
    })

    
    getTrainInfo();

  });
  

function getTrainInfo()
{
    TrainRef.on("child_added", function(snapshot) {
        $("#TrainSchedule").prepend ("<li>"+ snapshot.val().trainName
                            + snapshot.val().Destination
                            + snapshot.val().trainTime
                            + snapshot.val().Frequency
                            + "</li>");
        


    }



    , function(errorObject) {

        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
      });
  
}