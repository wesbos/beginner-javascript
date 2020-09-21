const baseEndpoint = "http://www.recipepuppy.com/api";
const proxy = `https://cors-anywhere.herokuapp.com/`;

const form = document.querySelector("form.search");
const recipesGrid = document.querySelector(".recipes");

async function fetchRecipes(query) {
  const response = await fetch(`${proxy}${baseEndpoint}?q=${query}`);
  const data = await response.json();
  console.log(data);
  return data;
}

function displayRecipes(recipes) {
  console.log("Creating HTML");
  const html = recipes.map((recipe) => {
    return `<div class='recipe'>
        <h2>${recipe.title}</h2>
        <p>${recipe.ingredients}</p>
        ${recipe.thumbnail &&
          `<img src="${recipe.thumbnail}" alt="${recipe.title}" />`}
            <a href="${recipe.href}">View Recipe</a>
            </div>`;
  });
  recipesGrid.innerHTML = html.join("");
}

async function fetchAndDisplay(query) {
  form.submit.disabled = true;
  const recipes = await fetchRecipes(query);
  console.log(recipes);
  form.submit.disabled = false;
  console.log(recipes.results);
  displayRecipes(recipes.results);
}

async function handleSubmit(e) {
  e.preventDefault();
  const element = e.currentTarget;
  fetchAndDisplay(form.query.value);
}

form.addEventListener("submit", handleSubmit);

fetchAndDisplay("pizza");
