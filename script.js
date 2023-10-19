const button1 = document.getElementById('Cesar');
const button2 = document.getElementById('viggenere');
const pagina1 = document.getElementById('pagina1');
const pagina2 = document.getElementById('pagina2');

button1.addEventListener('click', () => {
    let res = camposVacios();
    if(res){
        pagina1.style.display = 'block';
        pagina2.style.display = 'none';
    }
});

button2.addEventListener('click', () => {
    let res = camposVacios();
    if (res) {
        pagina1.style.display = 'none';
        pagina2.style.display = 'block';
    }
});

//////////////////////////////////////////////////////

var iframes = document.querySelectorAll('.iframe');

// Función para enviar información al iframe

function enviarInfoAlIframe() {
    var info = document.getElementById("textoentrada").value;
    for (var i = 0; i < iframes.length; i++) {
        iframes[i].contentWindow.postMessage(info, "*");
    }
}
document.getElementById("Cesar").addEventListener("click", enviarInfoAlIframe);

function camposVacios(){
    var texto = document.getElementById("textoentrada").value;

    if (texto == ""){
        alert("El texto a cifrar esta vacio");
        return false;
    }
    return true;
}
