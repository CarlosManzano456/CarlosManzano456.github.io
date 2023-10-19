var viggenere = viggenere || (function(){
var textoRecivido;

    var doStaff = function(txt, desp, action){
        var replace = (function(){
            //ABC   
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var l = abc.length;

            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                if(i != -1){
                    var pos = i;
                    if(action){
                        //cifrar
                        pos += desp;
                        pos = (pos >= l )?pos-l:pos;
                    }else{
                        //descifrar
                        pos -= desp;
                        pos = (pos < 0 )?l+pos:pos;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();

        //validar
        var re = (/([a-z])/ig);

        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    return{
        //si vamos a codificar o decodificar
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },
        decode : function(txt, desp){
            return  doStaff(txt, desp, false);
        }
    }; 
})();

function longitudCifrar(){
    let res = camposVacios();

    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtClave").value;

    if(clave.length > texto.length){
        alert("La clave no puede ser mas larga que el texto a cifrar");
    }else{
        if(res){
            codificar(texto, clave);
        }
        
    }
}


function longitudDescifrar(){
    let res = camposVacios();
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtClave").value;

    if(clave.length > texto.length){
        alert("La clave no puede ser mas larga que el texto a cifrar");
    }else{
        if (res) {
            decodificar(texto, clave);
        }
        
    }
}

function codificar(texto, clave){

    var resultado = "";
    var indiceClave = 0;
    var charArTexto = texto.split('');

    for(var i = 0; i < charArTexto.length; i++){

        var des = obindiceClave(clave.charAt(indiceClave));
        var charTexto = charArTexto[i];

        resultado += viggenere.encode(charTexto, (des >= 26)? des%26 : des);
        indiceClave++;

        if(indiceClave >= clave.length){
            indiceClave = 0;
        }

        document.getElementById("res").value = resultado; 
    }
}


function decodificar(texto, clave){

    var resultado = "";
    var indiceClave = 0;
    var charArTexto = texto.split('');

    for(var i = 0; i < charArTexto.length; i++){

        var des = obindiceClave(clave.charAt(indiceClave));
        var charTexto = charArTexto[i];

        resultado += viggenere.decode(charTexto, (des >= 26)? des%26 : des);
        indiceClave++;

        if(indiceClave >= clave.length){
            indiceClave = 0;
        }

        document.getElementById("res").value = resultado; 
    }
}

function obindiceClave(reco){
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return abc.indexOf(reco.toLowerCase());
}

function camposVacios(){
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtClave").value;

    if(texto == ""){
        alert("El texto a cifrar no puede estar vacio");
        return false;
    }if(clave == ""){
        alert("La clave no puede estar vacia");
        return false;
    }

    return true;
}

function colocar(){
    var copiado = document.getElementById("res").value;
    document.getElementById("txt").value = copiado;   
}

function reiniciar(){
    document.getElementById("txt").value = "";
    document.getElementById("txtClave").value = "";
    document.getElementById("res").value = "";
}

// Escuchar eventos de mensaje del HTML padre
window.addEventListener("message", function(event) {
    if (event.source === parent) {
        
        textoRecivido = event.data;
        document.getElementById("txt").value = textoRecivido;
    }
});
