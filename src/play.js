window.onload = () => {
// CONFIG
//TODO: FOR THE NEVADA GAME, TRY TO USE SPOTIFY INTEGRATION, FOR THE ONLINE TELEPHONE IF THE GUESSER GUESSES WRONG, PLAY NAH YOURE WRONG THEN REVEAL IT TO EVERYONE.
//wHAT THE GUESSER GUESSED THEN UNDERNEATH, WHAT THE ACTUAL WORD WAS, THE GUESSER GETS ONLY THE LAST HINT CUS WHY NOT, GIVING THEM ALL THE HINTS WOULD MAKE IT TOO EASY
//CURRENT LOGIC, MAKE AN ARRRAY CALLED PLAYERKEYS WHICH FETHEC THE PLAYER KEYS WHEN THE ROOM STATUS IS PLAYING, PICK WHICH PLAYER IS DESRIBER 1 THEN DESCRIBER 2 THEN DESRIBER 3 THEN GUESSER
//I STILL NEED TO DECIDE IF I MAKE THE GAME A FIXED LENGTH OR IF I TRY TO MAKE IT INCLUSIVE, MAKING IT INCLUSIVE WOULD BE HARDER SO WHY NOT
//YEAH, SO FAR SO GOOD, I HOPE, STILL NEED TO WORK ON THE FORBIDDEN WORD LIST, YEAH IL ALERT THE DESRIBER IF THEIR THING HAS A FORBIDDEN WORD, PRETTY MUCH PARSE THEIR DESCRIPTION AS SEOARATE WORDS IN AN ARRAYM IF IT CONTAINS ANY OF THE FORBIDDEN WORDS,(MEHN JUST TRANSFORM THE WORDS TO ALLCAPS TO MAKE IT EASY AND DELETE WHITESPACE), IF IT DOESN, ALERT THEN RETURN,. SIMPLE IN THEORY
//should i add a twist that your description cnanot be very long?, nah that would just be mean,
//YES, I AM USING THE TOP OF MY CODE TO BRAINSTORM, THE NOTES FILE IS TOO UNSERIOUS TO PUT A TODO LIST IN AND STICKY NOTES WOULD CRASH MY COMPUTER
//DO GITHUB REPOS HAVE SEO BY DEFAULT?(I LOVE LEAVING CAPSLOCK ON EVEN THOUGH IT IT THE EQUIVALENT OF DIGITAL SCREAMING)
//ooh, loading screen with tips like. if youre playing online telephone with your close friends, try desribing the word in a way that it links to a shared experience, it makes it really fun. like for pizza you could say "that one thing Anns was craving when she got her wisdom teeth out"
//i just thought about adding play again logic but nah for the appreciatioon message "Thank you for playing online telephone, to lay again, kindly make another room and join, play again logic and having players leave and new players join is too complex, thats what prjsk does"
//also, thank you for playing, I MIGHT allow people to join random waittttt nvm, trolls would just eat that up
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
    forbidden: [" APPLE ", " PHONE ", " SCREEN ", " STEVE JOBS ", " APP ", " YOU ", " ANDROID "]

},

{
word: "PIZZA",
forbidden: [" CHEESE ", " ITALY ", " DOUGH ", " DELIVERY ", " PEPPERONI ", " SLICE ", " PARTY ", " MARINARA ", " PINEAPPLE "]

},

{
word: "SPIDERMAN",
forbidden: [" MARVEL ", " WEB ", " PETER PARKER ", " TOM HOLLAND ", " ANDREW GARFIELD ", " TOBEY MAGUIRE ", " HERO "," AVENGERS ", " TONY STARK ", " AUNT MAY ", " UNCLE BEN ", " SPIDER ", " MAN "]

},


{
word: "BLACK PANTHER",
forbidden: [" BLACK ", " PANTHER ", " SHURI ", " T'CHALA ", " PRINCE ", " CLAW ", " KILLMONGER ", " WAKANDA ", " AFRICA ", " VIBRANIUM "]

},


{
word:"TOP GUN",
forbidden: [" PLANES ", " ETHAN HUNT ", " ROOSTER ", " GOOSE ", " PLANES ", " WAR ", " DOGFIGHTING "," BUNKER "]
//They'll never be able to guess this one correctly
},


{
word:"MINECRAFT",
forbidden: [" STEVE ", " CHICKEN JOCKEY ", " CREEPER ", " ZOMBIE ", " SKELETON ", " RUEBEN ", " BLOCKS ", " BUILDING "," MINING ", " NETHER ", " MOBS ", " FLYING ", " CREATIVE MODE "]
//Rip Rueben, Minecraft story mode made me cry
},


{
word: "SPOTIFY",
forbidden: ["WRAPPED", "MUSIC", "DJ", "BEST", "PLAYLIST", "ARTIST", "STREAMING","GREEN"]
//Terrible we player that is making me code in silence
},


{
word: "HATSUNE MIKU" ,
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
// my naming convention will get me in trouble but ok
const word = words[Math.floor(Math.random() * words.length)];
console.log(word);


document.getElementById("mustguess").innerText = word.word;
document.getElementById("forbidden").innerText = word.forbidden;
//AMANDA TAKE THAT LINE OF CODE YOU PUT ABOVE OUT OR YOU WILL REGRET IT
//Apparently, when my js changed it didnt reload automatically which was stupid

console.log("6 * 3 = 21");
// alert("6*3 = 21! (Your Game is fine when you click ok, Amanda just forgot to remove this if you just saw it)");
// ooh , can you style alerts?, I need to stop checking my time every 5 minutes on hackatime, i see why you can change how the extension looks now

//ahh math.floor, the beloved function that makes javascript not make me run mad with 100 decimal places, speaking of decimal places, i should really try making a calculator again

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
    // startGame();
    alert("EVERYONE IS READY");
    //IT WORKS, UNCOMMENT START GAME WHEN YOU FINISH MAKING IT
//time to test if this even works IN 4 SEPARATE CHROME TABS
} else {
    // alert("Please wait for another player to join the game!");
    // I click it twice and it join twice, why
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
console.log("It's guessing time")
if (!myKey) {
alert("Yeah, Idk who you are! Join the room correctly")
return;
}


//EVERYONE IS READY
database.ref(`rooms/${room}/players/${myKey}`).update({
    ready: true
});

ready.disabled = true;
ready.innerText = "Waiting for others...";
ready.classList.add("disabled");
document.getElementById("fone").classList.add("show");


}


//WAITING FOR A RESPONSE FROM FIREBASE FEELS SO LAGGYYY, BUT WRITING COMMENTS IN JS IS SO SMOOTH AND EASY
//TODO: MAKE TIC TAC TOE(OR YK, FIND AN ENGINE), INTEGRATE SPOTIFY, OR YK JUST A YOUTUBE PLAYLIST WOULD WORK FOR THE WAITING ROOM, REMEMEBRT O MAKE TRANSITIONS SOFT INSTEAD OF JUST QUICK REDIRECTS










//I STOPPED HERE I BELIVE, PLEASE RWNAME THOSE FUNCTIONS SO that I dONT HAVE TO SPEND TIME SCROLLInh THROUGH YOUR CHAOTIC //CODE WHEN SOMETHING BREAKS, I BEG
//Amanda, learn to type well

//MAKE A CUTE LOBBY, ATP JUST RESUSE THE CSS FROM THE ONLINE TELEPHONE(Countodwn to the end of high school, ma), YEAH, PWETTY





//OOPS, MY LAPTOP IS WARM TO THE TOUCH, WHICH NEVER HAPPENS, ANYWAYSSSSS.
//TIME TO BUILD TIC TAC TOE ENGINE.



let board = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
cell.onclick = (e) =>{
    const index = e.target.dataset.index;
    if (board[index] === "" ) {

        MakeMove(index, "X");
        setTimeout(computerMove, 500);
    }
}})



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
    [0,1,2], [3,4,5] , [6,7,8], [0,3,6], [1, 4, 7], [2, 5, 8], [0,4,8], [2, 4,6]];

    for (let pattern of winningnumbers) {
        const [a,b,c] = pattern;
        if (board[a] && board[a] === board [b] && board [a] === board[c]) {
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
//it appears I might have to use git cli cus github desktop is lagging really bad

//Log the nubmer of times you have lost to the computer because why not, oh yeah it should. to make it more fun. you 0 or computer 0, yeah log in the console nah just have smth and add plus 1 depending on if x or o wins





































































//DO NOT DELETE THIS BRACE OR TYPE CODE OUTSIDE IT BECAUSE THAT CODE WILL RUN BEFORE THE HTML LOADS
}