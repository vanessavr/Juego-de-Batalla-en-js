let saludJugador = 100;
let saludEnemigo = 100;
let esTurnoJugador = false;
let ataqueSeleccionado; 
let defensaSeleccionada; 

function IniciarJuego() {
    esTurnoJugador = Math.random() < 0.5;
    displayTurnMessage();
    actualizarSaludJugador(saludJugador);
    actualizarSaludEnemigo(saludEnemigo);
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
}

function atacar() {
    if (!ataqueSeleccionado && esTurnoJugador) {
        displayGameMessage("Debes seleccionar un tipo de ataque");
        return;
    }

    const ataqueJugador = ataqueSeleccionado;
    const defensaEnemigo = obtenerDefensaAleatoria();

    const daño = calcularDaño(ataqueJugador, defensaEnemigo);
    const nuevaSaludEnemigo = Math.max(0, saludEnemigo - daño);

    displayBattleMessage(`Has atacado con ${ataqueJugador}. El enemigo se defendió con ${defensaEnemigo}. Has infligido ${daño} de daño.`);
    actualizarSaludEnemigo(nuevaSaludEnemigo);

    if (nuevaSaludEnemigo <= 0) {
        displayBattleMessage("¡Has ganado! El enemigo ha sido derrotado.");
        reiniciarJuego();
    } else {
        esTurnoJugador = false;
        displayTurnMessage();
    }
}

function reiniciarJuego() {
    setTimeout(function () {
        window.location.href = 'index.html';
    }, 3000);
}

function defender() {
    if (!defensaSeleccionada && esTurnoJugador) {
        displayGameMessage("Debes seleccionar un tipo de defensa");
        return;
    }

    const defensaJugador = defensaSeleccionada;
    const ataqueEnemigo = obtenerAtaqueAleatorio();

    const daño = calcularDaño(ataqueEnemigo, defensaJugador);
    const nuevaSaludJugador = Math.max(0, saludJugador - daño);

    displayBattleMessage(`El enemigo te ha atacado con ${ataqueEnemigo}. Te has defendido con ${defensaJugador}. Has recibido ${daño} de daño.`);
    actualizarSaludJugador(nuevaSaludJugador);

    if (nuevaSaludJugador <= 0) {
        displayBattleMessage("¡Has perdido! Tu personaje ha sido derrotado.");
        reiniciarJuego();
    } else {
        esTurnoJugador = true;
        displayTurnMessage();
    }
}

function calcularDaño(ataque, defensa) {
    const mapaDano = {
        'agua': { 'agua': 10, 'fuego': 20, 'roca': 0 },
        'roca': { 'agua': 0, 'fuego': 10, 'roca': 20 },
        'fuego': { 'agua': 20, 'fuego': 0, 'roca': 10 }
    };

    return mapaDano[ataque][defensa];
}

function seleccionarAtaque(tipo) {
    ataqueSeleccionado = tipo;
    displayGameMessage(`Has seleccionado el ataque: ${tipo}`);
    atacar();
}

function seleccionarDefensa(tipo) {
    defensaSeleccionada = tipo;
    displayGameMessage(`Has seleccionado la defensa: ${tipo}`);
    defender();
}

function obtenerAtaqueAleatorio() {
    const ataquesEnemigo = ['fuego', 'roca', 'agua'];
    return ataquesEnemigo[Math.floor(Math.random() * ataquesEnemigo.length)];
}

function obtenerDefensaAleatoria() {
    const defensasEnemigo = ['fuego', 'roca', 'agua'];
    return defensasEnemigo[Math.floor(Math.random() * defensasEnemigo.length)];
}

function actualizarSaludJugador(nuevaSalud) {
    saludJugador = nuevaSalud;
    const elementoSaludJugador = document.getElementById('player-health');
    let posicionImagen = '0px';

    if (saludJugador >= 81 && saludJugador <= 100) {
        posicionImagen = '0px';
    } else if (saludJugador >= 61 && saludJugador <= 80) {
        posicionImagen = '-55px';
    } else if (saludJugador >= 41 && saludJugador <= 60) {
        posicionImagen = '-110px';
    } else if (saludJugador >= 21 && saludJugador <= 40) {
        posicionImagen = '-172px';
    } else if (saludJugador >= 1 && saludJugador <= 20) {
        posicionImagen = '-232px';
    } else if (saludJugador == 0) {
        posicionImagen = '-285px';
    }

    elementoSaludJugador.style.backgroundPosition = '0 ' + posicionImagen;
}

function actualizarSaludEnemigo(nuevaSalud) {
    saludEnemigo = nuevaSalud;
    const elementoSaludEnemigo = document.getElementById('enemy-health');
    let posicionImagen = '0px';

    if (saludEnemigo >= 81 && saludEnemigo <= 100) {
        posicionImagen = '0px';
    } else if (saludEnemigo >= 61 && saludEnemigo <= 80) {
        posicionImagen = '-59px';
    } else if (saludEnemigo >= 41 && saludEnemigo <= 60) {
        posicionImagen = '-123px';
    } else if (saludEnemigo >= 21 && saludEnemigo <= 40) {
        posicionImagen = '-188px';
    } else if (saludEnemigo >= 1 && saludEnemigo <= 20) {
        posicionImagen = '-252px';
    } else if (saludEnemigo == 0) {
        posicionImagen = '-311px';
    }

    elementoSaludEnemigo.style.backgroundPosition = '0 ' + posicionImagen;
}

function displayTurnMessage() {
    if (esTurnoJugador) {
        displayGameMessage("Es tu turno de atacar");
        document.getElementById('attack-options').style.display = 'flex';
        document.getElementById('defense-options').style.display = 'none';
    } else {
        displayGameMessage("Es el turno del enemigo de atacar");
        document.getElementById('attack-options').style.display = 'none';
        document.getElementById('defense-options').style.display = 'flex';
    }
}

function displayGameMessage(mensaje) {
    const contenedorMensaje = document.getElementById('game-message');
    contenedorMensaje.textContent = mensaje;
}

function displayBattleMessage(mensaje) {
    const contenedorMensaje = document.getElementById('battle-message');
    contenedorMensaje.textContent = mensaje;
}
