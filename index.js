// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {
    getDatabase,
    ref,
    child,
    get,
    push,
    set,
    onValue,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDoFOYGSOSQmUg82f7oNfvKLik6vZj0Ugw",
authDomain: "web-dev-workshops-demo.firebaseapp.com",
projectId: "web-dev-workshops-demo",
storageBucket: "web-dev-workshops-demo.firebasestorage.app",
messagingSenderId: "974147362642",
appId: "1:974147362642:web:e869af3b9250951524248b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

const messages = ref(database, "/messages");

let chatMessages = document.getElementById("messages");

onValue(

    messages,
    (snapshot) => {

        chatMessages.replaceChildren();

        snapshot.forEach((childSnapshot) =>{
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            // console.log(childKey);
            // console.log(childData.name);
            // console.log(childData.message);

            chatMessages.innerHTML += "<li><strong>"+ childData.name +": </strong>"+ childData.message + "</li>";

        })
    }
);

const messageBox = document.getElementById("add");

messageBox.addEventListener("click", function() 
{
    let userName = document.getElementById("name")
    let messageContent = document.getElementById("message");

    console.log(userName.value);

    let newMessage = push(messages);

    set(
        newMessage,
        {
            name: userName.value,
            message: messageContent.value,
            date: serverTimestamp()
        }
    );
});