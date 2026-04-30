window.onload = () => {
// CONFIG
//TODO: FOR THE NEVADA GAME, TRY TO USE SPOTIFY INTEGRATION, FOR THE ONLINE TELEPHONE IF THE GUESSER GUESSES WRONG, PLAY NAH YOURE WRONG THEN REVEAL IT TO EVERYONE.
//wHAT THE GUESSER GUESSED THEN UNDERNEATH, WHAT THE ACTUAL WORD WAS, THE GUESSER GETS ONLY THE LAST HINT CUS WHY NOT, GIVING THEM ALL THE HINTS WOULD MAKE IT TOO EASY
//CURRENT LOGIC, MAKE AN ARRRAY CALLED PLAYERKEYS WHICH FETHEC THE PLAYER KEYS WHEN THE ROOM STATUS IS PLAYING, PICK WHICH PLAYER IS DESRIBER 1 THEN DESCRIBER 2 THEN DESRIBER 3 THEN GUESSER
//I STILL NEED TO DECIDE IF I MAKE THE GAME A FIXED LENGTH OR IF I TRY TO MAKE IT INCLUSIVE, MAKING IT INCLUSIVE WOULD BE HARDER SO WHY NOT
//YEAH, SO FAR SO GOOD, I HOPE, STILL NEED TO WORK ON THE FORBIDDEN WORD LIST, YEAH IL ALERT THE DESRIBER IF THEIR THING HAS A FORBIDDEN WORD, PRETTY MUCH PARSE THEIR DESCRIPTION AS SEOARATE WORDS IN AN ARRAYM IF IT CONTAINS ANY OF THE FORBIDDEN WORDS,(MEHN JUST TRANSFORM THE WORDS TO ALLCAPS TO MAKE IT EASY AND DELETE WHITESPACE), IF IT DOESN, ALERT THEN RETURN,. SIMPLE IN THEORY
const firebaseConfig = {
  apiKey: "AIzaSyA9SwtBw1A0t49YYqajQIPGK8Kx9ts7oTE",
  authDomain: "online-telephone-7848.firebaseapp.com",
  databaseURL: "https://online-telephone-7848-default-rtdb.firebaseio.com",
  projectId: "online-telephone-7848",
  storageBucket: "online-telephone-7848.firebasestorage.app",
  messagingSenderId: "881904369324",
  appId: "1:881904369324:web:7b08e84f42c4226671a909"
};
let playerKeys=[];
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

//WORD LIST AT THE TOP
const words = [
{ word: "IPHONE",
    forbidden: ["APPLE", "PHONE", "SCREEN", "STEVE JOBS", "APP"]

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},


{
word:
forbidden: []

},


{
word:
forbidden: []

},


{
word:
forbidden: []

},


{
word:
forbidden: []

},


{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},

{
word:
forbidden: []

},



];

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

//list current players
database.ref(`rooms/${room}/players`).on('value', (snapshot) => {

players.innerHTML = "";

if (snapshot.exists()) {
const currentlist = snapshot.val();
playerKeys = Object.keys(currentlist);
console.log(playerKeys);
Object.keys(currentlist).forEach((key) => {

const playerlist = currentlist[key];

const li = document.createElement("li");
li.innerText = playerlist.name;
li.classList.add("players");
players.appendChild(li);
console.log(players);
//START GAME
const playerArray = Object.values(currentlist);
console.log(playerArray);
const Ready = playerArray.every(p => p.ready === true);
if (Ready && playerArray.length >= 3) {
    startGame();
} else {
    // alert("Please wait for another player to join the game!");
    ready.innerText = "Waiting for all game conditions to be met";
};

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