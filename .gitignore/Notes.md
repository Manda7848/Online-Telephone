# IDK Why I keep using markdown instead of a txt file, I think it just gives me more of an opportunity to make my brain dump look cool

Ok soooooooo
first off
I need to design a cool phone graphic.

This is like Gartic phone even though I've never played ittttt


Basic structure
Instruction page
proceed
Game pgae
player one clicks btn
player one gets work(Make a random word selecting graphic if possible)
Player one types in their description
submita
when the javascript on another page and that page recieves it, it stores it then reloads so it shows for the others(figure this out)

Player 2 it is your turn

desrcibe in your own words what you think the object it

submit
same mechanic probably for another player


player 4
what do you think the word was

submit

then the page reloads for everyone and shoes what player 4 thought the word was
and what the word actually was.
the ends


sooooooo
hm.
i need a um body ofc

then div for the phone
then div for the form

then div for the text(probably not necessary)

then loading page
But how to manage it blacking out the form for others?
Like with a loading graphic

also, instruction page

I hqave to use boring naming conventions so that it actually works ughgggggg. I think I should design the instructions in canva cus ittl just make my life easier

apparently, i have to write backend. ugh

I need a favicon, instructions, and phone


Why does commenting a comment in js stack and not reverse the comment like other languages

THE whoosh sound effect is too long

i finna just crop the clip



IF ONLY IT WAS IN A FORMAT WINDOWS 10 NATIVELY SUPPORTS

oh wait, windows supports it, heh

loading screen cus i forgot to introduce the game

had to add id to the main

Don't you just love how developer friendly google tools are?(a hint of sarcasm but fr, they are so nice)



WELL NOW, IK HOW TO MAKE A CHAT APP USING FIREBASE DATABASE

for now, I need to make a lobby login page

then manage the states.

somehow messed up and made my .vercel file public
heh


OK so now, i am trying to understand firebase logic which is so confusing,


NEXT COMMIT MESSAGE IS: BUT I DIGRESS, THERE IS PROGRESS
If you haven't been able to tell yet, I love using console.log. It's about the only js function I don't need to seach online for to know how to use. That and alert

yes my game will be buggy so I have to add a disclaimer, nah i really dont have to
if the game says you guessed spiderman wrong because you typed it as spider-man. you ARE wrong

# FOR MY README
# DEAR SLEEPOVER REVIEWER, THIS IS PROBABLY SOME OF THE MOST DIRTY, BADLY FORMATTED AND UNSERIOUS CODE YOU HAVE SEEN TODAY. YOU HAVE WITNESSED THE CULMUNATION OF IDK WHAT TO TYPE ANYMORE.....


Github desktop is lagging really bad so i'll try to install git and just use the cli.



I'll add a space between each word in the array because there is no way I am writing javascript to put space in between

//Labelling code with comments makes your life so much easier


Ctrl + F made my life so much easier


learned that `` are an intergated way to make rendering strings easy

rip people that have slow wifi



ok so it is time to burn the code down and build it from the ground up

first off before first off
INITIALIZE FIREBASE

 const firebaseConfig = {
        apiKey: "AIzaSyA9SwtBw1A0t49YYqajQIPGK8Kx9ts7oTE",
        authDomain: "online-telephone-7848.firebaseapp.com",
        databaseURL: "https://online-telephone-7848-default-rtdb.firebaseio.com",
        projectId: "online-telephone-7848",
        storageBucket: "online-telephone-7848.firebasestorage.app",
        messagingSenderId: "881904369324",
        appId: "1:881904369324:web:7b08e84f42c4226671a909"
    };
    let playerKeys = [];
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    //array, array,array, array ah ah, array ah
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


FORBIDDEN WORD ARRAY

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



PLAYER KEY INIT
first off, make sure people dont join by just typing the room id url direclty in the tab with this chunk of code:



const myKey = sessionStorage.getItem("playerKey");
console.log(myKey);
ready.onclick = () => {
console.log("It's guessing time")
if (!myKey) {
alert("Yeah, Idk who you are! Join the room correctly");
return;
}
}


UMM, RENDER PLAYER LIST.
THEN THE IM READY BUTTON
WHEN EVERYONE IS READY, HIDE THE PLAYER LIST CARD.

SHOW THE GETTING READY AND RANDOM TIP FOR MAYBE 3 SECONDS
SHOW THE FIRST DESCRIBER THEIR INSTRUCTIONS ON TOP, DESCRIBE THE WORD AS BEST AS YOU CAN

THEY CLICK SENT HINT, IF IT HAS A FORBIDDEN WORD, ALERT THAT THEY HAVE A FORBIDDEN WORD.


IF IT IS NOT YOUR TURN, YOU GET SHOWN A RANDOM TIP AT THE TOP AND ALSO GET TO PLAY TIC TAC TOE.

ONCE YOU SEND THE HINT, SHOWS THE ITS NOT YOUR TUEN YER, YOU CAN PLAY TIC TAC TOE WHILE YOU WAIT

WHEN THE FINAL PERSON SENDS THEIR HINT.

HIDE EVERYTHING

SHOW SUPPOSED TO GUESS: THEN SHOW WHAT THEY GUESSED, IF THEY GUESSED CORRECTLY, IT SHOWS THE SUCCESSFUL MESSAGE, IF NOT, SHOW THE TRY AGAIN IS A DIFFERENT ROOM, BELOW THAT SUPPOSED TO GUESS AND GUESSED, RENDER THE LIST OF EVERYONES ROLES USING THEIR TURNS, FIRS TPERSON'S NAME WAS DESCRIBER ONE, SECOND PERSON WAS DESCRIBER 2 ETC.


PASTING CHUNKS TO RECYCLE HERE LIKE TIC TAC TOE

KAAEPING THE URL REDIRECT CHECKER

 console.log("Firebase sucessfully redirected!");

    const roomurl = window.location.search;
    console.log(roomurl);

    const urlparam = new URLSearchParams(roomurl);

    const room = urlparam.get('room');
    console.log("Your room ID is", room);





CURRENT PLAYERS RENDER

// PLAYER LIST
    document.getElementById("id").innerText = room;

    const players = document.getElementById("players");

    //list current players
    database.ref(`rooms/${room}`).on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) return;
        players.innerHTML = "";




  const currentlist = data.players || {};
        const playerKeys = Object.keys(currentlist);
        const myIndex = playerKeys.indexOf(myKey);

        // const currentlist = snapshot.val();

        console.log(playerKeys);
        console.log(currentlist);


        Object.keys(currentlist).forEach((key) => {

            const playerlist = currentlist[key];

            const li = document.createElement("li");
            li.innerText = playerlist.name;
            li.classList.add("players");
            players.appendChild(li);
            console.log(players);
        });

    });




    TIC TAC TOE

    
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



SO FIRST OFF, ROLE RENDER LIST, THE ONCE THE START GAME FUNCTION RUNS, HIDE THE PLAYER LIST, 



