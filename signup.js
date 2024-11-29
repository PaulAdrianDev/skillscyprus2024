    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
document.getElementById("signUpButton").addEventListener("click", function() { signUpUser() });
function signUpUser(){
    let email = document.getElementById("signUpEmail").value;
    let password = document.getElementById("signUpPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user.accessToken);
        sessionStorage.setItem("uid", user.uid);

        // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    });
}