window.onload  = () =>{







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

    // Get Room ID and Player Key
    const roomurl = window.location.search; 
    const urlparam = new URLSearchParams(roomurl); 
    const room = urlparam.get('room'); 
    const myKey = sessionStorage.getItem("playerKey"); 

    if (!myKey || !room) {
        alert("Yeah, Idk who you are! Join the room correctly"); 
        window.location.href = "index.html"; // Kick them out
        return;
    }

    document.getElementById("id").innerText = room; 

    // --- 2. GAME DATA ARRAYS ---
    const tips = [
        "Describe words using shared memories for more fun!", 
        "Avoid the forbidden words or you'll get a 'Nah you're wrong'!", 
        "Tic-Tac-Toe is just for the waiting time. Focus up!", 
        "The guesser only sees the very last hint. Be descriptive!"
    ];

    const words = [
        { word: "IPHONE", forbidden: ["APPLE", "PHONE", "SCREEN", "STEVE JOBS", "APP", "YOU", "ANDROID", "IOS"] },
        { word: "PIZZA", forbidden: ["CHEESE", "ITALY", "DOUGH", "DELIVERY", "PEPPERONI", "SLICE", "PARTY", "MARINARA", "PINEAPPLE"] }, 
        { word: "SPIDERMAN", forbidden: ["MARVEL", "WEB", "PETER PARKER", "TOM HOLLAND", "ANDREW GARFIELD", "TOBEY MAGUIRE", "HERO", "AVENGERS"] }, 
        { word: "MINECRAFT", forbidden: ["STEVE", "CHICKEN JOCKEY", "CREEPER", "ZOMBIE", "SKELETON", "RUEBEN", "BLOCKS", "BUILDING", "MINING"] } 
    ];

    // Random Tip Generator
    setInterval(() => {
        document.getElementById("random-tip").innerText = tips[Math.floor(Math.random() * tips.length)]; 
    }, 5000);

    // --- 3. DOM ELEMENTS ---
    const uiLobby = document.getElementById("lobby-ui");
    const uiDescriber = document.getElementById("describer-ui");
    const uiMinigame = document.getElementById("minigame"); // Assuming you wrapped Tic-Tac-Toe in this
    const uiResults = document.getElementById("results-ui");
    
    const playersList = document.getElementById("players"); 
    const btnReady = document.getElementById("ready-btn");
    const btnStart = document.getElementById("start-btn"); // Only visible to Host
    const btnSendHint = document.getElementById("send-hint-btn");
    
    const hintInput = document.getElementById("hint-input");
    const displayWord = document.getElementById("mustguess"); // Where the hint/word is shown

    // --- 4. THE STATE MACHINE (FIREBASE LISTENER) ---
    // This is the ONLY place UI should be updated based on game state
    database.ref(`rooms/${room}`).on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        // 4a. Update Player List
        const currentPlayers = data.players || {};
        const playerKeys = Object.keys(currentPlayers);
        const totalPlayers = playerKeys.length;
        const myIndex = playerKeys.indexOf(myKey);
        const isHost = (myIndex === 0);

        playersList.innerHTML = "";
        playerKeys.forEach((key) => {
            const player = currentPlayers[key];
            const li = document.createElement("li"); 
            li.innerText = `${player.name} ${player.ready ? "(Ready)" : ""}`;
            li.classList.add("players"); 
            playersList.appendChild(li); 
        });

        // 4b. Handle Game States
        const status = data.status || "waiting";

        if (status === "waiting") {
            // LOBBY STATE
            uiLobby.style.display = "block";
            uiDescriber.style.display = "none";
            uiMinigame.style.display = "none";

            const allReady = playerKeys.every(key => currentPlayers[key].ready === true); 
            if (isHost && allReady && totalPlayers >= 3) {
                btnStart.style.display = "block"; // Host can start the game
            } else {
                btnStart.style.display = "none";
            }

        } else if (status === "playing") {
            // PLAYING STATE
            uiLobby.style.display = "none";
            
            const activeIndex = data.activeDescriberIndex || 0;
            const isMyTurn = (myIndex === activeIndex); 
            const isGuesser = (myIndex === totalPlayers - 1); 

            if (isMyTurn) {
                uiMinigame.style.display = "none";
                uiDescriber.style.display = "block";
                
                // Show original word if Player 1, otherwise show latest hint
                if (myIndex === 0) {
                    displayWord.innerText = `Word to describe: ${data.currentWord.word}`;
                } else {
                    displayWord.innerText = `Previous Hint: ${data.latestHint}`;
                }

                // If final player (guesser), change input placeholder
                if (isGuesser) {
                    hintInput.placeholder = "What do you think the word was?"; 
                    btnSendHint.innerText = "Submit Final Guess";
                }

            } else {
                // Not my turn -> Play Tic Tac Toe!
                uiDescriber.style.display = "none";
                uiMinigame.style.display = "block";
            }

        } else if (status === "finished") {
            // FINISHED STATE
            uiMinigame.style.display = "none";
            uiDescriber.style.display = "none";
            uiResults.style.display = "block";
            
            // Render results (You'll need to build the HTML for this)
            // Example: "Original word was X, Final guess was Y"
        }
    });

    // --- 5. ACTION FUNCTIONS (Pushing to Firebase) ---

    // Click "I'm Ready"
    btnReady.onclick = () => {
        database.ref(`rooms/${room}/players/${myKey}`).update({ ready: true }); 
        btnReady.style.display = "none"; 
    };

    // Click "Start Game" (Host Only)
    btnStart.onclick = () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        database.ref(`rooms/${room}`).update({ 
            status: "playing", 
            currentWord: randomWord, 
            activeDescriberIndex: 0,
            latestHint: ""
        }); 
    };

    // Click "Send Hint"
    btnSendHint.onclick = () => {
        const hintValue = hintInput.value.toUpperCase(); 
        if (!hintValue) return;

        // Fetch current room data once to update logic
        database.ref(`rooms/${room}`).once('value').then((snapshot) => {
            const data = snapshot.val();
            const playerKeys = Object.keys(data.players);
            const myIndex = playerKeys.indexOf(myKey);
            const isGuesser = (myIndex === playerKeys.length - 1);

            if (isGuesser) {
                // The game is over!
                database.ref(`rooms/${room}`).update({
                    status: "finished",
                    finalGuess: hintValue
                });
            } else {
                // Pass the baton to the next player
                database.ref(`rooms/${room}`).update({
                    latestHint: hintValue, 
                    activeDescriberIndex: myIndex + 1
                });
            }
            hintInput.value = ""; // Clear input [cite: 421]
        });
    };

    // --- 6. TIC TAC TOE LOGIC ---
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
    });

    function MakeMove(index, symbol) {
        board[index] = symbol; 
        document.querySelector(`[data-index='${index}']`).innerText = symbol; 
        isWin(); 
    }

    function computerMove() {
        let empty = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null); 
        if (empty.length > 0) {
            let random = empty[Math.floor(Math.random() * empty.length)]; 
            MakeMove(random, "O"); 
        }
    }

    function isWin() {
        const winningnumbers = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
        ]; 

        for (let pattern of winningnumbers) {
            const [a, b, c] = pattern; 
            if (board[a] && board[a] === board[b] && board[a] === board[c]) { 
                alert(board[a] + " Wins!"); 
                resetBoard(); 
                return;
            }
        }
        if (!board.includes("")) {
            console.log("You drew with a random math algorithm, cute");
            resetBoard(); 
        }
    }

    function resetBoard() {
        board = ["", "", "", "", "", "", "", "", ""]; 
        cells.forEach(cell => cell.innerText = ""); 
    }
};

















