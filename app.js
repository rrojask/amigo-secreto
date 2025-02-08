// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. 
// Aquí deberás desarrollar la lógica para resolver el problema.

//Creo el arreglo (lista) listaAmigos en que se van a almacenar los nombres que voy ingresando 
let listaAmigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    let nombreAmigoSecreto = input.value.trim();

    
    //Verifica que el campo no este vacío
    if (nombreAmigoSecreto === "") {
        alert("Por favor, inserte un nombre.");
        input.focus();
        return;
    }

    //Valida solo letras y espacios para nombre compuesto (Ej. Juan Carlos)
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetras.test(nombreAmigoSecreto)) {
        alert("El nombre solo puede contener letras y espacios.");
        input.focus();
        return;
    }

    // Nombre de longitud 2 a 30 caracteres máximo
    if (nombreAmigoSecreto.length < 2 || nombreAmigoSecreto.length > 30) {
        alert("El nombre debe tener entre 2 y 30 caracteres.");
        input.focus();
        return;
    }

    // Verifica nombres duplicados
    if (listaAmigos.includes(nombreAmigoSecreto)) {
        alert("El nombre ya existe.");
        return;
    }

    //Agrega un nuevo nombre a la lista 
    listaAmigos.push(nombreAmigoSecreto);
    console.log("Nombre válido:", nombreAmigoSecreto);

    // Mostrar en la interfaz
    const lista = document.getElementById("listaAmigos");
    let li = document.createElement("li");
    li.textContent = nombreAmigoSecreto;
    lista.appendChild(li);

    input.value = ""; // Limpiar el input después de agregar el nombre
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Debe haber al menos 2 amigos para realizar el sorteo.");
        return;
    }

    // Mezclar la lista de amigos
    let listaMezclada = listaAmigos.slice().sort(() => Math.random() - 0.5);

    // Asignar amigos secretos
    let resultado = [];
    for (let i = 0; i < listaMezclada.length; i++) {
        let amigo = listaMezclada[i];
        let amigoSecreto = listaMezclada[(i + 1) % listaMezclada.length]; // Circular
        resultado.push(`${amigo} ➔ ${amigoSecreto}`);
    }

    // Mostrar el resultado en la interfaz
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = ""; // Limpiar resultados anteriores

    resultado.forEach((item) => {
        let li = document.createElement("li");
        li.textContent = item;
        listaResultado.appendChild(li);
    });
}
