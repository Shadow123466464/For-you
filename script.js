document.addEventListener('DOMContentLoaded', function() {
    initMainContent();
});

function initMainContent() {
    const envelopesContainer = document.querySelector('.envelopes');
    const modal = document.getElementById('letterModal');
    const letterContent = document.getElementById('letterContent');
    const galaxyAnimation = document.querySelector('.galaxy-animation');
    const body = document.body;
    let currentOpenEnvelope = null;

    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    function createEnvelopes() {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        const daysInMonth = getDaysInMonth(month, year);

        envelopesContainer.innerHTML = '';

        const shuffledLetters = [...allLoveWords].sort(() => 0.5 - Math.random());

        for (let i = 1; i <= daysInMonth; i++) {
            const envelope = document.createElement('div');
            envelope.className = 'envelope';
            envelope.innerHTML = `
                <div class="flap"></div>
                <div class="letter">❤️</div>
            `;
            envelope.dataset.day = i;
            
            const letter = shuffledLetters[(i - 1) % shuffledLetters.length];
            const randomBgIndex = Math.floor(Math.random() * backgrounds.length);
            letter.bg = backgrounds[randomBgIndex];
            envelope.dataset.letter = JSON.stringify(letter);

            envelope.addEventListener('click', () => {
                if (currentOpenEnvelope && currentOpenEnvelope !== envelope) {
                    currentOpenEnvelope.classList.remove('open');
                }
                envelope.classList.toggle('open');
                currentOpenEnvelope = envelope.classList.contains('open') ? envelope : null;
                
                if (envelope.classList.contains('open')) {
                    const letterData = JSON.parse(envelope.dataset.letter);
                    openLetter(letterData, i);
                }
            });
            
            envelopesContainer.appendChild(envelope);
        }

        showTodaysLetter();
    }

    function showTodaysLetter() {
        const today = new Date().getDate();
        const todayKey = new Date().toISOString().split('T')[0];
        const storedTodayLetter = localStorage.getItem(`todayLetter_${todayKey}`);

        if (storedTodayLetter) {
            const letter = JSON.parse(storedTodayLetter);
            openLetter(letter, today);
            const todayEnvelope = document.querySelector(`.envelope[data-day="${today}"]`);
            if (todayEnvelope) {
                todayEnvelope.classList.add('open');
                currentOpenEnvelope = todayEnvelope;
            }
        } else {
            const randomIndex = Math.floor(Math.random() * allLoveWords.length);
            const selectedLetter = allLoveWords[randomIndex];
            const randomBgIndex = Math.floor(Math.random() * backgrounds.length);
            selectedLetter.bg = backgrounds[randomBgIndex];

            localStorage.setItem(`todayLetter_${todayKey}`, JSON.stringify(selectedLetter));
            openLetter(selectedLetter, today);
            
            const todayEnvelope = document.querySelector(`.envelope[data-day="${today}"]`);
            if (todayEnvelope) {
                todayEnvelope.classList.add('open');
                currentOpenEnvelope = todayEnvelope;
            }
        }
    }

    function openLetter(letter) {
        body.style.backgroundImage = letter.bg.url;
        letterContent.innerHTML = `
            <h2>A special message for you</h2>
            <h3>${letter.word}</h3>
            <p>${letter.message}</p>
        `;
        modal.style.display = 'flex';
    }

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = 'none';
        body.style.backgroundImage = 'linear-gradient(135deg, #fff8f8 0%, #fff0f5 100%)';
        if (currentOpenEnvelope) {
            currentOpenEnvelope.classList.remove('open');
            currentOpenEnvelope = null;
        }
    });

    function createGalaxyAnimation() {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.width = `${Math.random() * 2}px`;
            star.style.height = star.style.width;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            galaxyAnimation.appendChild(star);
        }

        for (let i = 0; i < 5; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.top = `${Math.random() * 50}vh`;
            shootingStar.style.left = `${Math.random() * 100}vw`;
            shootingStar.style.width = `${Math.random() * 100 + 50}px`;
            shootingStar.style.animationDuration = `${Math.random() * 5 + 3}s`;
            shootingStar.style.animationDelay = `${Math.random() * 5}s`;
            galaxyAnimation.appendChild(shootingStar);
        }
    }

    document.getElementById('secretLetterButton').addEventListener('click', function() {
        const modal = document.getElementById('secretLetterModal');
        const textContainer = document.getElementById('secretLetterText');

        textContainer.innerHTML = '';
        textContainer.classList.remove('typewriter-container');

        modal.style.display = 'flex';

        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';

        const secretLetterContent = `This Page is created by Baheeddine Dahen to honor the one girl he loved more than anything but couldn't be with Azza.
In this message i want to explain the idea of this creation it's letters and there is a fonction that allows the number of the envelopes to be the same as the current month,
everytime you refresh the letters changes along with the special background every letter can have one of the special effects randomly
also there is wordle game included try and guess the word of the sentnce selected randomly everyday from the ones already existing (it incldes a streak and you can skip it and play it an other time if you want to just see the messages). Everytime you refresh or open the page it appears it's a daily selection.
For the reason i did that for because sometimes life can be hard and we can feel tired of everything and when you do feel like that you can open and read some to always remember that im here with you and ill do everything i could to make you smile or to prove how special you are for me and 
how much you meant because in that time i was alone without you i lost myself, i lost the joy of everything like the life became tasteless without you being around to give it colors and brighten my day
with your presence and because i was never good with words i want you to see this and know how much i care about you to create this.
            For you and only you 
Yīnwèi nǐ shì nà zhǒng zhídé bèi xiě jìn shū lǐ de nǚhái. 💕`;

        textContainer.classList.add('typewriter-container');
        textContainer.appendChild(cursor);

        let i = 0;
        const typingInterval = setInterval(function() {
            if (i < secretLetterContent.length) {
                if (secretLetterContent.charAt(i) === '\n') {
                    cursor.insertAdjacentHTML('beforebegin', '<br>');
                } else {
                    cursor.insertAdjacentHTML('beforebegin', secretLetterContent.charAt(i));
                }
                i++;
                textContainer.scrollTop = textContainer.scrollHeight;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
    });

    document.getElementById('returnButton').addEventListener('click', function() {
        document.getElementById('secretLetterModal').style.display = 'none';
    });

    createEnvelopes();
    createGalaxyAnimation();
}
