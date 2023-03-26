var weightInput = document.querySelector("#weight");
var feetInput = document.querySelector("#feet");
var inchesInput = document.querySelector("#inches");
var ageInput = document.getElementById("age");
var button = document.querySelector("#button");
var resultInput = document.getElementById("result");
var activityLevelInput = document.getElementById("activitylevel");
var weightgoalInput = document.getElementById("weightgoal");
var genderInput = document.getElementById("gender");
var BMI;
var weightCategory;
var calorie;
var age;
var weightType;
var options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e60181779bmsh462e2f0d660fcb9p1dd608jsnba604de95f99",
    "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
  },
};

//Function to covert pounds to Kilograms as this API takes kilograms
function lbsToKg(weightInLb) {
  return (weightInLb * 0.45359237).toFixed(2);
}

var formSubmitHandler = async function (event) {
  event.preventDefault();
  var weightInLb = weightInput.value.trim();
  var weight = lbsToKg(parseFloat(weightInLb));
  var feet = parseFloat(feetInput.value);
  var inches = parseFloat(inchesInput.value);
  //converting to cm as API need input in cm
  var height = feet * 30.48 + inches * 2.54;
  age = ageInput.value.trim();
  activityLevel = activityLevelInput.value.trim();
  weightgoal = weightgoalInput.value.trim();
  var gender = genderInput.value.trim();
  console.log(height, weight, age);
  console.log("getBMI called with age=", age, " weight=", weight, " height=", height);
  BMI = await getBMI(age, weight, height);
  calorie = await getDailyCalorieIntake(age, gender, height, weight, activityLevel, weightgoal);
  console.log("calorie value " +calorie);
  showWeightDetails(BMI, calorie, weightType);

};

//get the BMI by inputs age, height, age from input to BMI
var getBMI = function (age, weight, height) {
  var apiUrl =
    "https://fitness-calculator.p.rapidapi.com/bmi?age=" +
    age +
    "&weight=" +
    weight +
    "&height=" +
    height;
  return fetch(apiUrl, options)
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json().then((bmidata) => {
          console.log(bmidata.data.bmi);
          BMI = bmidata.data.bmi;
          weightType = bmidata.data.health
          return BMI;
        });
      } else {
        console.log("Error: " + response.statusText);
        return null;
      }
    })
    .catch((error) => {
      console.log("Error: " + error);
      return null;
    });
};

// //API 2: Takes the BMI and gets the weight Category.

  var getDailyCalorieIntake = function (
    age,
    gender,
    height,
    weight,
    activityLevel,
    weightgoal
  ) {
    var apiUrl =
      "https://fitness-calculator.p.rapidapi.com/macrocalculator?age=" +
      age +
      "&gender=" +
      gender +
      "&height=" +
      height +
      "&weight=" +
      weight +
      "&activitylevel=" +
      activityLevel +
      "&goal=" +
      weightgoal;
    return fetch(apiUrl, options)
      .then((response) => {
        if (response.ok) {
          return response.json().then((caloriedata) => {
            calorie = caloriedata.data.calorie; 
            console.log(calorie); 
            return calorie;

          });
        } else {
          console.log("Error: " + response.statusText);
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
};

var showWeightDetails = function (BMI, calorie, weightType) {
    var bmiSpan = document.getElementById("bmi");
    var calorieSpan = document.getElementById("calorie");
    var weightCategory = document.getElementById("weightType")
    bmiSpan.innerHTML = BMI;
    calorieSpan.innerHTML = calorie;
    weightCategory.innerHTML= weightType;
  
    // Show the modal
    var container = document.querySelector(".container");
    container.classList.add("is-active");

  };

// Add submit event to form
button.addEventListener("click", formSubmitHandler);
