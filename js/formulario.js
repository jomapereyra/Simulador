//Centralizo los mensajes de error que pueden existir
var mensajes_error = {
    "campo": "El campo 0 no debe estar vacio",
    "largo": "El campo 0 no debe superar los 1 caracteres",
    "corto": "Debe ingresar al menos 1 caracteres en el campo 0",
    "regex": "Este campo no respeta un formato de 0 válido",
    "registrado": "Este 0 ya se encuentra registrado. Por favor, ingrese otro",
    "select": "Debe seleccionar un 0",
    "cambio": "El dato seleccionado no existe. Por favor, no intente cambiar el HTML",
    "cambio_radio": "No se ha seleccionado ningun dato. Por favor, no intente cambiar el HTML",
    "contraseña": "Las contraseña nueva no coincide con su repeticion",
    "contraseña_actual": "La contraseña ingresada no coincide con la que tiene registrada el usuario actualmente",
    "codigo": "El codigo ingresado no corresponde al que le hemos enviado",
    "existe": "El usuario y la contraseña no coinciden. Si no recuerda su contraseña, intente recuperarla con la opcion de abajo.",
    "activado": "Su cuenta no esta activada.<br>Revice su correo electrónico para activarla.",
};

//Limpia y resetea el formato del formulario
function ocultar_todo(ids, mensaje) {
    ocultar_mensaje_formulario(mensaje);
    jQuery.each(ids, function (i, val) {
        sin_formato(val);
        $(val+"_error").empty();
    });
}

//Devulve el formato original a los inputs del formulario
function sin_formato(input){
    $(input).css("border-bottom", "1px solid #9e9e9e");
    $(input).css("box-shadow", "none");
}

//Agrega el formato de respuesta correcta y el atributo de accesibilidad
function exitoso(elemento) {
    $(elemento).css("border-bottom", "1px solid #4CAF50");
    $(elemento).css("box-shadow", "0 1px 0 0 #4CAF50");
    $(elemento).attr("aria-invalid", "false");
}

//Agrega el formato de respuesta incorrecta y el atributo de accesibilidad
function fallido(elemento) {
    $(elemento).css("border-bottom", "1px solid #ee6e73");
    $(elemento).css("box-shadow", "0 1px 0 0 #ee6e73");
    $(elemento).attr("aria-invalid", "true");
}

//Elimina el mensaje del formulario
function ocultar_mensaje_formulario(mensaje) {
    $(mensaje).empty();
    $(mensaje).fadeOut();
}

//Agrega el mensaje del formulario
function mostrar_mensaje_formulario(mensaje, tipo, texto="") {
    $(mensaje).empty();
    var html = "<div class='card-panel color lighten-1'><span class='white-text valign-wrapper'style='font-weight: bold'><i class='small material-icons icon_message'>error</i>texto</span></div>";
    var texto_error = "Existen algunos errores que deben corregirse. Asegurese de ingresar bien los datos";
    var texto_exito = "Operacion realizada exitosamente";
    var texto_advertencia = "";
    if (tipo == "error") {
        html = html.replace("color", "red");
        if(texto != ""){
            html = html.replace("texto", texto);
        }
        else{
            html = html.replace("texto", texto_error);
        }
    }
    else {
        if (tipo == "exito") {
            html = html.replace("color", "green");
            if(texto != ""){
                html = html.replace("texto", texto);
            }
            else{
                html = html.replace("texto", texto_exito);
            }
        }
        else{
            html = html.replace("color", "yellow");
            if(texto != ""){
                html = html.replace("texto", texto);
            }
            else{
                html = html.replace("texto", texto_advertencia);
            }
        }
    }
    $(mensaje).append(html);
    $(mensaje).fadeIn();
    $("html").animate({
        scrollTop: 0
    }, 800);
    $(mensaje).focus();
}

//Agrega un mensaje al campo correspondiente
function mostrar_mensaje_campo(id_campo, mensaje, cantidad=0) {
    var nombre = $(id_campo).data("hidden");
    var msj = mensaje.replace("0", nombre);
    var id_error=id_campo+"_error";
    msj = msj.replace("1", cantidad);
    $(id_error).empty();
    $(id_error).append(msj);
    $(id_error).fadeIn();
    fallido(id_campo);
}

//Elimina un mensaje de un campo
function ocultar_mensaje_campo(id_campo){
    var id_error=id_campo+"_error";
    $(id_error).empty();
    exitoso(id_campo);
}

//Resetea el formulario y hace focus a un elemento determinado
function cancelar(formulario,elem_focus,ids,mensaje,contenido=false){
    ocultar_todo(ids,mensaje);
    $(formulario)[0].reset();
    if(contenido){
        $("label").addClass("active");
    }
    $("html").animate({
        scrollTop: 0
    }, 800);
    $(elem_focus).focus();
}

//Muestra y oculta una contraseña
function mostrar_ocultar_contraseña(id_campo){
    if ($(id_campo).attr('type') == "password") {
        $(id_campo).attr('type', 'text');
    }
    else {
        $(id_campo).attr('type', 'password');
    }
}

