// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. 
// Aquí deberás desarrollar la lógica para resolver el problema.

//Creo el arreglo (lista) listaAmigos en que se van a almacenar los nombres que voy ingresando 
let listaAmigos = [];

//Se asegura de que el código dentro de la función solo se ejecute cuando el DOM (Document Object Model) 
// haya sido completamente cargado.
document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("amigo").addEventListener("input", convertirAMayusculas);
    document.querySelector(".button-add").addEventListener("click", agregarAmigo);
    document.querySelector(".button-draw").addEventListener("click", sortearAmigo);
    document.querySelector(".button-reset").addEventListener("click", nuevoSorteo);
    actualizarEstadoBotones();
});

function actualizarEstadoBotones() {
    document.querySelector(".button-add").disabled = false;
    document.querySelector(".button-draw").disabled = listaAmigos.length < 2;
    document.querySelector(".button-reset").disabled = listaAmigos.length === 0;
}

function convertirAMayusculas() {
    const campoNombre = document.getElementById("amigo");
    campoNombre.value = campoNombre.value.toUpperCase();
}

function agregarAmigo(event) {
    event.preventDefault();

    const campoNombre = document.getElementById("amigo");
    let nombreAmigoSecreto = campoNombre.value.trim();

    if (!validarNombre(nombreAmigoSecreto)) return;

    listaAmigos.push(nombreAmigoSecreto);
    console.log("Nombre válido:", nombreAmigoSecreto);

    const lista = document.getElementById("listaAmigos");
    let li = document.createElement("li");
    li.textContent = nombreAmigoSecreto;
    lista.appendChild(li);

    campoNombre.value = "";
    campoNombre.focus();
    actualizarEstadoBotones();
}

function validarNombre(nombre) {
    if (nombre === "") {
        mostrarAlerta("¡Atención!", "Por favor, inserte un nombre.", "warning");
        return false;
    }

    const soloLetras = /^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]+$/;
    if (!soloLetras.test(nombre)) {
        mostrarAlerta("Nombre no válido", "El nombre solo puede contener letras y espacios.", "error");
        return false;
    }

    if (nombre.length < 2 || nombre.length > 30) {
        mostrarAlerta("¡Atención!", "El nombre debe tener entre 2 y 30 caracteres.", "warning");
        return false;
    }

    if (listaAmigos.includes(nombre)) {
        mostrarAlerta("¡Atención!", "El nombre ya existe.", "warning");
        return false;
    }

    return true;
}

function mostrarAlerta(titulo, texto, icono) {
    Swal.fire({ title: titulo, text: texto, icon: icono, confirmButtonText: "OK" });
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        mostrarAlerta("¡Atención!", "Debe haber al menos 2 amigos para realizar el sorteo.", "warning");
        return;
    }

    let listaMezclada = [...listaAmigos].sort(() => Math.random() - 0.5);
    let resultado = listaMezclada.map((amigo, i) => `${amigo} ➔ ${listaMezclada[(i + 1) % listaMezclada.length]}`);

    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = resultado.map(item => `<li>${item}</li>`).join('');
}

function nuevoSorteo() {
    listaAmigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("amigo").value = "";
    
    mostrarAlerta("¡Listo!", "Puedes comenzar un nuevo sorteo.", "success");
    actualizarEstadoBotones();
}