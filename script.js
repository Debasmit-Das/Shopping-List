
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL :"https://my-first-project-d57b7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database,"shoppingList")

const inputFieldEl = document.querySelector(".inputField");
const addButtonEl = document.querySelector(".button");


addButtonEl.addEventListener("click",function(){
    let inputVal = inputFieldEl.value;
    push(shoppingListInDb,inputVal);
    inputFieldEl.value=""
})

window.addEventListener('keydown',function(e){
    if(e.key == 'Enter'){
    let inputVal = inputFieldEl.value;
    push(shoppingListInDb,inputVal);
    inputFieldEl.value=""
    }
})

onValue(shoppingListInDb,function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        document.getElementById("ul1").innerHTML ="";
        for(let i=0;i<itemsArray.length;i++){
           appendItemToShoppingListEl(itemsArray[i]);
        }

    } else{
        document.querySelector("ul").innerHTML ="<li>List is empty</li>";
    }
})

function appendItemToShoppingListEl(item){
    let newEl = document.createElement("li");
    newEl.textContent=item[1];
    newEl.addEventListener('click',function(){
        remove(ref(database,"shoppingList/"+item[0]));
    })
    document.getElementById("ul1").append(newEl);
}




