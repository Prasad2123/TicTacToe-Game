    console.log("Welcome to Tic Tac Toe");
    let music = new Audio("music.mp3");
    let audioTurn = new Audio("ting.mp3");
    let gameover = new Audio("gameover.mp3");
    let turn = "X";
    let isgameover = false;

    // Function to change the turn
    const changeTurn = () => {
        return turn === "X" ? "0" : "X";
    }

    // Function to check for a win
    const checkWin = () => {
        let boxtext = document.getElementsByClassName('boxtext');
        let wins = [
            [0, 1, 2, 5, 5, 0],
            [3, 4, 5, 5, 15, 0],
            [6, 7, 8, 5, 25, 0],
            [0, 3, 6, -5, 15, 90],
            [1, 4, 7, 5, 15, 90],
            [2, 5, 8, 15, 15, 90],
            [0, 4, 8, 5, 15, 45],
            [2, 4, 6, 5, 15, 135],
        ];
        wins.forEach(e => {
            if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
                (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
                (boxtext[e[0]].innerText !== "")) {
                document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
                isgameover = true;
                music.pause(); // Stop background music
                gameover.play();  // Play gameover music once
                document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
                document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
                document.querySelector(".line").style.width = "22vw";
            }
        });
    }

    // Function to check for a tie
    const checkTie = () => {
        let boxtext = document.getElementsByClassName('boxtext');
        let isTie = true;
        Array.from(boxtext).forEach(element => {
            if (element.innerText === '') {
                isTie = false;
            }
        });
        if (isTie && !isgameover) {
            document.querySelector('.info').innerText = "It's a Tie!";
            isgameover = true;
            music.pause(); // Stop background music
            gameover.play();  // Play gameover music once
        }
    }

    // Game Logic
    // Ensure the background music starts playing on user interaction
    document.body.addEventListener('click', () => {
        if (music.paused && !isgameover) {
            music.play();
        }
    });

    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(element => {
        let boxtext = element.querySelector('.boxtext');
        element.addEventListener('click', () => {
            if (boxtext.innerText === '' && !isgameover) {
                boxtext.innerText = turn;
                boxtext.classList.add(turn === "X" ? "X" : "O"); // Add class based on turn
                audioTurn.play();  // Play turn sound
                turn = changeTurn();
                checkWin();
                checkTie();  // Check for a tie after every move
                if (!isgameover) {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                }
            }
        });
    });

    // Add onclick listener to reset button
    reset.addEventListener('click', () => {
        let boxtexts = document.querySelectorAll('.boxtext');
        Array.from(boxtexts).forEach(element => {
            element.innerText = "";
            element.classList.remove("X", "O"); // Remove classes on reset
        });
        turn = "X";
        isgameover = false;
        document.querySelector(".line").style.width = "0vw";
        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
        music.play();  // Restart background music
    });
