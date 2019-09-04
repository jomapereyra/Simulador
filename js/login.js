$(document).ready(function () {

    var mensajes_error = {
        "campo": "EL campo 0 no debe estar vacio",
    };

    var error = [false, false];

    $("#usuario").change(function () {
        var valor = $("#usuario").val();
        if (valor == "") {
            mostrar_advertencia("#usuario_error", "#usuario", mensajes_error["campo"],0);
        }
        else {
            $("#usuario_error").empty();
            exitoso("#usuario");
            error[0] = true;
            if (!error.includes(false)) {
                limpiar_error();
            }
        }

    })

    $("#contraseña").change(function () {
        var valor = $("#contraseña").val();
        if (valor == "") {
            mostrar_advertencia("#contraseña_error", "#contraseña", mensajes_error["campo"],0);
        }
        else {
            $("#contraseña_error").empty();
            exitoso("#contraseña");
            error[1] = true;
            if (!error.includes(false)) {
                limpiar_error();
            }
        }

    })

});

function enviar_error(mensaje) {
    $("#error").empty();
    var html = "<div class='card-panel red lighten-1'><span class='white-text valign-wrapper'style='font-weight: bold'><div class='col s2 center-align'><i class='small material-icons' aria-hidden='true' focusable='false'>error</i></div><div class='col s10'>" + mensaje + "</div></span></div>";
    $("#error").append(html);
    $("#error").fadeIn();
}

function limpiar_error() {
    $("#error").empty();
    $("#error").fadeOut();
}

function limpiar_todo() {
    limpiar_error();
    $("#usuario_error").empty();
    $("#contraseña_error").empty();
}

function exitoso(elemento) {
    $(elemento).css("border-bottom", "1px solid #4CAF50");
    $(elemento).css("box-shadow", "0 1px 0 0 #4CAF50");
    $(elemento).attr("aria-invalid","false");
}

function fallido(elemento) {
    $(elemento).css("border-bottom", "1px solid #ee6e73");
    $(elemento).css("box-shadow", "0 1px 0 0 #ee6e73");
}

function todo_fallido(){
    fallido("#usuario");
    fallido("#contraseña");
}

function mostrar_advertencia(id_error, id_elemento, mensaje, cantidad) {
    var nombre = $(id_elemento).data("hidden");
    var msj = mensaje.replace("0", nombre);
    msj = msj.replace("1", cantidad);
    $(id_error).empty();
    $(id_error).append(msj);
    $(id_error).fadeIn();
    fallido(id_elemento);
    $(id_elemento).attr("aria-invalid","true");
}

function validar_login() {

    var mensaje_error = {
        "campo": "El campo 0 no debe estar vacio",
        "existe": "El usuario y la contraseña no coinciden.<br>Si no recuerda su contraseña, intente recuperarla con la opcion de abajo.",
        "activado": "Su cuenta no esta activada.<br>Revice su correo electrónico para activarla.",
        "basico": "Existen algunos errores que deben corregirse. Asegurese de ingresar bien los datos",
    };

    limpiar_todo();

    $.ajax({
        url: "controller/iniciar_sesion.php",
        method: "POST",
        data: $('#formulario_login').serialize(),
        cache: "false",
        beforeSend: function () {
            $("#login_button").empty();
            $("#login_button").append("Conectando...");
        },
        success: function (resultado) {

            window.setTimeout(function () {

                var login = JSON.parse(resultado);

                //Respuesta de Usuario

                if (login.usuario_campo) {
                    mostrar_advertencia("#usuario_error", "#usuario", mensaje_error["campo"]);
                } else {
                    exitoso("#usuario");
                }

                //Respuesta de Contraseña

                if (login.contraseña_campo) {
                    mostrar_advertencia("#contraseña_error", "#contraseña", mensaje_error["campo"]);
                } else {
                    exitoso("#contraseña");
                }

                //Respuesta en Conjunto

                if (login.check) {
                    enviar_error(mensaje_error["basico"]);
                }
                else {
                    if (login.existe) {
                        enviar_error(mensaje_error["existe"]);
                    }
                    else {
                        if (login.activado) {
                            enviar_error(mensaje_error["activado"]);
                        }
                    }
                }

                //Respuesta Conclusion

                if (login.fail) {
                    todo_fallido();
                    $("#login_button").empty();
                    $("#login_button").append("Ingresar<i class='material-icons right' aria-hidden='true' focusable='false'>send</i>");
                    $("#error").focus();
                }
                else {
                    $(location).attr('href', login.url);
                }


            }, 1000);

        }
    });

    return false;

}