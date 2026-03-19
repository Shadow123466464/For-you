let currentWordleGame = null;

const wordHints = {
    "DEVOTION": "A feeling of strong love and loyalty",
    "PASSION": "An intense emotion or strong feeling",
    "TENDERNESS": "Gentleness and kindness in expressing love",
    "ADORATION": "Deep love and respect for someone",
    "ROMANCE": "A feeling of excitement associated with love",
    "AFFECTION": "A gentle feeling of fondness or liking",
    "INTIMACY": "Close familiarity or closeness between people",
    "DESIRE": "A strong feeling of wanting something or someone",
    "COMFORT": "A state of physical ease and freedom from worry",
    "TRUST": "Firm belief in the reliability of someone",
    "LONGING": "A yearning desire for something or someone",
    "JOY": "A feeling of great pleasure and happiness",
    "HATE": "A feeling the opposite of love",
    "HOPE": "A feeling of expectation for something positive",
    "SERENITY": "The state of being calm and peaceful",
    "BELONGING": "The feeling of being accepted and fitting in",
    "CHERISH": "To hold someone dear and protect lovingly",
    "ENCHANTMENT": "A feeling of being delighted or captivated",
    "WHISPER": "A soft spoken word or secret message",
    "PROMISE": "A declaration that something will happen",
    "DREAM": "A cherished aspiration or vision of the future",
    "HEARTBEAT": "The rhythm of the heart, symbolizing life and love",
    "SURRENDER": "To give oneself over completely to something",
    "ETERNITY": "Infinite or unending time",
    "SACRIFICE": "Giving up something precious for another",
    "FIDELITY": "Faithfulness to a person or commitment",
    "PASSIONATE": "Showing or caused by strong feelings",
    "TENDER": "Showing gentleness and concern",
    "DEVOTED": "Very loving and loyal",
    "ENAMORED": "Filled with love and admiration",
    "YEARNING": "A deep longing for something",
    "RAPTURE": "A feeling of intense pleasure or joy",
    "ADMIRE": "To regard with respect and warm approval",
    "CARING": "Displaying kindness and concern for others",
    "ENDEARMENT": "A word or phrase expressing affection",
    "FONDNESS": "Affection or liking for someone",
    "INFATUATION": "An intense but short-lived passion",
    "LOYALTY": "A strong feeling of support or allegiance",
    "ARDOR": "Enthusiasm or passion",
    "AFFINITY": "A natural liking or attraction to someone",
    "ROMANTIC": "Conducive to or characterized by romance",
    "SINCERITY": "The quality of being genuine and honest",
    "ATTRACTION": "The action or power of drawing someone closer",
    "COMPANIONSHIP": "The state of having a companion or friend",
    "EMPATHY": "The ability to understand another's feelings",
    "KINDNESS": "The quality of being friendly and considerate",
    "RESPECT": "A feeling of admiration for someone",
    "SUPPORT": "To give assistance and encouragement",
    "UNDERSTANDING": "Sympathetic awareness of others' feelings",
    "PATIENCE": "The capacity to accept delay without frustration",
    "COMPASSION": "Sympathetic concern for others' suffering",
    "ENCOURAGEMENT": "Words or actions that give support and confidence",
    "GRATITUDE": "The quality of being thankful",
    "HOPEFULNESS": "A feeling of optimism about the future",
    "CONTENTMENT": "A state of happiness and satisfaction",
    "JOYFULNESS": "The quality of being full of joy",
    "REASSURANCE": "Words that remove doubts and fears",
    "SOLACE": "Comfort in a time of distress",
    "TRANQUILITY": "A state of peace and calm",
    "WARMTH": "A feeling of affection and friendliness",
    "ACCEPTANCE": "The act of receiving someone willingly",
    "ADMIRATION": "Respect and warm approval",
    "AFFECTIONATE": "Readily feeling or showing fondness",
    "AMITY": "A friendly relationship between people",
    "BOND": "A connection or tie between people",
    "CHARITY": "Kindness and tolerance toward others",
    "CLOSENESS": "The state of being near in relationship",
    "COMFORTING": "Serving to alleviate grief or distress",
    "CONNECTION": "A relationship between people",
    "DELIGHT": "Great pleasure and enjoyment",
    "ENDEARING": "Inspiring affection",
    "FOND": "Having affection for someone",
    "GENTLE": "Mild and kind in manner",
    "HARMONY": "Agreement and peaceful coexistence",
    "INSPIRATION": "The process of being mentally stimulated",
    "KINDRED": "Similar in spirit or character",
    "LOYAL": "Giving constant support to someone",
    "NURTURING": "Caring for and encouraging growth",
    "REVERENCE": "Deep respect for someone",
    "SECURITY": "The state of feeling safe and protected",
    "SYMPATHY": "Feelings of pity for someone's misfortune",
    "TRUSTING": "Having faith in someone's reliability",
    "UNITY": "The state of being united as a whole",
    "STRENGTH": "The quality of being strong",
    "RESILIENCE": "The ability to recover from difficulties",
    "LIGHT": "Something that illuminates darkness",
    "COURAGE": "The ability to face fear or difficulty",
    "REST": "A period of relaxation",
    "GROWTH": "The process of developing",
    "BREATHE": "To take air into the lungs",
    "PERSPECTIVE": "A particular way of viewing things",
    "PROGRESS": "Forward movement toward a goal",
    "WORTH": "The value or quality of something",
    "HEALING": "The process of becoming healthy again",
    "PRESENCE": "The state of being in a place",
    "RELEASE": "To let go of something",
    "PERMISSION": "Authorization to do something",
    "LIGHTNESS": "The quality of being light or carefree",
    "SPACE": "Room to exist or move freely",
    "GROUNDED": "Stable and sensible",
    "POSSIBILITY": "A thing that may happen",
    "VOICE": "The sound produced in speaking",
    "RESTORATION": "The act of bringing back to original state",
    "GENTLENESS": "The quality of being kind and tender",
    "FAITH": "Complete trust or confidence",
    "CLARITY": "The quality of being clear",
    "REFUGE": "A place of shelter and safety",
    "PURPOSE": "The reason for which something exists",
    "CALM": "A peaceful state free from disturbance",
    "JOURNEY": "An act of traveling from one place to another",
    "NURTURE": "To care for and encourage growth",
    "BELIEF": "Trust or confidence in something",
    "STILLNESS": "The absence of movement or sound",
    "RENEWAL": "The act of making something new again",
    "SAFE": "Protected from danger or harm",
    "BRAVE": "Ready to face danger or pain",
    "PEACE": "Freedom from disturbance",
    "FEARLESS": "Lacking fear in the face of danger",
    "FIERCE": "Having a powerful and intense quality",
    "DEFIANT": "Showing bold resistance",
    "VULNERABLE": "Open to emotional exposure",
    "CONSUME": "To absorb or take in completely",
    "UNWORTHY": "Not deserving of something",
    "OBSESSION": "An idea that constantly occupies the mind",
    "CHAOS": "Complete disorder and confusion",
    "TORMENT": "Severe physical or mental suffering",
    "REDEMPTION": "The act of being saved from sin or error",
    "INEVITABLE": "Certain to happen; unavoidable",
    "CONQUER": "To overcome and take control",
    "BETRAYAL": "The act of being disloyal",
    "VENGEANCE": "Punishment inflicted for a wrong",
    "THRONE": "A ceremonial seat of power",
    "WICKED": "Evil or morally wrong",
    "ACHE": "A continuous dull pain",
    "ETERNAL": "Lasting forever; infinite",
    "DARKNESS": "The absence of light",
    "SALVATION": "Deliverance from harm or ruin",
    "WINGS": "Appendages used for flying; freedom",
    "STARLIGHT": "The light from the stars",
    "MATE": "A partner or companion",
    "WORTHY": "Deserving respect or attention",
    "FREEDOM": "The state of being free",
    "REBIRTH": "A new beginning or revival",
    "NIGHT": "The period of darkness between days",
    "COURT": "A place where justice is administered",
    "DREAMS": "A series of images during sleep; aspirations",
    "IMMORTAL": "Living forever; never dying",
    "POWER": "The ability to do something",
    "SHIELD": "A protective barrier",
    "STARS": "Luminous points in the night sky",
    "SURVIVE": "To continue to live despite hardship",
    "VELARIS": "A hidden city of dreams",
    "CROWN": "A circular ornament worn on the head",
    "WARRIOR": "A brave fighter",
    "CROWS": "Black birds; symbols of mystery",
    "SAINTS": "Holy or virtuous people",
    "GLOVES": "Hand coverings; barriers to touch",
    "WRAITH": "A ghost or spirit",
    "KNIVES": "Sharp cutting instruments",
    "HARBOR": "A place of shelter",
    "BARREL": "A cylindrical container",
    "CROW": "A black bird",
    "TOUCH": "Physical contact between people",
    "SPIDER": "An eight-legged creature that weaves webs",
    "MIRACLE": "An extraordinary event",
    "KETTERDAM": "A city of thieves and dreamers",
    "LOCK": "A device for securing something",
    "SHIPS": "Large vessels for water travel",
    "REVENGE": "Retaliation for a wrong",
    "DREGS": "The least valuable part of something",
    "SILENCE": "Complete absence of sound",
    "GHOST": "The spirit of a dead person",
    "PATROCLUS": "A beloved companion from Greek mythology",
    "GLORY": "High renown or honor",
    "PHTHIA": "A homeland in Greek mythology",
    "LYRE": "A stringed musical instrument",
    "TROY": "An ancient city of legend",
    "GOLDEN": "Made of or resembling gold",
    "PROPHECY": "A prediction of the future",
    "BELOVED": "Dearly loved",
    "TOGETHER": "In the same place or at the same time",
    "HERO": "A person admired for courage",
    "MORTAL": "Subject to death",
    "ASHES": "The remains after burning",
    "SWIFT": "Moving or capable of moving quickly",
    "FATE": "The development of events beyond control",
    "MUSIC": "Vocal or instrumental sounds",
    "SEA": "The expanse of salt water",
    "MEMORY": "The faculty of remembering",
    "PRIDE": "A feeling of deep pleasure from achievements",
    "PREJUDICE": "Preconceived opinion not based on reason",
    "PEMBERLEY": "A grand estate; symbol of love",
    "ARDENTLY": "With intense feeling or passion",
    "TOLERABLE": "Able to be endured",
    "STUBBORN": "Refusing to change one's mind",
    "BENNETT": "A family name; symbol of sisterhood",
    "DANCING": "Moving rhythmically to music",
    "WALK": "To move at a regular pace",
    "LETTERS": "Written messages",
    "ESTATE": "An extensive area of land",
    "RAIN": "Water falling from clouds",
    "SISTER": "A female sibling",
    "EYES": "Organs of sight",
    "NETHERFIELD": "An estate; a place of encounter",
    "PLAIN": "Simple and unadorned",
    "EQUAL": "Being the same in value or status",
    "SOUL": "The spiritual part of a person",
    "FIRE": "Combustion producing heat and light",
    "READER": "One who reads",
    "THORNFIELD": "A place of secrets and love",
    "MAD": "Mentally ill or extremely foolish",
    "RETURN": "To come or go back",
    "STRANGE": "Unusual or surprising",
    "INDEPENDENT": "Free from outside control",
    "MOOR": "An open area of wild land",
    "SIMPLE": "Easily understood or done",
    "HEART": "The organ that pumps blood; center of emotion",
    "TRUTH": "The quality of being true",
    "CIRCUS": "A traveling show with performers",
    "MAGIC": "The power of influencing events",
    "GAME": "A form of play or competition",
    "TENT": "A portable shelter",
    "MIDNIGHT": "Twelve o'clock at night",
    "TIME": "The indefinite continued progress of existence",
    "WONDER": "A feeling of amazement",
    "BLACK": "The darkest color",
    "WHITE": "The lightest color",
    "BONFIRE": "A large outdoor fire",
    "REVERIE": "A state of dreamy meditation",
    "HEATHCLIFF": "A passionate soul from the moors",
    "MOORS": "Wild open lands",
    "HAUNTED": "Visited by ghosts; troubled",
    "WILD": "Uncontrolled or unrestrained",
    "STORM": "A violent weather disturbance",
    "WINDOW": "An opening in a wall",
    "HEATH": "An area of open uncultivated land",
    "SUMMER": "The warmest season",
    "BOAT": "A small vessel for water travel",
    "HOUSE": "A building for living in",
    "REMEMBER": "To recall to mind",
    "FOREVER": "For all future time",
    "DANCE": "To move rhythmically",
    "ALZHEIMER": "A disease affecting memory",
    "TOMORROW": "The day after today",
    "ANCHOR": "A device to secure a ship; stability",
    "RAINBOW": "An arc of colors in the sky",
    "PHOENIX": "A bird reborn from ashes",
    "BLOOM": "To produce flowers; to flourish",
    "MOUNTAIN": "A large natural elevation",
    "OCEAN": "A vast body of salt water",
    "BUTTERFLY": "An insect with colorful wings",
    "SUNRISE": "The time when the sun rises",
    "MOONLIGHT": "The light from the moon",
    "GARDEN": "A piece of ground for growing plants",
    "RIVER": "A large natural stream of water",
    "TREE": "A woody perennial plant",
    "HOME": "A place where one lives",
    "TREASURE": "A quantity of precious things",
    "SPARK": "A small fiery particle",
    "MELODY": "A sequence of musical notes",
    "CANVAS": "A surface for painting",
    "SUNSHINE": "Direct sunlight",
    "DIAMOND": "A precious gemstone",
    "SEED": "A plant's unit of reproduction",
    "BRIDGE": "A structure spanning an obstacle",
    "CASTLE": "A large fortified building",
    "LIGHTHOUSE": "A tower with a light for ships",
    "PUZZLE": "A game testing ingenuity",
    "DAWN": "The first appearance of light",
    "PATH": "A way or track",
    "FEATHER": "A bird's plumage",
    "ECHO": "A repeated sound",
    "WIND": "Moving air",
    "FOREST": "A large area of trees",
    "FLAME": "A hot glowing body of ignited gas",
    "NARNIA": "A magical land of wonder",
    "HOBBIT": "A small fictional creature",
    "POTTER": "A maker of pottery; a famous wizard",
    "WIZARD": "A person with magical powers",
    "GANDALF": "A wise wizard guide",
    "FRODO": "A brave hobbit on a quest",
    "ASLAN": "A noble lion; symbol of goodness",
    "HERMIONE": "A clever and brave witch",
    "DOBBY": "A loyal house-elf",
    "LUNA": "The moon; a dreamy person",
    "SNAPE": "A complex character with hidden love",
    "PATRONUS": "A guardian of light against darkness",
    "MARAUDER": "One who raids and plunders",
    "ELDERFLOWER": "A fragrant flowering plant",
    "MIRROR": "A reflective surface",
    "QUIDDITCH": "A magical sport on broomsticks",
    "PLATFORM": "A raised surface; a starting point",
    "WAND": "A thin stick used for magic",
    "CLOAK": "A loose outer garment",
    "BOSOM": "The breast; close friendship",
    "SCOPE": "The extent of one's perception",
    "GILBERT": "A devoted admirer",
    "CRICKET": "An insect; a sport",
    "FAIRY": "A small magical being",
    "NEVERLAND": "A place where you never grow old",
    "WENDY": "A caring and adventurous spirit",
    "LOST": "Unable to find one's way",
    "VELVET": "A soft luxurious fabric",
    "RABBIT": "A small furry mammal",
    "NURSERY": "A room for young children",
    "SKIN": "The outer covering of the body"
};

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
        this.messagePreview = document.getElementById('wordleMessagePreview');
        
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
        
        currentWordleGame = this;
        
        this.init();
    }
    
    init() {
        this.selectRandomWord();
        this.createBoard();
        this.createKeyboard();
        this.setupEventListeners();
        this.hideMessagePreview();
        this.resetHintButton();
    }
    
    hideMessagePreview() {
        if (this.messagePreview) {
            this.messagePreview.style.display = 'none';
        }
    }
    
    resetHintButton() {
        const hintBtn = document.getElementById('hintBtn');
        hintBtn.disabled = false;
        hintBtn.style.opacity = '1';
        this.wordleHints.innerHTML = '';
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
                
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleKeyPress(key);
                });
                rowDiv.appendChild(button);
            });
            
            this.wordleKeyboard.appendChild(rowDiv);
        });
    }
    
    setupEventListeners() {
        const hintBtn = document.getElementById('hintBtn');
        const newHintBtn = hintBtn.cloneNode(true);
        hintBtn.parentNode.replaceChild(newHintBtn, hintBtn);
        newHintBtn.addEventListener('click', () => this.showHint());
        
        const skipBtn = document.getElementById('skipBtn');
        const newSkipBtn = skipBtn.cloneNode(true);
        skipBtn.parentNode.replaceChild(newSkipBtn, skipBtn);
        newSkipBtn.addEventListener('click', () => this.skipGame());
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
    
    getWordDescription() {
        if (wordHints[this.currentWord]) {
            return wordHints[this.currentWord];
        }
        
        const word = this.currentWord.toLowerCase();
        
        if (word.includes('love') || word.includes('heart')) {
            return "Related to feelings of deep affection";
        } else if (word.includes('hope') || word.includes('dream')) {
            return "Related to wishes and aspirations";
        } else if (word.includes('peace') || word.includes('calm')) {
            return "Related to tranquility and serenity";
        } else if (word.includes('strong') || word.includes('brave')) {
            return "Related to courage and strength";
        } else {
            return "A word connected to love or comfort";
        }
    }
    
    showHint() {
        if (this.hintsUsed >= this.maxHints || this.gameOver) return;
        
        this.hintsUsed++;
        const hintsRemaining = this.maxHints - this.hintsUsed;
        
        let hint = '';
        
        switch (this.hintsUsed) {
            case 1:
                const description = this.getWordDescription();
                hint = `💡 ${description}`;
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
}

function handleGlobalKeydown(e) {
    const wordleOverlay = document.getElementById('wordleOverlay');
    
    if (!wordleOverlay || wordleOverlay.classList.contains('hidden')) return;
    if (!currentWordleGame || currentWordleGame.gameOver) return;
    
    if (e.key === 'Enter' || e.key === 'Backspace' || /^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
    }
    
    if (e.key === 'Enter') {
        currentWordleGame.handleKeyPress('ENTER');
    } else if (e.key === 'Backspace') {
        currentWordleGame.handleKeyPress('⌫');
    } else if (/^[a-zA-Z]$/.test(e.key)) {
        currentWordleGame.handleKeyPress(e.key.toUpperCase());
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    document.addEventListener('keydown', handleGlobalKeydown);
    
    const today = new Date().toISOString().split('T')[0];
    const alreadyPlayed = localStorage.getItem('wordlePlayed_' + today);
    
    if (alreadyPlayed) {
        document.getElementById('wordleOverlay').classList.add('hidden');
        document.getElementById('mainContent').style.display = 'block';
    } else {
        document.getElementById('mainContent').style.display = 'none';
        new LoveWordle();
    }
    
    document.getElementById('continueBtn').addEventListener('click', function() {
        const wordleOverlay = document.getElementById('wordleOverlay');
        const mainContent = document.getElementById('mainContent');
        
        wordleOverlay.classList.add('hidden');
        mainContent.style.display = 'block';
        
        document.getElementById('wordleBoard').style.display = '';
        document.getElementById('wordleKeyboard').style.display = '';
        document.querySelector('.wordle-controls').style.display = '';
        document.getElementById('wordleHints').style.display = '';
        document.getElementById('wordleMessagePreview').style.display = 'none';
        document.querySelector('.wordle-subtitle').textContent = 'Guess the word that describes the message below';
        document.getElementById('wordleResult').classList.remove('show');
        
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('wordlePlayed_' + today, 'true');
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
            
            document.getElementById('wordleBoard').style.display = '';
            document.getElementById('wordleKeyboard').style.display = '';
            document.querySelector('.wordle-controls').style.display = '';
            document.getElementById('wordleHints').style.display = '';
            document.getElementById('wordleMessagePreview').style.display = 'none';
            document.querySelector('.wordle-subtitle').textContent = 'Guess the word that describes the message below';
            
            new LoveWordle();
        }
    });
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
