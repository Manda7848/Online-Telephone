

window.onload = () => {

// document.getElementById("join").onclick = () => {
// const player = document.getElementById("name").value.trim();
// const room = document.getElementById("room").value.trim();
// console.log(player,room);
// }
const firebaseConfig = {
  apiKey: "AIzaSyA9SwtBw1A0t49YYqajQIPGK8Kx9ts7oTE",
  authDomain: "online-telephone-7848.firebaseapp.com",
  databaseURL: "https://online-telephone-7848-default-rtdb.firebaseio.com",
  projectId: "online-telephone-7848",
  storageBucket: "online-telephone-7848.firebasestorage.app",
  messagingSenderId: "881904369324",
  appId: "1:881904369324:web:7b08e84f42c4226671a909"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();




let id = 0
 const create = document.getElementById("create");

create.onclick = console.log("Join was clicked");
create.onclick = generateid;


function generateid() {
id = Math.floor(Math.random() * 500) + 1000;
console.log("Your room id is =", id);
// document.getElementById("id1").innerText = id;
document.getElementById("id2").innerText = id;
}


// document.getElementById("room").addEventListener('input', function() {
// document.getElementById("id1").innerText = document.getElementById("room").value


// } )



document.getElementById("room").addEventListener('input', changeid);

function changeid(){
document.getElementById("id1").innerText = document.getElementById("room").value
}

// I'm scared, my wakatime time keeps increasing even though i dont type anything


// setInterval (function () { document.getElementById("id1").innerText = document.getElementById("room").value; console.log("interval is working"); }, 1000);


}

