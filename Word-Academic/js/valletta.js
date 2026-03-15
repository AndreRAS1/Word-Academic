let fotos = [
    "../img/valletta.jpg",
    "../img/valletta2.jpg",
    "../img/valletta3.jpg",
    "../img/valletta4.jpg"
];

let index = 0;

function mudarFoto(direcao) {
    index += direcao;

    if (index < 0) {
        index = fotos.length - 1;
    }

    if (index >= fotos.length) {
        index = 0;
    }

    document.getElementById("fotoPrincipal").src = fotos[index];
}