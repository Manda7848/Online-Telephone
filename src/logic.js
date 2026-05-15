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


//TIPS


const tips = [
        "Describe words using shared memories for more fun!",
        "Avoid the forbidden words or you'll get a 'Nah you're wrong'!",
        "Tic-Tac-Toe is just for the waiting time. Focus up!",
        "The guesser only sees the very last hint. Be descriptive!",
        "You can add comments to your descriptions in brackets like: (You can never guess this)",
        "Don't reload the game while playing if not, you'll regret it",
        "If your game suddenly reloads, don't fret. Just make a new game room",
        "Check the console for fun easter eggs!"
    ];


 console.log(tips);
    function randomtip() {
        document.getElementById("random-tip").innerText = tips[Math.floor(Math.random() * tips.length)];

    }
    setInterval(randomtip, 5000);


//WORDSSS


const words = [
        {
            word: "IPHONE",
            forbidden: ["APPLE", "PHONE", "SCREEN", "STEVE JOBS", "APP", "YOU", "ANDROID", "IOS"]

        },

        {
            word: "PIZZA",
            forbidden: ["CHEESE", "ITALY", "DOUGH", "DELIVERY", "PEPPERONI", "SLICE", "PARTY", "MARINARA", "PINEAPPLE"]

        },

        {
            word: "SPIDERMAN",
            forbidden: ["MARVEL", "WEB", "PETER PARKER", "TOM HOLLAND", "ANDREW GARFIELD", "TOBEY MAGUIRE", "HERO", "AVENGERS", "TONY STARK", "AUNT MAY", "UNCLE BEN", "SPIDER", "MAN"]

        },


        {
            word: "BLACK PANTHER",
            forbidden: ["BLACK", "PANTHER", "SHURI", "T'CHALA", "PRINCE", "CLAW", "KILLMONGER", "WAKANDA", "AFRICA", "VIBRANIUM"]

        },


        {
            word: "TOP GUN",
            forbidden: ["PLANES", "ETHAN HUNT", "ROOSTER", "GOOSE", "ROOSTER", "PLANES", "WAR", "DOGFIGHTING", "BUNKER", "MAVERICK"]
            //They'll never be able to guess this one correctly
        },


        {
            word: "MINECRAFT",
            forbidden: ["STEVE", "CHICKEN JOCKEY", "CREEPER", "ZOMBIE", "SKELETON", "RUEBEN", "BLOCKS", "BUILDING", "MINING", "NETHER", "MOBS", "FLYING", "CREATIVE MODE"]
            //Rip Rueben, Minecraft story mode made me cry
        },


        {
            word: "SPOTIFY",
            forbidden: ["WRAPPED", "MUSIC", "DJ", "BEST", "PLAYLIST", "ARTIST", "STREAMING", "GREEN"]
            //Terrible we player that is making me code in silence
        },


        {
            word: "HATSUNE MIKU",
            forbidden: ["JAPANESE", "ANIME", "BLUE", "TEAL", "WIFI", "TETO", "NERU", "SINGER", "MIKU", "39"]
            //WEIRD TO BAN FROM SAYING MIKU WELL NOT WEIRD, THAT WOULD MAKE IT TOO EASY
            //Why is the word weird spelt so weirdly
        },

        {
            word: "NETFLIX",
            forbidden: ["SUBSCRIPTION", "HULU", "DISNEY", "HBO", "HBO MAX", "RED", "N", "MOVIE", "SERIES", "STREAM", "STREAMING", "WATCH", "LOVE ISLAND"]

        },

        {
            word: "ASTRONAUT",
            forbidden: ["SPACEX", "ELON MUSK", "ARTEMIS", "NASA", "RUSSIA", "ISS", "ROCKET", "SUIT", "MOON", "BLIUE", "MEATBALL"]
            //I still can't get over the fact that Nasa refers to the logos as "the meatball logo" and there's the "red worm logo"
            // a chevron is a shape, wow
            //10 words should be enough right, people wont play it that much, cus if I did more I would have to get up to 15 for the sake of my sanity(OCD mama wouldn't even remember how many words she did by morning but ok)
        }

    ];





//DEFINE STUFF
    // let playerKeys = [];
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

const word = words[Math.floor(Math.random() * words.length)];
const myKey = sessionStorage.getItem("playerKey");
console.log(myKey);
ready.onclick = () => {
console.log("It's guessing time");
alert("still working on it");
document.getElementById("ready").style.display = "none";

    
  
database.ref(`rooms/${room}/players/${myKey}`).update({ ready: true});




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

        //RENDER THE PLAYER LIST(THE EASIEST PART)
        Object.keys(currentlist).forEach((key) => {

            const playerlist = currentlist[key];

            const li = document.createElement("li");
            li.innerText = playerlist.name;
            li.classList.add("players");
            players.appendChild(li);
            console.log(players);
            //END OF THE PLAYER LIST RENDERING
        });



//STARTGAME
const allReady = playerKeys.every(key => currentlist[key].ready === true);
// const status = database.ref(`rooms/${room}/status`);
if (totalPlayers >= 2 && allReady && data.status === "waiting") {
    console.log("All players are locked in! Starting the game...");
    startGame();
    console.log("stargame just ran")
}




function startGame() {


    //   document.getElementById("mustguess").innerText = word.word;
alert("The game has begun, if anyone wishes to join, you have to make a new room!");
document.getElementById("roles").style.display = "block";
document.getElementById("lobby-ui").style.display = "none";

setTimeout(() => {
document.getElementById("roles").style.display = "none";


}, 5000);

const myIndex = playerKeys.indexOf(myKey);
if (myIndex === 0) {


document.getElementById("mustguess").innerText = word.word;

database.ref(`rooms/${room}`).update({ status: "playing", currentWord: word});
        database.ref(`rooms/${room}`).update({ 

            currentWord: word 
        });
    }




}





//END OF THE ON.VALUE LISTENER
    });
    






























































































































































































































//DO NOT TOUCH THIS BRACE, THIS IS WHAT KEEPS IT FROM CRASHING(FOR NOW!)
}