class LoveWordle {
    constructor() {
        this.wordleOverlay = document.getElementById('wordleOverlay');
        this.wordleBoard = document.getElementById('wordleBoard');
        this.wordleKeyboard = document.getElementById('wordleKeyboard');
        this.previewText = document.getElementById('previewText');
        this.wordleHints = document.getElementById('wordleHints');
        this.wordleResult = document.getElementById('wordleResult');
        this.resultTitle = document.getElementById('resultTitle');
        this.resultWord = document.getElementById('resultWord');
        this.resultMessage = document.getElementById('resultMessage');
        
        this.currentWord = '';
        this.currentMessage = '';
        this.currentRow = 0;
        this.currentTile = 0;
        this.maxAttempts = 6;
        this.wordLength = 0;
        this.gameOver = false;
        this.guesses = [];
        this.hintsUsed = 0;
        this.maxHints = 3;
        
        this.init();
    }
    
    init() {
        this.selectRandomWord();
        this.createBoard();
        this.createKeyboard();
        this.setupEventListeners();
        this.updateMessagePreview();
    }
    
    selectRandomWord() {
    const today = new Date().toISOString().split('T')[0];
    const storedWord = localStorage.getItem('wordleWord_' + today);
    const storedMessage = localStorage.getItem('wordleMessage_' + today);
    
    if (storedWord && storedMessage) {
        this.currentWord = storedWord;
        this.currentMessage = storedMessage;
    } else {
        const suitableWords = allLoveWords.filter(item => 
            item.word.length >= 4 && item.word.length <= 8 && 
            /^[a-zA-Z]+$/.test(item.word)
        );
        
        const randomIndex = Math.floor(Math.random() * suitableWords.length);
        const selected = suitableWords[randomIndex];
        
        this.currentWord = selected.word.toUpperCase();
        this.currentMessage = selected.message;
        
        // Store for today
        localStorage.setItem('wordleWord_' + today, this.currentWord);
        localStorage.setItem('wordleMessage_' + today, this.currentMessage);
    }
    
    this.wordLength = this.currentWord.length;
}
    
    createBoard() {
        this.wordleBoard.innerHTML = '';
        
        for (let i = 0; i < this.maxAttempts; i++) {
            const row = document.createElement('div');
            row.className = 'wordle-row';
            row.dataset.row = i;
            
            for (let j = 0; j < this.wordLength; j++) {
                const tile = document.createElement('div');
                tile.className = 'wordle-tile';
                tile.dataset.row = i;
                tile.dataset.col = j;
                row.appendChild(tile);
            }
            
            this.wordleBoard.appendChild(row);
        }
    }
    
    createKeyboard() {
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
        ];
        
        this.wordleKeyboard.innerHTML = '';
        
        rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row';
            
            row.forEach(key => {
                const button = document.createElement('button');
                button.className = 'key';
                button.textContent = key;
                button.dataset.key = key;
                
                if (key === 'ENTER' || key === '⌫') {
                    button.classList.add('wide');
                }
                
                button.addEventListener('click', () => this.handleKeyPress(key));
                rowDiv.appendChild(button);
            });
            
            this.wordleKeyboard.appendChild(rowDiv);
        });
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.wordleOverlay.classList.contains('hidden') || this.gameOver) return;
            
            if (e.key === 'Enter') {
                this.handleKeyPress('ENTER');
            } else if (e.key === 'Backspace') {
                this.handleKeyPress('⌫');
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                this.handleKeyPress(e.key.toUpperCase());
            }
        });
        
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        
        document.getElementById('skipBtn').addEventListener('click', () => this.skipGame());
        
        document.getElementById('continueBtn').addEventListener('click', () => this.continueToMain());
    }
    
    handleKeyPress(key) {
        if (this.gameOver) return;
        
        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === '⌫') {
            this.deleteLetter();
        } else if (this.currentTile < this.wordLength) {
            this.addLetter(key);
        }
    }
    
    addLetter(letter) {
        const tile = document.querySelector(`.wordle-tile[data-row="${this.currentRow}"][data-col="${this.currentTile}"]`);
        if (tile) {
            tile.textContent = letter;
            tile.classList.add('filled');
            this.currentTile++;
        }
    }
    
    deleteLetter() {
        if (this.currentTile > 0) {
            this.currentTile--;
            const tile = document.querySelector(`.wordle-tile[data-row="${this.currentRow}"][data-col="${this.currentTile}"]`);
            if (tile) {
                tile.textContent = '';
                tile.classList.remove('filled');
            }
        }
    }
    
    submitGuess() {
        if (this.currentTile !== this.wordLength) {
            this.shakeRow();
            return;
        }
        
        const guess = this.getCurrentGuess();
        this.guesses.push(guess);
        
        this.checkGuess(guess);
        
        if (guess === this.currentWord) {
            this.gameOver = true;
            setTimeout(() => this.showResult(true), 1500);
        } else if (this.currentRow >= this.maxAttempts - 1) {
            this.gameOver = true;
            setTimeout(() => this.showResult(false), 1500);
        } else {
            this.currentRow++;
            this.currentTile = 0;
        }
    }
    
    getCurrentGuess() {
        let guess = '';
        for (let i = 0; i < this.wordLength; i++) {
            const tile = document.querySelector(`.wordle-tile[data-row="${this.currentRow}"][data-col="${i}"]`);
            guess += tile.textContent;
        }
        return guess;
    }
    
    checkGuess(guess) {
        const wordArray = this.currentWord.split('');
        const guessArray = guess.split('');
        const result = new Array(this.wordLength).fill('absent');
        
        guessArray.forEach((letter, i) => {
            if (letter === wordArray[i]) {
                result[i] = 'correct';
                wordArray[i] = null;
            }
        });
        
        guessArray.forEach((letter, i) => {
            if (result[i] === 'absent') {
                const index = wordArray.indexOf(letter);
                if (index !== -1) {
                    result[i] = 'present';
                    wordArray[index] = null;
                }
            }
        });
        
        result.forEach((status, i) => {
            setTimeout(() => {
                const tile = document.querySelector(`.wordle-tile[data-row="${this.currentRow}"][data-col="${i}"]`);
                tile.classList.add(status);
                                const key = document.querySelector(`.key[data-key="${guessArray[i]}"]`);
                if (key) {
                    if (status === 'correct') {
                        key.classList.remove('present', 'absent');
                        key.classList.add('correct');
                    } else if (status === 'present' && !key.classList.contains('correct')) {
                        key.classList.remove('absent');
                        key.classList.add('present');
                    } else if (status === 'absent' && !key.classList.contains('correct') && !key.classList.contains('present')) {
                        key.classList.add('absent');
                    }
                }
            }, i * 200);
        });
    }
    
    shakeRow() {
        const row = document.querySelector(`.wordle-row[data-row="${this.currentRow}"]`);
        row.classList.add('shake');
        setTimeout(() => row.classList.remove('shake'), 500);
    }
    
    showHint() {
        if (this.hintsUsed >= this.maxHints || this.gameOver) return;
        
        this.hintsUsed++;
        const hintsRemaining = this.maxHints - this.hintsUsed;
        
        let hint = '';
        
        switch (this.hintsUsed) {
            case 1:
                hint = `💡 The word has ${this.wordLength} letters`;
                break;
            case 2:
                hint = `💡 The word starts with "${this.currentWord[0]}"`;
                break;
            case 3:
                hint = `💡 The word ends with "${this.currentWord[this.wordLength - 1]}"`;
                break;
        }
        
        if (hintsRemaining === 0) {
            hint += ' (No more hints)';
            document.getElementById('hintBtn').disabled = true;
            document.getElementById('hintBtn').style.opacity = '0.5';
        } else {
            hint += ` (${hintsRemaining} hints left)`;
        }
        
        this.wordleHints.innerHTML = `<span class="hint-text">${hint}</span>`;
    }
    
    updateMessagePreview() {
        const previewLength = Math.min(100, this.currentMessage.length);
        const preview = this.currentMessage.substring(0, previewLength);
        this.previewText.textContent = preview + (this.currentMessage.length > 100 ? '...' : '');
    }
    
    showResult(won) {
        this.resultTitle.textContent = won ? '🎉 Wonderful! 🎉' : '💕 The word was... 💕';
        this.resultTitle.className = won ? 'win' : 'lose';
        this.resultWord.textContent = this.currentWord;
        this.resultMessage.textContent = this.currentMessage;
        this.wordleResult.classList.add('show');
    }
    
    skipGame() {
        this.gameOver = true;
        this.showResult(false);
    }
    
    continueToMain() {
    this.wordleOverlay.classList.add('hidden');
    document.getElementById('mainContent').style.display = 'block';
    
    document.getElementById('wordleBoard').style.display = '';
    document.getElementById('wordleKeyboard').style.display = '';
    document.querySelector('.wordle-controls').style.display = '';
    document.getElementById('wordleHints').style.display = '';
    document.getElementById('wordleMessagePreview').style.display = '';
    document.querySelector('.wordle-subtitle').textContent = 'Guess the word that describes the message below';
    this.wordleResult.classList.remove('show');
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('wordlePlayed_' + today, 'true');
}
}

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const alreadyPlayed = localStorage.getItem('wordlePlayed_' + today);
    
    if (alreadyPlayed) {
        document.getElementById('wordleOverlay').classList.add('hidden');
        document.getElementById('mainContent').style.display = 'block';
    } else {
        document.getElementById('mainContent').style.display = 'none';
        new LoveWordle();
    }
});

document.getElementById('wordleReplayButton').addEventListener('click', function() {
    const today = new Date().toISOString().split('T')[0];
    const alreadyPlayed = localStorage.getItem('wordlePlayed_' + today);
    const storedWord = localStorage.getItem('wordleWord_' + today);
    const storedMessage = localStorage.getItem('wordleMessage_' + today);
    
    const wordleOverlay = document.getElementById('wordleOverlay');
    
    if (alreadyPlayed && storedWord && storedMessage) {
        showWordleResultOnly(storedWord, storedMessage);
    } else {
        wordleOverlay.classList.remove('hidden');
        document.getElementById('wordleResult').classList.remove('show');
        new LoveWordle();
    }
});

function showWordleResultOnly(word, message) {
    const wordleOverlay = document.getElementById('wordleOverlay');
    const wordleResult = document.getElementById('wordleResult');
    const resultTitle = document.getElementById('resultTitle');
    const resultWord = document.getElementById('resultWord');
    const resultMessage = document.getElementById('resultMessage');
    
    document.getElementById('wordleBoard').style.display = 'none';
    document.getElementById('wordleKeyboard').style.display = 'none';
    document.querySelector('.wordle-controls').style.display = 'none';
    document.getElementById('wordleHints').style.display = 'none';
    document.getElementById('wordleMessagePreview').style.display = 'none';
    
    document.querySelector('.wordle-subtitle').textContent = "Today's word was...";
    
    resultTitle.textContent = "💕 Today's Love Word 💕";
    resultTitle.className = '';
    resultWord.textContent = word;
    resultMessage.textContent = message;
    
    wordleOverlay.classList.remove('hidden');
    wordleResult.classList.add('show');
}