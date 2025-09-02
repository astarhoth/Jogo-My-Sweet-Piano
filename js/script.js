const piano = document.querySelector('.piano');
const panqueca = document.querySelector('.panqueca');

const jump = () => {
    piano.classList.add('jump');

    setTimeout(() => {
        piano.classList.remove('jump');
    }, 500);
}

loop = setInterval(() => {
     const panquecaPosition = panqueca.offsetLeft;
     const pianoPosition = +window.getComputedStyle(piano).bottom.replace('px', '');
     console.log(panquecaPosition);

     if(panquecaPosition <= 120 && panquecaPosition > 0 && pianoPosition < 80 ) {

        panqueca.style.animation = 'none';
        panqueca.style.left = `${panquecaPosition}px`;

        piano.style.animation = 'none';
        piano.style.bottom = `${pianoPosition}px`;

        piano.src = '/imagens/game-over.gif';
        piano.style.width = '150px';
        piano.style.marginLeft = "-2px";
        
        clearInterval(loop);

     }

},10);

document.addEventListener('keydown', jump);