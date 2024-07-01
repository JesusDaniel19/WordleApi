let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let palabra;

fetch("https://random-word.ryanrk.com/api/en/word/random/?length=5")
    .then(response => response.json())
    .then(response => {
        console.log(response[0].toUpperCase());
        palabra= response[0].toUpperCase();
    })
    .catch(err => {
        let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
        palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    })
    
window.addEventListener('load', init);

function init() {
    console.log('Esto se ejecuta solo cuando se carga la pagina web');
}

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);


function intentar() {
    const INTENTO = leerIntento();
    const letras = /^[a-zA-Z]+$/;
    console.log('Intento del usuario:', INTENTO);
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!😀</h1>");
        return;
    }
    else if (!letras.test(INTENTO)) {
        let contenedor = document.getElementById('guesses');
        contenedor.innerHTML = "<h1>SOLO ESTÁN PERMITIDAS LETRAS!</h1>";
    }
    else if (INTENTO.length != 5) {
        notificacion("<h1>INGRESA UNA PALABRA DE 5 LETRAS!</h1>");
    }
    else if (INTENTO.length ==5 ) {
        notificacion("");
        for (let i = 0; i < palabra.length; i++) {
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INTENTO[i] === palabra[i]) { // VERDE
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = 'green';
            }
            else if (palabra.includes(INTENTO[i])) { // AMARILLO
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = 'yellow';
            }
            else { // GRIS
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = 'grey';
            }
            ROW.appendChild(SPAN);
        }
        intentos--;
    }
    
    GRID.appendChild(ROW);
    if (intentos == 0) {
        terminar("<h1>PERDISTE!😖</h1>");
    }
}

const input = document.getElementById("guess-input");
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.code === 13) {
        intentar();
    }
})

function leerIntento() {
    let intento = input.value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
    const GRID = document.getElementById("grid");
    GRID.innerHTML = '';
}

function notificacion(mensaje){
    const INPUT = document.getElementById("guess-input");
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
