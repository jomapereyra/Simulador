$(document).ready(function () {

    var mensajes_error = {
        "campo": "Este campo no debe estar vacio",
    };

    $("#correo").keyup(function () {
        var valor = $("#correo").val();
        if (valor == "") {
            mostrar_advertencia("#correo_error", "#correo", mensajes_error["campo"], 0);
        }
        else {
            exitoso("#correo");
            limpiar_todo();
        }

    })

});

function enviar_error(mensaje) {
    $("#error").empty();
    var html = "<div class='card-panel red lighten-1'><span class='white-text valign-wrapper'style='font-weight: bold'><div class='col s2 center-align'><i class='small material-icons'>error</i></div><div class='col s10'>" + mensaje + "</div></span></div>";
    $("#error").append(html);
    $("#error").fadeIn();
}

function limpiar_error() {
    $("#error").empty();
    $("#error").fadeOut();
}

function limpiar_todo() {
    limpiar_error();
    $("#correo_error").empty();
}

function exitoso(elemento) {
    $(elemento).css("border-bottom", "1px solid #4CAF50");
    $(elemento).css("box-shadow", "0 1px 0 0 #4CAF50");
}

function fallido(elemento) {
    $(elemento).css("border-bottom", "1px solid #ee6e73");
    $(elemento).css("box-shadow", "0 1px 0 0 #ee6e73");
}

function todo_fallido() {
    fallido("#correo");
}

function mostrar_advertencia(id_error, id_elemento, mensaje) {
    $(id_error).empty();
    $(id_error).append(mensaje);
    $(id_error).fadeIn();
    fallido(id_elemento);
}

function enviar_notificacion(mensaje) {
    $("#panel_error").remove();
    var html = "<div id='panel_error' class='card-panel green lighten-1'><span class='white-text valign-wrapper'style='font-weight: bold'><div class='col s2 center-align'><i class='small material-icons'>email</i></div><div class='col s10'>" + mensaje + "</div></span></div>";
    $("#error").append(html);
    $("#error").fadeIn();
}

function validar_recuperar() {

    var mensaje_error = {
        "campo": "Este campo no debe estar vacio",
        "existe": "El correo ingresado no se encuentra registrado.",
        "enviado": "Se ha enviado un mensaje a su correo electrónico con los pasos para cambiar su contraseña.",
        "basico": "Existen algunos errores que deben corregirse. Asegurese de ingresar bien los datos",
    };

    limpiar_todo();

    $.ajax({
        url: "controller/recuperar_usuario.php",
        method: "POST",
        data: $('#formulario_recuperar').serialize(),
        beforeSend: function () {
            $("#recuperar_button").empty();
            $("#recuperar_button").append("Enviando...");
        },
        success: function (resultado) {

            window.setTimeout(function () {

                var recuperar = JSON.parse(resultado);

                $("#recuperar_button").empty();
                $("#recuperar_button").append("Solicitar<i class='material-icons right'>send</i>");

                //Respuesta de Usuario

                if (recuperar.campo) {
                    mostrar_advertencia("#correo_error", "#correo", mensaje_error["campo"], 0);
                } else {
                    exitoso("#correo");
                }

                //Respuesta del intento

                if (recuperar.check) {
                    enviar_error(mensaje_error["basico"]);
                }
                else {
                    if (recuperar.existe) {
                        enviar_error(mensaje_error["existe"]);
                    }
                    else {
                        enviar_notificacion(mensaje_error["enviado"]);
                        $("#recuperar_button").addClass("disabled");
                    }
                }

            }, 1000);

        }
    });

    return false;

}