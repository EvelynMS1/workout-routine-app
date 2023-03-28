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
var healthy_bmi_rangen;
var protein;
var carbs;
var fat;
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
          weightType = bmidata.data.health;
          healthy_bmi_range = bmidata.data.healthy_bmi_range;
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
            protein = caloriedata.data.balanced.protein;
            fat =caloriedata.data.balanced.fat;
            carbs=caloriedata.data.balanced.carbs;
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

// var showWeightDetails = function (BMI, calorie, weightType) {
//     var bmiSpan = document.getElementById("bmi");
//     var calorieSpan = document.getElementById("calorie");
//     var weightCategory = document.getElementById("weightType")
//     bmiSpan.innerHTML = BMI;
//     calorieSpan.innerHTML = calorie;
//     weightCategory.innerHTML= weightType;
  
//     // Show the modal
//     var container = document.querySelector(".container");
//     container.classList.add("is-active");

//   };
var showWeightDetails = function (BMI, calorie, weightType) {
    var container = document.querySelector(".container");
    container.innerHTML = "";

    var columns = document.createElement("div");
    columns.className = "columns is-centered";
    container.appendChild(columns);

    var column = document.createElement("div");
    column.className = "column is-half";
    columns.appendChild(column);

    var box = document.createElement("div");
    box.className = "box";
    column.appendChild(box);

    var title = document.createElement("h2");
    title.className = "title";
    title.textContent = "Balanced Diet Plan based on BMI and Health";
    box.appendChild(title);

    var content = document.createElement("div");
    content.className = "content";
    box.appendChild(content);

    var bmiPara = document.createElement("p");
    bmiPara.innerHTML = "<strong>BMI:</strong> <span id='bmi'>" + BMI + "</span>";
    content.appendChild(bmiPara);

    var weightTypePara = document.createElement("p");
    weightTypePara.innerHTML = "<strong>Health:</strong> <span id='weightType'>" + weightType + "</span>";
    content.appendChild(weightTypePara);

    var BMIRangePara = document.createElement("p");
    BMIRangePara.innerHTML = "<strong>Healthy BMI Range:</strong> <span id='Healthy BMI Range'>" + healthy_bmi_range + "</span>";
    content.appendChild(BMIRangePara);

    var caloriePara = document.createElement("p");
    caloriePara.innerHTML = "<strong>Calorie Intake:</strong> <span id='calorie'>" + calorie.toFixed(2) + "</span>";
    content.appendChild(caloriePara);

    var proteinPara = document.createElement("p");
    proteinPara.innerHTML = "<strong>Protein:</strong> <span id='protein'>" + protein.toFixed(2) + "g</span>";
    content.appendChild(proteinPara);

    var fatPara = document.createElement("p");
    fatPara.innerHTML = "<strong>Fat:</strong> <span id='fat'>" + fat.toFixed(2) + "g</span>";
    content.appendChild(fatPara);

    var carbsPara = document.createElement("p");
    carbsPara.innerHTML = "<strong>Carbs:</strong> <span id='carbs'>" + carbs.toFixed(2) + "g</span>";
    content.appendChild(carbsPara);





    // var img = document.createElement("img");
    // img.src = "./BMI/img.png"; 
    // img.alt = "count calories"; 
    // content.appendChild(img);

    // Show the modal
    container.classList.add("is-active");
};
// Add submit event to form
button.addEventListener("click", formSubmitHandler);
