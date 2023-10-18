const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado = document.getElementById("cifrado");

//vamos a crear uina funcion para cifrar
function cifrado() {
    // Obtener el texto que se ingresa
    const textoIngresado = texto.value;
    const valorDesplazamiento = parseInt(desplazamiento.value);

    // Obtener caracter por caracter y validar la entrada del texto
    textoCifrado.value = textoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase());
        let valorEntero = c.charCodeAt(0);

        if (valorEntero >= 65 && valorEntero <= 90) {
            // Caracter es una letra mayúscula
            valorEntero = ((valorEntero - 65 + valorDesplazamiento) % 26) + 65;
        } else if (valorEntero >= 97 && valorEntero <= 122) {
            // Caracter es una letra minúscula
            valorEntero = ((valorEntero - 97 + valorDesplazamiento) % 26) + 97;
        } else if (valorEntero >= 48 && valorEntero <= 57) {
            // Caracter es un número
            valorEntero = ((valorEntero - 48 + valorDesplazamiento) % 10) + 48;
        }

        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');
}


texto.addEventListener("keyup", cifrado);
desplazamiento.addEventListener("input", cifrado);

// Escuchar eventos de mensaje del HTML padre
window.addEventListener("message", function(event) {
    if (event.source === parent) {
        
        textoRecivido = event.data;
        document.getElementById("texto").value = textoRecivido;
    }
});
