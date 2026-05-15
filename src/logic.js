window.onload = () => {

console.log("VISUAL STUDIO STOP THROWING ERRORS WHILE I TYPE MY CODE!");

//INITIALIZE FIREBASE!


 const firebaseConfig = {
        apiKey: "AIzaSyA9SwtBw1A0t49YYqajQIPGK8Kx9ts7oTE",
        authDomain: "online-telephone-7848.firebaseapp.com",
        databaseURL: "https://online-telephone-7848-default-rtdb.firebaseio.com",
        projectId: "online-telephone-7848",
        storageBucket: "online-telephone-7848.firebasestorage.app",
        messagingSenderId: "881904369324",
        appId: "1:881904369324:web:7b08e84f42c4226671a909"
    };

//CHECK IF IT EVEN WORKED

 console.log("Firebase sucessfully redirected!");

    const roomurl = window.location.search;
    console.log(roomurl);

    const urlparam = new URLSearchParams(roomurl);

    const room = urlparam.get('room');
    console.log("Your room ID is", room);

document.getElementById("id").innerText = room;



//DEFINE STUFF
    // let playerKeys = [];
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();


const myKey = sessionStorage.getItem("playerKey");
console.log(myKey);
ready.onclick = () => {
console.log("It's guessing time");
alert("still working on it")
if (!myKey) {
alert("Yeah, Idk who you are! Join the room correctly");
return;
}
}



//MAIN FIREBASE LISTENER

    const players = document.getElementById("players");

   
    database.ref(`rooms/${room}`).on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) return;
        players.innerHTML = "";


        //DEFINE STUFF
const currentlist = data.players || {};
                const playerKeys = Object.keys(currentlist);
                const myIndex = playerKeys.indexOf(myKey);
                const totalPlayers = playerKeys.length;
                const isMyTurn = (data.activeDescriberIndex === myIndex);
                const isGuesser = (myIndex === totalPlayers - 1);

console.log(myIndex);

        
        Object.keys(currentlist).forEach((key) => {

            const playerlist = currentlist[key];

            const li = document.createElement("li");
            li.innerText = playerlist.name;
            li.classList.add("players");
            players.appendChild(li);
            console.log(players);
        });

    });
    






























































































































































































































//DO NOT TOUCH THIS BRACE, THIS IS WHAT KEEPS IT FROM CRASHING(FOR NOW!)
}