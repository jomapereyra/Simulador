$(document).ready(function () {

    $("#correo").change(function () {
        var valor = $("#correo").val();
        if (valor == "") {
            mostrar_mensaje_campo("#correo", mensajes_error["campo"]);
        }
        else {
            ocultar_mensaje_campo("#correo");
        }

    })

});

function validar_recuperar() {

    ocultar_todo(["#correo"], "#mensaje_recuperar");

    $.ajax({
        url: "controller/recuperar_usuario.php",
        method: "POST",
        data: $('#formulario_recuperar').serialize(),
        beforeSend: function () {
            $("#recuperar_button").empty();
            $("#recuperar_button").append("Enviando...");
        },
        success: function (resultado) {

            console.log(resultado);

            var registro = JSON.parse(resultado);

            //Respuesta de Correo

            if (registro.correo_campo) {
                mostrar_mensaje_campo("#correo", mensajes_error["campo"]);
            } else {
                exitoso("#correo");
            }

            //Respuesta del Formulario

            if (registro.fail) {
                mostrar_mensaje_formulario("#mensaje_recuperar", "error");
                $("#recuperar_button").empty();
                $("#recuperar_button").append("Solicitar<i class='material-icons right'>send</i>");
            }
            else {
                if (registro.correo_no_enviado) {
                    mostrar_mensaje_formulario("#mensaje_recuperar", "error", registro.correo_error);
                    $("#recuperar_button").empty();
                    $("#recuperar_button").append("Solicitar<i class='material-icons right'>send</i>");
                }
                else {
                    ocultar_mensaje_formulario("#mensaje_recuperar");
                    $("#formulario_recuperar").fadeOut("slow", "swing", function () {
                        $("#correo_replik").val($("#correo").val());
                        $("#formulario_codigo").fadeIn("slow", "swing", function () {
                            $("#contraseña_nueva").focus();
                        });
                    });
                }
            }

        }

    });

    return false;

}

function validar_codigo() {

    ocultar_todo(["#contraseña_nueva", "#comparacion", "#codigo"], "#mensaje_codigo");

    $.ajax({
        url: "controller/codigo_recuperar.php",
        method: "POST",
        data: $('#formulario_codigo').serialize(),
        cache: "false",
        beforeSend: function () {
            $("#codigo_button").empty();
            $("#codigo_button").append("Validando...");
        },
        success: function (resultado) {

            console.log(resultado);

            var registro = JSON.parse(resultado);

            // Respuesta de Contraseña Nueva

            if (registro.contraseña_campo) {
                mostrar_mensaje_campo("#contraseña_nueva", mensajes_error["campo"]);
            }
            else {
                if (registro.contraseña_max) {
                    mostrar_mensaje_campo("#contraseña_nueva", mensajes_error["largo"], 30);
                }
                else {
                    if (registro.contraseña_min) {
                        mostrar_mensaje_campo("#contraseña_nueva", mensajes_error["corto"], 8);
                    }
                    else {
                        if (registro.contraseña_formato) {
                            mostrar_mensaje_campo("#contraseña_nueva", mensajes_error["regex"]);
                        }
                        else {
                            if (registro.contraseña_coincide) {
                                mostrar_mensaje_campo("#comparacion", mensajes_error["contraseña"]);
                            }
                            else {
                                exitoso("#contraseña_nueva");
                            }
                        }
                    }
                }
            }

            //Respuesta del codigo

            if (registro.codigo) {
                mostrar_mensaje_campo("#codigo", mensajes_error["codigo"]);
            }
            else {
                exitoso("#codigo");
            }

            // Respuesta Conclusion

            if (registro.fail) {
                mostrar_mensaje_formulario("#mensaje_codigo", "error");
            }
            else {
                if (registro.correo_no_enviado) {
                    mostrar_mensaje_formulario("#mensaje_codigo", "error", registro.correo_error);
                }
                else {
                    mostrar_mensaje_formulario("#mensaje_codigo", "exito");
                    $("#codigo_button").attr("disabled", true);
                }
            }
            $("#codigo_button").empty();
            $("#codigo_button").append("<i class='material-icons left'>check</i>Aplicar cambio");

        }

    });

    return false;

}

