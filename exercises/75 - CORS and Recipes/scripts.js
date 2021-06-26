// CORS

// cross origin resource sharing

// CORS policy is defined on the server
// ok, this site is allowed, we wil return it, etc.

// when you see error:
// access to fetch from oirigin has been blocked..
// you need to access from a server
// you may need to use a PROXY server so it passes CORS policy

const baseEndpoint = 'http://www.themealdb.com/api/json/v1/1/search.php';
const proxy = `https://cors-anywhere.herokuapp.com/`;
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');

async function fetchRecipes(query) {
  const res = await fetch(`${proxy}${baseEndpoint}?s=${query}`);
  const data = await res.json();
  return data;
}

async function handleSubmit(event) {
  event.preventDefault();
  const el = event.currentTarget;
  console.log(form.query.value);
  fetchAndDisplay(form.query.value);
}

async function fetchAndDisplay(query) {
  // turn the form off
  form.submit.disabled = true;
  // submit the search
  const recipes = await fetchRecipes(query);
  form.submit.disabled = false;
  console.log(recipes);
  displayRecipes(recipes.meals);
}

function displayRecipes(recipes) {
  console.log('creating html');
  const html = recipes.map(
    (recipe) => `<div class="recipe">
        <h2>${recipe.strMeal}</h2>
        <p>Cuisine: ${recipe.strArea}</p>
        ${
          recipe.strMealThumb &&
          `<img src="${recipe.strMealThumb}" alt="${recipe.strMeal}"/>`
        }

        ${
          recipe.strSource && `<a href=" ${recipe.strSource}">View Recipe →</a>`
        }
      </div>`
  );

  recipesGrid.innerHTML = html.join('');
}

form.addEventListener('submit', handleSubmit);
// on page load, run it with pizza
fetchAndDisplay('pizza');
