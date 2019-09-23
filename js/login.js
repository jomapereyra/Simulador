$(document).ready(function () {

    $("#usuario").change(function () {
        var valor = $("#usuario").val();
        if (valor == "") {
            mostrar_mensaje_campo("#usuario", mensajes_error["campo"]);
        }
        else {
            ocultar_mensaje_campo("#usuario");
        }
    })

    $("#contraseña").change(function () {
        var valor = $("#contraseña").val();
        if (valor == "") {
            mostrar_mensaje_campo("#contraseña", mensajes_error["campo"]);
        }
        else {
            ocultar_mensaje_campo("#contraseña");
        }
    })

});

function validar_login() {

    ocultar_todo(["#usuario", "#contraseña"], "#mensaje_login");

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

            var login = JSON.parse(resultado);

            //Respuesta de Usuario

            if (login.usuario_campo) {
                mostrar_mensaje_campo("#usuario", mensajes_error["campo"]);
            } else {
                exitoso("#usuario");
            }

            //Respuesta de Contraseña

            if (login.contraseña_campo) {
                mostrar_mensaje_campo("#contraseña", mensajes_error["campo"]);
            } else {
                exitoso("#contraseña");
            }

            //Respuesta en Conjunto

            if (login.check) {
                mostrar_mensaje_formulario("#mensaje_login","error");
            }
            else {
                if (login.existe) {
                    mostrar_mensaje_formulario("#mensaje_login","error",mensajes_error["existe"]);
                }
                else {
                    if (login.activado) {
                        mostrar_mensaje_formulario("#mensaje_login","error",mensajes_error["activado"]);
                    }
                }
            }

            //Respuesta Conclusion

            if (login.fail) {
                
                $("#login_button").empty();
                $("#login_button").append("Ingresar<i class='material-icons right' aria-hidden='true' focusable='false'>send</i>");
            
            }
            else {
                $(location).attr('href', login.url);
            }

        }
    });

    return false;

}