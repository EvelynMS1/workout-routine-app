var bodyApiInfo = document.getElementById("boxdisplay");
var fetchbtn = document.getElementById("fetchNtA");
var input = document.getElementById("requestedFoodItem");
var mondaydiv = document.getElementById("Weekdisplay");
var recipediv1 = document.getElementById("recipe-dropdown-selection");
var recipeimage = document.getElementById("image-recipe");
var recipelabel = document.getElementById("label-recipe");
var dayofweekmondiv = document.getElementById("mondaydiv");

//Function converting input feild content to lowercase replacing commas
//Calls getUserRecipe Function
var inputReciRequest = function (event) {
  event.preventDefault();
  var item = input.value;
  var newitem = item.toLowerCase();
  var commastring = newitem.replace(/\s/g, ",");
  getUserRecipe(commastring);
  console.log(commastring);
};

//Function that takes the user input as a parameter string for API fetch.
var getUserRecipe = function (userInput) {
  console.log(userInput);
  var apiUrl =
    "https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&beta=true&q=" +
    userInput +
    "&co2EmissionsClass=A%2B";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "39b0eab361msh1520b77656ade64p1b4290jsn67a3ea8e7d6f",
      "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
    },
  };
  //Fetch call declares function displayRecipes - takes data as parameter (api response)
  fetch(apiUrl, options)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRecipes(data);
        });
      } else {
        alert("error" + response.statusText);
      }
    })
    .catch((err) => console.error(err));
};

//Declaring variable objectpropdata
var objectpropdata;
//Function displayRecipes takes data recieved from api fetch as parameter, to then display data
var displayRecipes = function (data) {
  objectpropdata = data;
  console.log("line 56", objectpropdata);
  //disecting information for needed parts
  for (var i = 0; i < objectpropdata.hits.length; i++) {
    //creates dynamic button adds a class adds p and img tag
    var storlabelimagebutton = document.createElement("button");
    //     storlabelimagebutton.addEventListener('click',function(){
    //       buttonClicked(objectpropdata)
    //  });

    storlabelimagebutton.classList.add("stylefordivwithinlabel-recipe");
    storlabelimagebutton.style.width = "180px";
    storlabelimagebutton.style.height = "180px";

    var labelRecipe = document.createElement("p");
    //adding data to variable
    var individuallabels = objectpropdata.hits[i].recipe.label;
    //adding variable with data to created p tag
    labelRecipe.textContent = individuallabels;

    //adding created p tag to button
    storlabelimagebutton.appendChild(labelRecipe);
    //creating img element
    var imageRecipe = document.createElement("img");
    //data assigned to variable
    var imagerec = objectpropdata.hits[i].recipe.image;
    var recipeObj = objectpropdata.hits[i].recipe;
    imageRecipe.src = imagerec;

    //styling to img
    imageRecipe.style.width = "100px";
    imageRecipe.style.height = "100px";

    storlabelimagebutton.appendChild(imageRecipe);
    console.log("line 89", storlabelimagebutton);

    recipelabel.appendChild(storlabelimagebutton);
    storlabelimagebutton.addEventListener("click", function () {
      buttonClicked(recipeObj);
    });
  }
  // savebtn(storlabelimagebutton);
};

function savebtn(createdBTN) {
  //save created  btn to an array
  var btnarray = [];
  btnarray = btnarray.push(createdBTN);
  loopoverbtn(btnarray);
}
//Function looping over array of buttons
function loopoverbtn(array) {
  for (i = 0; i < array.length; i++) {
    btndiv = document.createElement("div");
    btndiv.innerHTML = array[i];
    document.getElement(recipelabel).appendChild(btndiv);
  }
}

function data(url, digest) {
  var objecttostore = {
    urlarray: [],
    //digestarray for loop to get individual parts of the array
    digestarray: [],
  };

  objecttostore = objecttostore.urlarray.push(url);
  objecttostore = objecttostore.digestarray.push(digest);
}

function buttonClicked(data) {
  // const ingredientlines = objectpropdata.hits[i].recipe.ingredientLines;
  //    objecttostore.digestarray.push(digestrecipe);
  //    objecttostore.urlarray.push(urlforrecipe);
  //   var urlforrecipe = [];
  //   urlforrecipe = urlforrecipe.concat (
  //     JSON.stringify (objectpropdata.hits[i].recipe.url)
  //   );
  //   //stringifying data
  //   digestrecipe = JSON.stringify (objectpropdata.hits[i].recipe.digest);
  // localStorage.setItem (
  //   'recipedigest',
  //   JSON.stringify (objecttostore.digestarray)
  // );
  // localStorage.setItem ('recipeURL', objecttostore.urlarray);
  // // console.log(totalarray);
  // const recipStr = localStorage.getItem ('recipeURL');
  // const passedurlarrary = JSON.parse (recipStr);
  // //const parsedRecipUrlArr = (recipStr);
  // var divwithStoredUrl = document.createElement ('div');
  // divwithStoredUrl.innerHTML = passedurlarrary;
  // //parsedRecipUrlArr;
  // dayofweekmondiv.appendChild (divwithStoredUrl);
  // const recipstrdigest = localStorage.getItem ('recipedigest');
  // const passeddigestarray = JSON.parse (recipstrdigest);
  // var divwithStoredDigest = document.createElement ('div');
  // divwithStoredDigest.innerHTML = passeddigestarray;
  // dayofweekmondiv.appendChild (divwithStoredDigest);
}

//Event Listeners for Button clicked in search bar, Calls inputReciRequest
function displayPicturesandlabel() {
  fetchbtn.addEventListener("click", inputReciRequest);
}
document
  .getElementById("weekday-container")
  .addEventListener("click", displayPicturesandlabel);
