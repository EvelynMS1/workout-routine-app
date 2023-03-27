// global variables
const apiKey = "ede6fe74f5msh39ffaeffc65acb7p10765djsna172c41ba859";
const apiUrl = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/";
const workoutContainer = document.getElementById("workout-container");

// Handle form submit
document
  .getElementById("workout-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get selected muscle groups
    const muscleGroupCheckboxes = document.getElementsByName("muscle-group");
    const muscleGroups = [];
    console.log(muscleGroups);

    for (let i = 0; i < muscleGroupCheckboxes.length; i++) {
      if (muscleGroupCheckboxes[i].checked) {
        muscleGroups.push(muscleGroupCheckboxes[i].value);
        console.log(muscleGroups);
      }
    }

    // Make API request
    fetch(apiUrl + muscleGroups, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    })
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        console.log(data);
        workoutContainer.innerHTML = "";

        // randomly loop through the array of exercises and display 10 exercises
        for (let i = 0; i < data.length; i++) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomElement = data[randomIndex];
          data[randomIndex] = data[i];
          data[i] = randomElement;

          const exercise = data[i];
          const exerciseEl = document.createElement("div");
          // add styling class from BULMA to the exerciseEl. Look for cards in the BULMA documentation
          exerciseEl.classList.add("exercise-card");

          // limit the number of exercises to 8
          if (i > 7) {
            return;
          }

          // include the name, target, equipment and button that will display a gifURL as hiddan of the exercise
          // can include BULMA styling to the save button by adding class. Look for buttons in the BULMA documentation. use button-is-primary
          exerciseEl.innerHTML = `
            <h2>${exercise.name}</h2>
            <p>target muscle: ${exercise.target}</p>
            <p>equipment: ${exercise.equipment}</p>
            <div class="gif-container">
              <button class="button is-primary" id="save-btn">Save</button>
              <img src="${exercise.gifUrl}" alt="${exercise.name}" />
              <style>
              .gif-container {
                display: none;
              }
              </style>
            </div>
            `;


          // event listener that displays gif-container to diplay block when the h2 element is clicked and to
          exerciseEl.querySelector("h2").addEventListener("click", function () {
            exerciseEl.querySelector(".gif-container").style.display = "block";
          });

          // event listener that sets gif container to display none when the image is clicked
          exerciseEl
            .querySelector("img")
            .addEventListener("click", function () {
              exerciseEl.querySelector(".gif-container").style.display = "none";
            });

          // function that saves the exercise to local storage when the save-btn is clicked and pushes the exercise to the savedExercises array
          exerciseEl
            .querySelector("#save-btn")
            .addEventListener("click", function () {
              const savedExercises =
                JSON.parse(localStorage.getItem("savedExercises")) || [];
              savedExercises.push(exercise);
              localStorage.setItem(
                "savedExercises",
                JSON.stringify(savedExercises)
              );
              console.log(savedExercises);
            });

          workoutContainer.appendChild(exerciseEl);
        }
      });
  });

// variable to select the favorites-btn
const favoritesBtn = document.querySelector(".favorites-btn");

// variable for the saved-exercises-container
const savedContainer = document.querySelector(".favorites");

// variable for the hide-Favorites-Btn
const hideFavoritesBtn = document.querySelector(".hide-favorites-btn");

// create event listener for the favorites-btn that will display the saved exercises when clicked on
favoritesBtn.addEventListener("click", function () {
  const savedExercises =
    JSON.parse(localStorage.getItem("savedExercises")) || [];
  if (savedExercises.length === 0) {
    return;
  }
  favoritesBtn.style.display = "none";
  hideFavoritesBtn.style.display = "block";
  savedExercises.forEach(function (exercise) {
    const exerciseEl = document.createElement("div");
    // add class styling from BULMA to the exerciseEl. Look for cards in the BULMA documentation
    exerciseEl.classList.add("exercise-card");
    exerciseEl.innerHTML = `
      <h3>${exercise.name}</h3>
      <p>target muscle: ${exercise.target}</p>
      <p>equipment: ${exercise.equipment}</p>
      <div class="favorites-gif-container">
        <img src="${exercise.gifUrl}" alt="${exercise.name}" />
        <style>
        .favorites-gif-container {
          display: none;
        }
        </style>
      </div>
      `;
    savedContainer.appendChild(exerciseEl);

    // event listener that will display the favorites gif-container when the h3 element is clicked on
    exerciseEl.querySelector("h3").addEventListener("click", function () {
      exerciseEl.querySelector(".favorites-gif-container").style.display =
        "block";
    });

    // event listener that will hide the favorites gif-container when the image is clicked on
    exerciseEl.querySelector("img").addEventListener("click", function () {
      exerciseEl.querySelector(".favorites-gif-container").style.display =
        "none";
    });
  });
});

// event listener to the favorites-btn that will display the saved-exercises-container when clicked on but not create duplicate elements
favoritesBtn.addEventListener("click", function () {
  savedContainer.style.display = "block";
});

// event listener for the hide-favorites-btn that will hide the saved-exercises-container and display the favorites-btn when clicked on
hideFavoritesBtn.addEventListener("click", function () {
  hideFavoritesBtn.style.display = "none";
  savedContainer.style.display = "none";
  favoritesBtn.style.display = "block";
  savedContainer.innerHTML = "";
});

// add event listener to the clr-btn that will clear local storage and the exerciseEl elements from the saved-exercises-container
const clrBtn = document.querySelector(".clr-btn");
clrBtn.addEventListener("click", function () {
  localStorage.clear();
  savedContainer.innerHTML = "";
  favoritesBtn.style.display = "block";
  hideFavoritesBtn.style.display = "none";
});