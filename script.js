const currentPlayer = document.querySelector(".currentPlayer")

// este objeto mapeia os simbulos X E O para o caminho dos escudos 
const symbols = {
    X: "imagens/Escudo Inter.png",
    O: "imagens/Escudo gremi.png"
}

let selected; // esta array guarda as jogadas
let player = "X"; // define qual jogador inicia a partida

// esta variavel armazena as posisões possiveis para ter um ganhador
let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {
    selected = [];

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
    document.querySelectorAll(".game button").forEach((item) => {

        item.innerHTML = "";
        item.addEventListener("click", newMove);
    })
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    //e.target.innerHTML = player;
    e.target.innerHTML = `<img src="${symbols[player]}" class="shield">`;
    e.target.removeEventListener("click", newMove); // não deixa o clicar para que o jogador não possa clicar 2x no mesmo lugar 
    selected[index] = player; // Salva no array 'selected' que o jogador atual ocupou aquele índice

    // Aguarda 100ms antes de verificar o resultado para dar tempo da imagem aparecer na tela
    setTimeout(() => {
        check();
        //}, [100])
    }, 100)

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1])


    // Se todos os 9 espaços estiverem preenchidos e ninguém ganhou, dá empate
    for (pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert("o JOGADOR '" + playerLastMove + "' GANHOU!")
            init();
            return;
        }
    }
    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE!")
        init()
        return;
    }

}