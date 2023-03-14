window.addEventListener('DOMContentLoaded', () => {
    // let cells = document.querySelectorAll('.cell');
    // cells = Array.from(cells);
    let cells = Array.from(document.querySelectorAll('.cell'))
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const DRAW = 'DRAW';
    
    
    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */
    
    let winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    
    function checkForWinner(){
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCombination = winningCombinations[i];
            const a = board[winCombination[0]];
            const b = board[winCombination[1]];
            const c = board[winCombination[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
    
    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }
    
    if (!board.includes(''))
    announce(DRAW);
    }
    
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Hurray🥳, Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Hurray🥳, Player <span class="playerX">X</span> Won';
                break;
            case DRAW:
                announcer.innerText = 'Draw';
        }
        announcer.classList.remove('hide');
    };
    
    const isValidAction = (cell) => {
        if (cell.innerText === 'X' || cell.innerText === 'O'){
            return false;
        }
    
        return true;
    };
    
    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }
    
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }
    
    const userAction = (cell, index) => {
        if(isValidAction(cell) && isGameActive) {
            cell.innerText = currentPlayer;
            cell.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            checkForWinner();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
    
        if (currentPlayer === 'O') {
            changePlayer();
        }
    
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('playerX');
            cell.classList.remove('playerO');
        });
    }
    
    cells.forEach( (cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index));
    });
    
    resetButton.addEventListener('click', resetBoard);
    });
    