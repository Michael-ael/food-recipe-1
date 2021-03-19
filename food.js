const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('real');
const mealDetailsContent = document.querySelector('.real-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const checkbox = document.getElementById('checkbox');



// toggle dark
checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});

searchBtn.addEventListener('click', () => {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then((res) => res.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html +=`
                <div class="real-item" data-id = "${meal.idMeal}">
                    <div class="real-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>

                    <div class="real-name">
                    <h3>${meal.strMeal}</h3> 
                    <a href="#" class="recipe-btn"> Get recipie </a>
                    </div>
                </div>
            `
            });
          mealList.classList.remove('notFound')  
        }else{
            html = "<h3>sorry, we didn't find what you looking for!!!</h3>"
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
})


mealList.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then((res) => res.json())
        .then((data) => mealRecipeModal(data.meals));
    }
})


recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// modal
function mealRecipeModal(meal){
    meal = meal[0];
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
            <h3> Instructions:</h3>
            <p>
                ${meal.strInstructions}
            </p>
    </div>

    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>

    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank"> Watch Videos </a>
    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}