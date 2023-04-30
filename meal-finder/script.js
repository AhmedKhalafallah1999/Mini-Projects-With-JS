const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");
// Search meal and Fetched from API
async function searchMeals(event) {
  event.preventDefault();
  mealsEl.style.display = "grid";
  resultHeading.style.display = "grid";

  // clear te singl meal
  single_mealEl.innerHTML = "";
  // get the value from the input field
  const term = search.value;
  try {
    if (term.trim()) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
      );
      const data = await response.json();
      console.log(data);
      if (data.meals === null) {
        resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        return;
      }
      if (!response.ok) {
        throw new Error("Some Thing Went Wrong");
      }
      resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
      data.meals.forEach((element) => {
        const singleElement = document.createElement("div");
        singleElement.className = "meal";
        singleElement.innerHTML = `<img src="${element.strMealThumb}" alt="${element.strMeal}"></img>
    `;
        const mealInfo = document.createElement("div");
        mealInfo.className = "meal-info";
        mealInfo.setAttribute("data-mealId", element.idMeal);
        mealInfo.innerHTML = `<h3>${element.strMeal}</h3>`;
        singleElement.append(mealInfo);
        mealsEl.append(singleElement);
        search.value = "";
      });
    } else {
      alert("PLease enter a keyword to search");
    }
  } catch (err) {
    resultHeading.innerHTML = `<h2>${err}</h2>`;
  }
}
// Get Element By Id
async function getMealById(id) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Some thing Went Wrong");
    }
    addMealToDom(data.meals[0]);
  } catch (err) {
    resultHeading.innerHTML = `<h2>${err}</h2>`;
  }
}
// addMealToDom
function addMealToDom(meal) {
  console.log(meal);
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.className = "single-meal";
  single_mealEl.innerHTML = `
  <div>
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"></img>
  <div class="single-meal-info">
  <p>${meal.strCategory}</p>
  <p>${meal.strArea}</p>
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h1>Ingredients<h1>
  <ul>
    ${ingredients.map((item) => `<li>${item}</li>`).join("")}
  </ul>
  </div>
  </div>
  `;
}
// randomMeal
async function randomMeal() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const data = await response.json();
  console.log(data);
  addMealToDom(data.meals[0]);
}
// Event Listeneres
submit.addEventListener("submit", searchMeals);
mealsEl.addEventListener("click", (e) => {
  let path = e.composedPath ? e.composedPath() : e.path;
  const mealInfo = path.find((item) => {
    if (item.className === "meal-info") {
      mealsEl.style.display = "none";
      resultHeading.style.display = "none";
      getMealById(item.getAttribute("data-mealId"));
    }
  });
});
random.addEventListener("click", randomMeal);
