import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7F58-J_88R__0h5lc8wgcDXc883RNexU",
    authDomain: "skillscyprus2024.firebaseapp.com",
    projectId: "skillscyprus2024",
    storageBucket: "skillscyprus2024.firebasestorage.app",
    messagingSenderId: "1047655702346",
    appId: "1:1047655702346:web:501688d76ccfddcd55abb3",
    measurementId: "G-YWB91BLVYS"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const docRef = doc(db, "Recipes", sessionStorage.getItem("uid"));
const snap = await getDoc(docRef);
createFavorites();


function createFavorites(){
    let recipes = snap.data().Recipes;
    console.log(recipes);

    recipes.forEach((recipe) => {
        createMealResult(recipe);
    })
    
}


function createMealResult(meal){
    
    let resultDiv = document.createElement("div");
    resultDiv.classList.add("favorite");

    let p_mealID = document.createElement("p");
    p_mealID.classList.add("mealID");
    p_mealID.innerHTML = meal.id;
    resultDiv.appendChild(p_mealID);

    let h1_mealTitle = document.createElement("h1");
    h1_mealTitle.classList.add("mealTitle");
    h1_mealTitle.innerHTML = meal.title;
    resultDiv.appendChild(h1_mealTitle);

    let p_mealArea = document.createElement("p");
    p_mealArea.classList.add("mealArea");
    p_mealArea.innerHTML = meal.area + " - ";
    resultDiv.appendChild(p_mealArea);

    let p_mealCategory = document.createElement("p");
    p_mealCategory.classList.add("mealCategory");
    p_mealCategory.innerHTML = meal.category;
    resultDiv.appendChild(p_mealCategory);

    let d_imgIngr = document.createElement("div");
    d_imgIngr.classList.add("imageIngredientsDiv");

    let img = document.createElement("img");
    img.src = meal.image;
    img.alt = meal.title;
    img.classList.add("mealPicture");
    d_imgIngr.appendChild(img);

    let d = document.createElement("div");

    let h1_ingredients = document.createElement("h1");
    h1_ingredients.innerHTML = "Ingredients:";
    d.appendChild(h1_ingredients);

    let ingredients = meal.Ingredients;
    ingredients.forEach((ingredient) =>{
       
        let p_ingr = document.createElement("p");
        p_ingr.classList.add("mealIngredient");
        p_ingr.innerHTML = ingredient.name + " - ";
        
        let p_meas = document.createElement("p");
        p_meas.classList.add("mealMeasurement");
        p_meas.innerHTML = ingredient.quantity;

        d.appendChild(p_ingr);
        d.appendChild(p_meas);
        d.appendChild(document.createElement("br"));
    })
    d_imgIngr.appendChild(d);
    resultDiv.appendChild(d_imgIngr);

    let p_instr = document.createElement("p");
    p_instr.classList.add("mealInstructions");
    p_instr.innerHTML = meal.description;
    resultDiv.appendChild(p_instr);

    let button = document.createElement("button");
    button.innerHTML = "REMOVE FROM FAVORITES";
    button.classList.add("mealAddToFavorites");
    resultDiv.appendChild(button);

    document.getElementById("favoriteRecipes").appendChild(resultDiv);
}