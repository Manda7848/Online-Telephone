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




const myKey = sessionStorage.getItem("playerKey");
console.log(myKey);
ready.onclick = () => {
console.log("It's guessing time");
alert("The game will start when all players are ready");
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
if (totalPlayers >= 3 && allReady && data.status === "waiting") {
    console.log("All players are locked in! Starting the game...");
    startGame();
    console.log("startgame just ran")
}

 const hint = document.getElementById("mustguess");


function startGame() {


    
    alert("The game has begun, if anyone wishes to join, you have to make a new room!");
    
   
    document.getElementById("roles").style.display = "block";
    document.getElementById("lobby-ui").style.display = "none";

    setTimeout(() => {
        document.getElementById("roles").style.display = "none";
        
    }, 5000);

    const myIndex = playerKeys.indexOf(myKey);
    if (myIndex === 0) {

const word = words[Math.floor(Math.random() * words.length)];
document.getElementById("mustguess").innerText = word.word;


        // Notice we set latestHint to the raw word so Player 1 knows what to describe
        database.ref(`rooms/${room}`).update({ 
            status: "playing", 
            currentWord: word, 
            latestHint: word.word, 
            activeDescriberIndex: 0 
        });
    

    }




if (data.status === "playing") {

    document.getElementById("lobby-ui").style.display = "none";

    // 2. Who am I?
    const currentlist = data.players || {};
    const playerKeys = Object.keys(currentlist);
    const myIndex = playerKeys.indexOf(myKey);
    const isMyTurn = (data.activeDescriberIndex === myIndex);

    // 3. The Big Toggle
    if (isMyTurn) {
      
        document.getElementById("minigame").style.display = "none";
        document.getElementById("game-ui").style.display = "block";

        const textToShow = (data.activeDescriberIndex === 0) ? data.currentWord : data.latestHint;
        document.getElementById("mustguess").innerText = textToShow;
        
    } else {
    
     
        document.getElementById("game-ui").style.display = "none";
        document.getElementById("minigame").style.display = "block";
        
  
        const activePlayerKey = playerKeys[data.activeDescriberIndex];
        if (activePlayerKey && currentlist[activePlayerKey]) {
            document.getElementById("waiting-msg").innerText = `Waiting for ${currentlist[activePlayerKey].name} to type...`;
        }
    }
}








}});










document.getElementById("send-hint").onclick = function () {
    const hintvalue = document.getElementById("hint").value.trim().toUpperCase();
    if (!hintvalue) return;

    database.ref(`rooms/${room}/activeDescriberIndex`).once('value', (snap) => {
        const currentIndex = snap.val() ?? 0;
        database.ref(`rooms/${room}`).update({
            latestHint: hintvalue,
            activeDescriberIndex: currentIndex + 1
        }).then(() => {
            document.getElementById("hint").value = "";
        });
    });
};



// document.getElementById("send-hint").onclick = function () {
//     const hintvalue = document.getElementById("hint").value.trim();
//     if (!hintvalue) return; 

   
//     database.ref(`rooms/${room}`).once('value', (snap) => {
//         const d = snap.val();
        
//         database.ref(`rooms/${room}`).update({ 
//             latestHint: hintvalue.toUpperCase(),
//             activeDescriberIndex: d.activeDescriberIndex + 1 // Move to the next player!
//         }).then(() => {
            
//             document.getElementById("hint").value = "";
//         });
//     });
// };

//     //   document.getElementById("mustguess").innerText = word.word;
// alert("The game has begun, if anyone wishes to join, you have to make a new room!");
// document.getElementById("roles").style.display = "block";
// document.getElementById("lobby-ui").style.display = "none";

// setTimeout(() => {
// document.getElementById("roles").style.display = "none";


// }, 5000);

// const myIndex = playerKeys.indexOf(myKey);
// if (myIndex === 0) {




// database.ref(`rooms/${room}`).update({ status: "playing", currentWord: word, activeDescriberIndex: 0,});
//         // database.ref(`rooms/${room}`).update({ 

//         //     currentWord: word 
//         // });


// setTimeout(() => {
     
// document.getElementById("describer-ui").style.display = "block";


// }, 5000);

   

// document.getElementById("send-hint").onclick = function () {
// alert("hint will sent");
// const hint = document.getElementById("hint");
// const hintvalue = document.getElementById("hint").value;
//  database.ref(`rooms/${room}`).update({ 

//             latestHint: hintvalue.toUpperCase(),
//             activeDescriberIndex: 1
//         });

// console.log(hint.value.toUpperCase());

// setTimeout(() => {
//      hint.value = "";
// document.getElementById("describer-ui").style.display = "none";
// }, 200);
// }

// } else if (isMyTurn) {
//     alert("your time to shine");
// } else if(isGuesser && isMyTurn) {
// document.getElementById("received-hint").innerText = data.latestHint;
// document.getElementById("guesser-ui").style.display = "block";
// document.getElementById("minigame").style.display = "none";
//     alert("guesser's turn");
//     console.log("active deccriber index is = ", activeDescriberIndex);
// }
//     } else if {

// setTimeout(() => {
     
// document.getElementById("minigame").style.display = "block";



// }, 5000);



//     }



// const latestHint =  data.latestHint
// if (isMyTurn ) {
 
// document.getElementById("minigame").style.display = "none";
// document.getElementById("describer-ui").style.display = "block";

// hint.innerText = latestHint; 


// }



//END OF THE ON.VALUE LISTENER

    


    //TIC TAC TOE


      
let board = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.onclick = (e) => {
        const index = e.target.dataset.index;
        if (board[index] === "") {

            MakeMove(index, "X");
            setTimeout(computerMove, 500);
        }
    }
})



function MakeMove(index, symbol) {
    board[index] = symbol;
    document.querySelector(`[data-index='${index}']`).innerText = symbol;
    isWin();

}

function computerMove() {
    let empty = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null)
    if (empty.length > 0) {
        let random = empty[Math.floor(Math.random() * empty.length)];
        MakeMove(random, "O");

    }

}

//JAVASCRIPT IS THE BACKBONE UPON WHICH THE INTERNET SURVIVES. OVER 50% OF MY CODE IS JAVASCRIPT MEANING THAT WITHOUT IT, I WOULDN'T BE ABLE TO EVEN THINK ABOUT MAKING A GAME
function isWin() {
    const winningnumbers = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let pattern of winningnumbers) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            alert(board[a] + " Wins!");
            console.log(board[a], " Wins!");
            resetBoard();

            return;
        }
    }

    if (!board.includes("")) {
        alert("It's a Draw!");
        console.log("You drew with a random math algorithm, cute")
        resetBoard();
    }

}



function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.innerText = "");
}






























































































































































































































//DO NOT TOUCH THIS BRACE, THIS IS WHAT KEEPS IT FROM CRASHING(FOR NOW!)
}