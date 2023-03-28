var bodyApiInfo = document.getElementById ('boxdisplay');
var fetchbtn = document.getElementById ('fetchNtA');
var input = document.getElementById ('requestedRecipe');
var mondaydiv = document.getElementById ('datadisplay');
var recipediv1 = document.getElementById ('recipe-dropdown-selection');
var recipeimage = document.getElementById ('image-recipe');
var recipelabel = document.getElementById ('label-recipe');
var dayofweekmondiv = document.getElementById ('mondaydiv');
//event when click button is pressed in input field, takes value for it to be passed in fetch url
var inputReciRequest = function (event) {
  event.preventDefault ();
  var item = input.value;
  var newitem = item.toLowerCase ();
  var commastring = newitem.replace (/\s/g, ',');
  getUserRecipe (commastring);
};

//function that takes userinput parameter string of input request
var getUserRecipe = function (userInput) {
  var apiUrl =
    'https://edamam-recipe-search.p.rapidapi.com/search?q=' + userInput;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e60181779bmsh462e2f0d660fcb9p1dd608jsnba604de95f99',
      'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
    },
  };
  //fetch call declares the displayrecipe that takes data as parameter api response
  fetch (apiUrl, options)
    .then (function (response) {
      if (response.ok) {
        response.json ().then (function (data) {
          //objectdata(data);
          displayRecipes (data); //, userInput);
        });
      } else {
        alert ('error' + response.statusText);
      }
    })
    .catch (err => console.error (err));
};

// var objectdata = function(data){
//     var objectpropdata = data;
//     for(var i=0;i< objectpropdata.hits.length; i++){

//     }
// }
var objectpropdata;
var displayRecipes = function (data) {
   objectpropdata = data;

  for (var i = 0; i < objectpropdata.hits.length; i++) {
    //creates dynamic button adds a class adds p and img tag
    var storlabelimagebutton = document.createElement ('button');
//     storlabelimagebutton.addEventListener('click',function(){
//       buttonClicked(objectpropdata)
//  });
    
    storlabelimagebutton.classList.add ('stylefordivwithinlabel-recipe');
    storlabelimagebutton.style.width = '180px';
    storlabelimagebutton.style.height = '180px';

    var labelRecipe = document.createElement ('p');
    //adding data to variable
    var individuallabels = objectpropdata.hits[i].recipe.label;
    //adding variable with data to created p tag
    labelRecipe.textContent = individuallabels;

    //adding created p tag to button
    storlabelimagebutton.appendChild (labelRecipe);
    //creating img element
    var imageRecipe = document.createElement ('img');
    //data assigned to variable
    var imagerec = objectpropdata.hits[i].recipe.image;

    imageRecipe.src = imagerec;

    //styling to img
    imageRecipe.style.width = '100px';
    imageRecipe.style.height = '100px';

    storlabelimagebutton.appendChild (imageRecipe);
    console.log (storlabelimagebutton);

    recipelabel.appendChild(storlabelimagebutton);
    storlabelimagebutton.addEventListener('click',function(){
       buttonClicked(objectpropdata)
  });
// (function(objectpropdata){
//        // once button is selected the image and paragraph will call the buttonclicked function which will store more info
//     storlabelimagebutton.addEventListener("click", function(){
//           buttonClicked(objectpropdata)
//      })
//      })(objectpropdata)
 };
    savebtn (storlabelimagebutton);

   

    //objectdata(urlforrecipe,digestrecipe);
  
};

    function savebtn (createdBTN) {
  //save created  btn to an array
  var btnarray = [];
  btnarray = btnarray.push (createdBTN);
  loopoverbtn (btnarray);
}
//display info
function loopoverbtn (array) {
  for (i = 0; i < array.length; i++) {
    btndiv = document.createElement ('div');
    btndiv.innerHTML = array[i];
    document.getElement (recipelabel).appendChild (btndiv);
  }
}
// function clickeventonbutton (numberofbtn){

// }
// 

//when each individual button is selected the button , buttonclicked will activate for specific button
function data (url, digest) {
  var objecttostore = {
    urlarray: [],
    //digestarray for loop to get individual parts of the array
    digestarray: [],
  };

  objecttostore = objecttostore.urlarray.push (url);
  objecttostore = objecttostore.digestarray.push (digest);
}

function buttonClicked (data) {
  // const ingredientlines = objectpropdata.hits[i].recipe.ingredientLines;
  //    objecttostore.digestarray.push(digestrecipe);
  //    objecttostore.urlarray.push(urlforrecipe);
    var urlforrecipe = [];
    urlforrecipe = urlforrecipe.concat (
      JSON.stringify (objectpropdata.hits[i].recipe.url)
    );

    //stringifying data
    digestrecipe = JSON.stringify (objectpropdata.hits[i].recipe.digest);

  localStorage.setItem (
    'recipedigest',
    JSON.stringify (objecttostore.digestarray)
  );
  localStorage.setItem ('recipeURL', objecttostore.urlarray);

  // console.log(totalarray);

  const recipStr = localStorage.getItem ('recipeURL');
  const passedurlarrary = JSON.parse (recipStr);
  //const parsedRecipUrlArr = (recipStr);
  var divwithStoredUrl = document.createElement ('div');
  divwithStoredUrl.innerHTML = passedurlarrary;
  //parsedRecipUrlArr;
  dayofweekmondiv.appendChild (divwithStoredUrl);

  const recipstrdigest = localStorage.getItem ('recipedigest');
  const passeddigestarray = JSON.parse (recipstrdigest);
  var divwithStoredDigest = document.createElement ('div');
  divwithStoredDigest.innerHTML = passeddigestarray;
  dayofweekmondiv.appendChild (divwithStoredDigest);
}
function displaypicturesandlabel () {
  fetchbtn.addEventListener ('click', inputReciRequest);
}
document
  .getElementById ('weekday-container')
  .addEventListener ('click', displaypicturesandlabel);

