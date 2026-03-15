let fotos = [
    "../img/dublin-ireland-dublin.jpg",
    "../img/dublin2.jpg",
    "../img/dublin3.jpg",
    "../img/dublin4.jpg"
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