window.onload = () => {
// CONFIG
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

// console.log the room iddddd 
console.log("Firebase sucessfully redirected!");

const roomurl = window.location.search;
console.log(roomurl);

const urlparam = new URLSearchParams(roomurl);

const room = urlparam.get('room');
console.log("Your room ID is", room);


// ONLY UNCOMMENT TO NUKE THE DB
// database.ref('rooms').remove();

// PLAYER LIST
document.getElementById("id").innerText = room;

const players = document.getElementById("players");

database.ref(`rooms/${room}/players`).on('value', (snapshot) => {

players.innerHTML = "";

if (snapshot.exists()) {
const currentlist = snapshot.val();

Object.keys(currentlist).forEach((key) => {

const playerlist = currentlist[key];

const li = document.createElement("li");
li.innerText = playerlist.name;
li.classList.add("players");
players.appendChild(li);
console.log(players);
})

}
})



// What the I'm ready button does.

const ready = document.getElementById("ready");

document.getElementById("ready").onclick = dude;
function dude() {
alert("That Button doesn't do anything");

}


const myKey = sessionStorage.getItem("playerKey");
console.log(myKey);
ready.onclick = () => {

if (!myKey) {
alert("Yeah, Idk who you are! Join the room correctly")
return;
}
database.ref(`rooms/${room}/players/${myKey}`).update({
    ready: true
});

ready.disabled = true;
ready.innerText = "Waiting for others...";
ready.classList.add("disabled");

}


























}