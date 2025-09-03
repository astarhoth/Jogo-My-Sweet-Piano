const piano = document.querySelector('.piano');
const panqueca = document.querySelector('.panqueca');   
let loop = null;



// Função para fazer o piano pular

const jump = () => {
    if (!piano.classList.contains('jump')) {
        piano.classList.add('jump');
        setTimeout(() => {
            piano.classList.remove('jump');
        }, 500);
    }
};

document.addEventListener('keydown', jump);

// Inicia o jogo ao clicar no botão de iniciar

document.getElementById('start-button').addEventListener('click', () => {
    document.querySelector('.inicio').style.display = 'none';

    panqueca.classList.add('running');
    
    piano.src = '/imagens/piano.gif';
    piano.style.width = '150px';
    piano.style.marginLeft = '0px';

    if (loop) clearInterval(loop);

    loop = setInterval(() => {
        const panquecaPosition = panqueca.offsetLeft;
        const pianoPosition = +window.getComputedStyle(piano).bottom.replace('px', '');

        if (panquecaPosition <= 120 && panquecaPosition > 0 && pianoPosition < 80) {
            // Game Over 
            panqueca.style.animation = 'none';

            panqueca.style.left = `${panquecaPosition}px`;


            piano.style.animation = 'none';
            piano.style.bottom = `${pianoPosition}px`;

            piano.src = '/imagens/game-over.gif';
            piano.style.width = '150px';
            piano.style.marginLeft = "-2px";

            

            clearInterval(loop);
        }
    }, 10);
});




// Adiciona som ao pular
const jumpSound = new Audio('/sons/pulo.mp3');
document.addEventListener('keydown', () => {
    jumpSound.play();
});

// Adiciona som ao iniciar o jogo
const startSound = new Audio('/sons/game-start.mp3');
document.getElementById('start-button').addEventListener('click', () => {
    startSound.play();
}); 

// Adiciona som ao game over

const gameOverSound = new Audio('/sons/game-over.mp3');
let gameOverPlayed = false; 
setInterval(() => {
    if (piano.src.includes('game-over.gif') && !gameOverPlayed) {
        gameOverSound.play();
        document.querySelector('.game-over').style.display = 'block';
        gameOverPlayed = true; 
    }
}, 100);





// Reinicia o jogo ao clicar no botão de reiniciar
document.getElementById('reset-button').addEventListener('click', () => {
    document.location.reload(true);
});

// Adiciona sistema de pontuação
let score = 0;
const scoreElement = document.getElementById('score'); 
setInterval(() => {
    if (scoreInterval) clearInterval(scoreInterval);
    scoreInterval = setInterval(() => {
        score++;
        scoreElement.textContent = score;
    }, 1000);
}); 

// Reseta a pontuação ao reiniciar o jogo
document.getElementById('reset-button').addEventListener('click', () => {
    score = 0;
    scoreElement.textContent = score;

});
// Incrementa a pontuação ao pular sobre a panqueca
setInterval(() => {
    const panquecaPosition = panqueca.offsetLeft;
    const pianoPosition = +window.getComputedStyle(piano).bottom.replace('px', '');

    if (panquecaPosition <= 120 && panquecaPosition > 0 && pianoPosition >= 80) {
        score += 1;
        scoreElement.textContent = score;
    }
}, 100);

// Histórico de pontuação mais alta
let highScore = localStorage.getItem('highScore') || 0;
const highScoreElement = document.createElement('h2');
highScoreElement.textContent = `High Score: ${highScore}`;
document.querySelector('.coitainer-score').appendChild(highScoreElement); 
setInterval(() => {
    if (score > highScore) {
        highScore = score; 
        highScoreElement.textContent = `High Score: ${highScore}`;
        localStorage.setItem('highScore', highScore);
    }
}, 1000);