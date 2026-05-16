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
   
    console.log(tips);
    function randomtip() {
        document.getElementById("random-tip").innerText = tips[Math.floor(Math.random() * tips.length)];

    }
    setInterval(randomtip, 5000);

    // document.getElementById("random-tip").innerText = "IT IS WORKING"
    console.log("Idk, I just wanted to write in the consle");

    //WORD LIST AT THE TOP
    
    // my naming convention will get me in trouble but ok




    //AMANDA TAKE THAT LINE OF CODE YOU PUT ABOVE OUT OR YOU WILL REGRET IT
    //Apparently, when my js changed it didnt reload automatically which was stupid

    console.log("6 * 3 = 21");
    // alert("6*3 = 21! (Your Game is fine when you click ok, Amanda just forgot to remove this if you just saw it)");
    // ooh , can you style alerts?, I need to stop checking my time every 5 minutes on hackatime, i see why you can change how the extension looks now

    //ahh math.floor, the beloved function that makes javascript not make me run mad with 100 decimal places, speaking of decimal places, i should really try making a calculator again

    // console.log the room iddddd 
   


    // ONLY UNCOMMENT TO NUKE THE DB
    // database.ref('rooms').remove();

    // PLAYER LIST
    document.getElementById("id").innerText = room;

    const players = document.getElementById("players");

    //list current players
    database.ref(`rooms/${room}`).on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) return;
        players.innerHTML = "";


      



        //START GAME
        const playerArray = Object.values(currentlist);
        console.log(playerArray);
        const Ready = playerArray.every(p => p.ready === true);
        if (Ready && data.status !== "playing" && myKey === playerKeys[0]) {
            startGame();


            const overlay = document.getElementById("role-reveal");
            overlay.style.display = "flex";

            const rolelist = document.getElementById("role-list");
            rolelist.innerHTML = "";



            function startRealtimeGameLoop() {
                // Listen to live updates for this specific room
                database.ref(`rooms/${room}`).on('value', (snapshot) => {
                    const d = snapshot.val();
                    if (!d) return;

                    // 1. Check if the game is finished
                    if (d.status === "finished") {
                        showEndGameScreen(d);
                        return;
                    }

                    // 2. Find out whose turn it is right now
                    const currentPlayerKey = d.playerKeys[d.activeDescriberIndex];
                    const myKey = sessionStorage.getItem("playerKey");

                    // 3. Update the UI based on role and turn
                    if (myKey === currentPlayerKey) {
                        // --- IT IS MY TURN ---

                        // If I am the GUESSER (the last person in the array)
                        if (d.activeDescriberIndex === d.playerKeys.length - 1) {
                            triggerGuesserTurn(d.latestHint);
                        } else {
                            // I am a subsequent DESCRIBER (Player 2, Player 3, etc.)
                            triggerDescriberTurn(d.latestHint);
                        }

                    } else {
                        // --- IT IS NOT MY TURN ---
                        showWaitingScreen();
                        // (Perfect time to show your Tic-Tac-Toe minigame or pro-tips!)
                    }
                });
            }


            function showEndGameScreen() {
                alert("GAME OVER!");


            }





            //START GAME

            function startGame() {

                const word = words[Math.floor(Math.random() * words.length)];
                const currentlist = playerKeys;
                console.log(currentlist);
                // console.log(word);



                const guesser = playerKeys[playerKeys.length - 1];
                // const guessername = playerArray[guesser].name;
                console.log("The guesser is " + guesser);

                const describers = playerKeys.slice(0, playerKeys.length - 1);
                console.log("the describers are " + describers.name);



                document.getElementById("mustguess").innerText = word.word;

                if (!guesser) return;
                document.getElementById("mustguess").innerText = word.word;
                document.getElementById("forbidden").innerText = word.forbidden;
                document.getElementById("supposed-to-guess").innerText = word.word;

                //TALK TO FIREBASE

                database.ref(`rooms/${room}`).update({
                    status: "playing",
                    currentWord: word.word,
                    forbiddenWords: word.forbidden,
                    guesser: guesser,
                    describers: describers,
                    activeDescriberIndex: 0,
                    latestHint: "waiting for first hint",
                });
            }







            //Wait a minute, Who are you?




            if (data.status === "playing") {

                setTimeout(() => {
                    document.getElementById("role-reveal").style.display = "none";
                }, 4000);
                // 1. Switch from Lobby to Game Screen
                document.getElementById("lobby-ui").style.display = "none";
                document.getElementById("game-ui").style.display = "block";

                // 2. Safely grab the player list and figure out WHO THIS CLIENT IS
                const currentlist = data.players || {};
                const playerKeys = Object.keys(currentlist);
                const myIndex = playerKeys.indexOf(myKey);
                const totalPlayers = playerKeys.length;

                // 3. Define the Turn States reliably
                const isMyTurn = (data.activeDescriberIndex === myIndex);
                const isGuesser = (myIndex === totalPlayers - 1);

                // 4. Grab your UI Containers
                const describerUI = document.getElementById("describer-ui");
                const guesserUI = document.getElementById("final-guess"); // Ensure your HTML wrapper div uses this ID
                const waitingUI = document.getElementById("guesser-ui");
                const minigameUI = document.getElementById("minigame");

                // 5. Execute the Screen Morphing
                if (isMyTurn) {
                    // Hide the waiting game because you are active
                    if (minigameUI) minigameUI.classList.add("hidden");

                    if (!isGuesser) {
                        // --- IT IS YOUR TURN TO DESCRIBE ---
                        if (describerUI) describerUI.style.display = "block";
                        if (guesserUI) guesserUI.style.display = "none";
                        if (waitingUI) waitingUI.style.display = "none";

                        // Show original word for Player 1, otherwise show the relayed hint
                        const targetWord = (data.activeDescriberIndex === 0) ? data.currentWord : data.latestHint;
                        document.getElementById("mustguess").innerText = targetWord;
                        document.getElementById("forbidden").innerText = (data.forbiddenWords || []).join(", ");
                    } else {
                        // --- IT IS YOUR TURN TO MAKE THE FINAL GUESS ---
                        if (describerUI) describerUI.style.display = "none";
                        if (waitingUI) waitingUI.style.display = "none";
                        if (guesserUI) guesserUI.style.display = "block";

                        document.getElementById("final-description").innerText = data.latestHint;
                    }
                } else {
                    // --- IT IS NOT YOUR TURN (WAITING STATE) ---
                    if (describerUI) describerUI.style.display = "none";
                    if (guesserUI) guesserUI.style.display = "none";
                    if (waitingUI) waitingUI.style.display = "block";
                    if (minigameUI) minigameUI.classList.remove("hidden");

                    // Show who everyone is currently waiting on
                    const activeKey = playerKeys[data.activeDescriberIndex];
                    if (activeKey && currentlist[activeKey]) {
                        document.getElementById("waiting-msg").innerText = `Waiting for ${currentlist[activeKey].name}...`;
                    }
                }
            }
            if (data.status === "finished") {
                // Hide active gameplay interfaces
                const gameUI = document.getElementById("game-ui");
                if (gameUI) gameUI.style.display = "none";

                // Reveal the final scoreboard interface
                const revealUI = document.getElementById("final-reveal");
                if (revealUI) revealUI.style.display = "block";

                // Populate the final comparison strings directly from Firebase state
                const targetWordElem = document.getElementById("supposed-to-guess");
                const actualGuessElem = document.getElementById("what-did-they-guess");

                if (targetWordElem) targetWordElem.innerText = data.currentWord || "";
                if (actualGuessElem) actualGuessElem.innerText = data.finalGuess || "";
            }

            // if (isMyTurn) {
            //     document.getElementById("waiting-msg").style.display = "none";
            //     document.getElementById("hint-div").style.display = "block";

            //     if (!isGuesser) {

            //         const text = (data.activeDescriberIndex === 0) ? data.currentWord : data.latestHint;
            //         document.getElementById("mustguess").innerText = text;

            //     } else {

            //         document.getElementById("mustguess").innerText = "THE HINT: " + data.latestHint;

            //     }
            // } else {

            //     document.getElementById("input-section").style.display = "none";
            //     document.getElementById("waiting-msg").style.display = "block";
            //     document.getElementById("minigame").style.display = "block";

            //     const activeKey = playerKeys[data.activeDescriberIndex];
            //     if (activeKey) {
            //         document.getElementById("waiting-msg").innerText = `Waiting for ${currentlist[activeKey].name}...`;
            //     }
            // }


            playerKeys.forEach((key, index) => {
                const li = document.createElement("li");
                const pName = currentlist[key].name;


                if (index === playerKeys.length - 1) {
                    li.innerHTML = `<strong> FINAL GUESSER: ${pName} </strong>`;

                } else {
                    li.innerText = `${pName} is a DESCRIBER`;
                }

                rolelist.appendChild(li);
                document.getElementById("role-assignment").innerText = "";

            })

            alert("EVERYONE CHECK YOUR ROLES!");
            //IT WORKS, UNCOMMENT START GAME WHEN YOU FINISH MAKING IT
            //time to test if this even works IN 4 SEPARATE CHROME TABS
        } else {
            // alert("Please wait for another player to join the game!");
            // I click it twice and it join twice, why
            ready.innerText = "Waiting for all game conditions to be met";
        }
    })









    // //DELETE ASAP
    // document.getElementById("send-hint").onclick = nothing4u;

    // function nothing4u() {

    //     alert("NOTHING 4 U");
    //     alert("I said, Nothing for you");
    // //ew, why did I type that.
    // }


    // // What the I'm ready button does.

    // const ready = document.getElementById("ready");

    // document.getElementById("ready").onclick = dude;
    // function dude() {
    // alert("That Button doesn't do anything");

    // }



    //EVERYONE IS READY
    database.ref(`rooms/${room}/players/${myKey}`).update({
        ready: true
    });

    ready.disabled = true;
    ready.innerText = "Waiting for others...";
    ready.classList.add("disabled");
    document.getElementById("fone").classList.add("show");






//WAITING FOR A RESPONSE FROM FIREBASE FEELS SO LAGGYYY, BUT WRITING COMMENTS IN JS IS SO SMOOTH AND EASY
//TODO: MAKE TIC TAC TOE(OR YK, FIND AN ENGINE), INTEGRATE SPOTIFY, OR YK JUST A YOUTUBE PLAYLIST WOULD WORK FOR THE WAITING ROOM, REMEMEBRT O MAKE TRANSITIONS SOFT INSTEAD OF JUST QUICK REDIRECTS










//I STOPPED HERE I BELIVE, PLEASE RWNAME THOSE FUNCTIONS SO that I dONT HAVE TO SPEND TIME SCROLLInh THROUGH YOUR CHAOTIC //CODE WHEN SOMETHING BREAKS, I BEG
//Amanda, learn to type well

//MAKE A CUTE LOBBY, ATP JUST RESUSE THE CSS FROM THE ONLINE TELEPHONE(Countodwn to the end of high school, ma), YEAH, PWETTY





//OOPS, MY LAPTOP IS WARM TO THE TOUCH, WHICH NEVER HAPPENS, ANYWAYSSSSS.
//TIME TO BUILD TIC TAC TOE ENGINE.



//it appears I might have to use git cli cus github desktop is lagging really bad

//Log the nubmer of times you have lost to the computer because why not, oh yeah it should. to make it more fun. you 0 or computer 0, yeah log in the console nah just have smth and add plus 1 depending on if x or o wins















//GAME LOGIC ITSELF



//SUBMIT THE HINT
document.getElementById("send-hint").onclick = () => {
    const val = document.getElementById("hint").value.trim().toUpperCase();
    if (!val) return;

    database.ref(`rooms/${room}`).once('value', (snap) => {
        const d = snap.val();

        // --- NEW FORBIDDEN WORD CHECK ---
        const forbiddenList = d.forbiddenWords || [];
        // Check if any forbidden word is included in what the user typed
        const usedForbidden = forbiddenList.some(word => val.includes(word.toUpperCase()));

        if (usedForbidden) {
            alert("Ah ah! You used a forbidden word. Change your hint!");
            return; // Stops the function so it doesn't send to Firebase
        }
        // --------------------------------

        database.ref(`rooms/${room}`).update({
            latestHint: val,
            activeDescriberIndex: d.activeDescriberIndex + 1
        }).then(() => {
            alert("Your hint was sent!");
            document.getElementById("hint").value = "";
        });
    });
};






document.getElementById("send-guess").onclick = () => {
    const guessInput = document.getElementById("guess-input"); // Make sure your input ID matches
    if (!guessInput) return;

    const val = guessInput.value.trim().toUpperCase();
    if (!val) return;

    // Lock in the final guess and trigger the global reveal state
    database.ref(`rooms/${room}`).update({
        finalGuess: val,
        status: "finished"
    });
};































//DO NOT DELETE THIS BRACE OR TYPE CODE OUTSIDE IT BECAUSE THAT CODE WILL RUN BEFORE THE HTML LOADS
}