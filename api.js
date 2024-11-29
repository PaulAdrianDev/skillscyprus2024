// default to Name
let endpoint = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
createSearchOptions();

let uid = sessionStorage.getItem("uid");
console.log(uid);
// add placeholders to option objects
function createSearchOptions(){
    let options = [
        {
            title: "Name",
            url:"https://www.themealdb.com/api/json/v1/1/search.php?s=" // + name of dish
        },
        {
            title: "First Letter of Dish",
            url:"https://www.themealdb.com/api/json/v1/1/search.php?f=" // + first letter
        },
        {
            title: "Dish ID",
            url:"https://www.themealdb.com/api/json/v1/1/lookup.php?i=" // + Dish ID
        },
        {
            title: "Get a Random Meal",
            url:"https://www.themealdb.com/api/json/v1/1/random.php",
            special: true,
            immediate: true
        },
        {
            title: "Get 10 Random Meals",
            url:"https://www.themealdb.com/api/json/v1/1/randomselection.php",
            unavailable: true,
            immediate: true
        },
        {
            title: "Category",
            url:"https://www.themealdb.com/api/json/v1/1/filter.php?c=" // + category title
        },
        {
            title: "Area",
            url:"https://www.themealdb.com/api/json/v1/1/filter.php?a=" // + Area
        },
        {
            title: "Main Ingredient",
            url:"https://www.themealdb.com/api/json/v1/1/filter.php?i=" // + Ingredient Name
        },
        {
            title: "Get Latest Meals",
            url:"https://www.themealdb.com/api/json/v1/1/latest.php",
            unavailable: true,
            immediate: true
        },
        
    ]

    let div = document.getElementById("mealSearchOptions");

    options.forEach((option) => {
        let b = document.createElement("button");
        b.classList.add("mealSearchOption");
        if(option.special)
            b.classList.add("specialMealSearchOption");
        if(option.unavailable)
            b.classList.add("unavailableMealSearchOption");

        b.innerHTML = option.title;
        b.addEventListener("click", function(){ setEndpoint(option) });

        div.appendChild(b);
    })

    let p = document.createElement("p");
    p.innerHTML = "Gray buttons are for PREMIUM Toast members only";
    div.appendChild(p);
}

function setEndpoint(option){
    endpoint = option.url; // set endpoint
    
    //empty input text
    let input = document.getElementById("mealSearchDiv_Input");
    input.value = "";

    if(option.immediate){  // if option is immediate it should api call without changing title or taking in input
        clearResultsAndAPICall(false);
    }
    else // if its not immediate it should change the search title
        document.getElementById("mealSearchDiv_Title").innerHTML = option.title + ":";

    if(option.title == "First Letter of Dish")
        input.setAttribute("maxlength", 1);
    else
        input.setAttribute("maxlength", 524288); //default value of maxlength
    
}
function clearResultsAndAPICall(hasInput){
    clearResults();
    apiCall(hasInput);
}

function clearResults(){
    let mealSearchResults = document.getElementById("mealSearchResults");

    while(mealSearchResults.firstChild)
        mealSearchResults.removeChild(mealSearchResults.lastChild)
}
async function apiCall(hasInput){
    if(hasInput != true && hasInput != false) // only accept true and false
        return;

    let url = endpoint;
    if(hasInput == true){
        let v =  document.getElementById("mealSearchDiv_Input").value;
        if(v == "")
            return;
        url = endpoint + v;
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.response);
            let mealSearchResults = document.getElementById("mealSearchResults");


            document.getElementById("mealSearchErrorText").style.display = "none";

            const meals = this.response.meals;
            try{
                meals.forEach((meal) => {
                    if(meal.strArea)
                        createMealResult(meal);
                    else{
                        endpoint = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal.idMeal;
                        apiCall(false);
                    }
                });
    
                mealSearchResults.scrollIntoView();
            }
            catch{
                alert("An error has occurred.");
            }
            
        }
        else if(this.readyState == 4 && this.status != 200)
            document.getElementById("mealSearchErrorText").style.display = "block";
    };
    xhttp.open("GET", url, true);
    xhttp.responseType = 'json';
    xhttp.send();
}

function createMealResult(meal){
    
    let resultDiv = document.createElement("div");
    resultDiv.classList.add("mealSearchResult");

    let p_mealID = document.createElement("p");
    p_mealID.classList.add("mealID");
    p_mealID.innerHTML = meal.idMeal;
    resultDiv.appendChild(p_mealID);

    let h1_mealTitle = document.createElement("h1");
    h1_mealTitle.classList.add("mealTitle");
    h1_mealTitle.innerHTML = meal.strMeal;
    resultDiv.appendChild(h1_mealTitle);

    let p_mealArea = document.createElement("p");
    p_mealArea.classList.add("mealArea");
    p_mealArea.innerHTML = meal.strArea + " - ";
    resultDiv.appendChild(p_mealArea);

    let p_mealCategory = document.createElement("p");
    p_mealCategory.classList.add("mealCategory");
    p_mealCategory.innerHTML = meal.strCategory;
    resultDiv.appendChild(p_mealCategory);

    let d_imgIngr = document.createElement("div");
    d_imgIngr.classList.add("imageIngredientsDiv");

    let img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    img.classList.add("mealPicture");
    d_imgIngr.appendChild(img);

    let d = document.createElement("div");

    let h1_ingredients = document.createElement("h1");
    h1_ingredients.innerHTML = "Ingredients:";
    d.appendChild(h1_ingredients);

    for(let i = 1; i <= 20; i++){ // create ingredients and measurements
        if(!meal[`strIngredient${i}`])
            break;

        let p_ingr = document.createElement("p");
        p_ingr.classList.add("mealIngredient");
        p_ingr.innerHTML = meal[`strIngredient${i}`] + " - ";
        
        let p_meas = document.createElement("p");
        p_meas.classList.add("mealMeasurement");
        p_meas.innerHTML = meal[`strMeasure${i}`];

        d.appendChild(p_ingr);
        d.appendChild(p_meas);
        d.appendChild(document.createElement("br"));
    }
    d_imgIngr.appendChild(d);
    resultDiv.appendChild(d_imgIngr);

    let p_instr = document.createElement("p");
    p_instr.classList.add("mealInstructions");
    p_instr.innerHTML = meal.strInstructions;
    resultDiv.appendChild(p_instr);

    let button = document.createElement("button");
    button.innerHTML = "ADD TO FAVORITES";
    button.classList.add("mealAddToFavorites");
    button.addEventListener("click", function(){ addToFavorites(meal) });
    resultDiv.appendChild(button);

    document.getElementById("mealSearchResults").appendChild(resultDiv);
}

function addToFavorites(meal){
    console.log(meal);
    
};

