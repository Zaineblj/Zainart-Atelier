document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game');
    const timerDisplay = document.querySelector('.timer');
    const emailInput = document.querySelector('.email-input');
    const sendButton = document.querySelector('.send-button');
    const messageDisplay = document.querySelector('.message');
    const messageContainer = document.querySelector('.message-container'); // Ajout de cette ligne

    const images = [
        'media 4/DECO.jpg', 'media 4/DECO.jpg',
        'media 4/moi en train de peindre.jpg', 'media 4/moi en train de peindre.jpg',
        'media 4/artist1.jpg', 'media 4/artist1.jpg',
        'media 4/woman.jpg', 'media 4/woman.jpg'
    ];

    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedCards = 0;
    let timer;
    let timeLeft = 30;

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createCard(image) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${image}" class="front" alt="Memory Card">
            <img src="moi/IMG-20240511-WA0072.jpg" class="back" alt="Memory Card Back">
        `;
        card.addEventListener('click', flipCard);
        return card;
    }

    function setupBoard() {
        shuffle(images);
        gameContainer.innerHTML = '';
        images.forEach(image => {
            gameContainer.appendChild(createCard(image));
        });
        startTimer();
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.querySelector('.front').src === secondCard.querySelector('.front').src;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedCards += 2;
        resetBoard();
        if (matchedCards === images.length) {
            handleWin();
        }
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft === 0) {
                handleLoss();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function handleWin() {
        stopTimer();
        messageDisplay.textContent = 'Congrats! You won!';
        emailInput.style.display = 'block';
        sendButton.style.display = 'block';
        messageContainer.style.display = 'block'; // Affiche le conteneur de message
    }

    function handleLoss() {
        stopTimer();
        messageDisplay.textContent = "Oops, it's okay :/";
        messageContainer.style.display = 'block'; // Affiche le conteneur de message
        setTimeout(() => {
            window.location.href = 'index4.html';
        }, 6000);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Ajoutez un gestionnaire d'événement pour le clic sur le bouton Envoyer
    sendButton.addEventListener('click', () => {
        // Récupérez l'adresse e-mail saisie par l'utilisateur
        const email = emailInput.value;

        if (validateEmail(email)) {
            messageDisplay.textContent = 'Email valid. Thank you!';
            messageDisplay.style.color = 'white';
            messageDisplay.style.fontSize = '12px'; // Définit la taille du texte à 16 pixels


            // Redirigez l'utilisateur vers la page d'accueil après 6 secondes
            setTimeout(() => {
                window.location.href = 'index4.html';
            }, 6000);
        } else {
            messageDisplay.textContent = 'Invalid email address. Please try again.';
            messageDisplay.style.color = 'orange';
            messageDisplay.style.fontSize = '12px'; // Définit la taille du texte à 16 pixels
        }
    });

    setupBoard();
});
