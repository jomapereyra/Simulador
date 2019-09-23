$(document).ready(function () {

    $('.tabs').tabs();

    $("#contraseña_nueva").change(function () {
        var valor = $("#contraseña_nueva").val();
        var comparacion = $("#comparacion").val();
        if (valor == "") {
            mostrar_mensaje_campo("#contraseña_nueva", mensajes_error["campo"]);
        }
        else {
            if (valor.length > 30) {
                mostrar_mensaje_campo("#contraseña_nueva", mensajes_error["largo"], 30);
            }
            else {
                if (valor.length < 8) {
                    mostrar_mensaje_campo("#contraseña_nueva", mensajes_error["corto"], 8);
                }
                else {
                    var regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
                    if (!regex.test(valor)) {
                        mostrar_mensaje_campo("#contraseña_nueva", mensajes_error["regex"]);
                    }
                    else {
                        ocultar_mensaje_campo("#contraseña_nueva");
                        if (valor != comparacion) {
                            mostrar_mensaje_campo("#comparacion", mensajes_error["contraseña"]);
                        }
                        else {
                            ocultar_mensaje_campo("#comparacion");
                        }
                    }

                }

            }

        }
    });

    $("#comparacion").keyup(function () {
        var valor = $("#comparacion").val();
        var comparacion = $("#contraseña_nueva").val();
        if (valor != comparacion) {
            mostrar_mensaje_campo("#comparacion", mensajes_error["contraseña"]);
        }
        else {
            ocultar_mensaje_campo("#comparacion");
        }
    });

});

function mostrar_ocultar_contraseña_actual() {

    mostrar_ocultar_contraseña("#contraseña_actual");

}

function mostrar_ocultar_contraseña_nueva() {
   
    mostrar_ocultar_contraseña("#contraseña_nueva");

}

function cancelar_seguridad(){
    
    cancelar("#formulario_codigo","#seguridad_tab",["#contraseña_nueva","#comparacion","#codigo"],"#mensaje_codigo");
    cancelar("#formulario_seguridad","#seguridad_tab",["#contraseña_actual"],"#mensaje_seguridad");
    $("#formulario_codigo").fadeOut("slow", "swing", function () {
        $("#formulario_seguridad").fadeIn("slow", "swing");
    });

}

function validar_codigo() {

    ocultar_todo(["#contraseña_nueva","#comparacion","#codigo"],"#mensaje_codigo");

    $.ajax({
        url: "controller/codigo_pass.php",
        method: "POST",
        data: $('#formulario_codigo').serialize(),
        cache: "false",
        beforeSend: function () {
            $("#codigo_button").empty();
            $("#codigo_button").append("Validando...");
        },
        success: function (resultado) {

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
                mostrar_mensaje_formulario("#mensaje_codigo","error");
            }
            else {
                mostrar_mensaje_formulario("#mensaje_codigo","exito");
                $("codigo_button").attr("disabled", true);
            }
            $("#codigo_button").empty();
            $("#codigo_button").append("<i class='material-icons left'>email</i>Aplicar cambio");

        }

    });

    return false;

}

function validar_seguridad() {

    ocultar_todo(["#contraseña_actual"],"#mensaje_seguridad");

    $.ajax({
        url: "controller/seguridad_pass.php",
        method: "POST",
        data: $('#formulario_seguridad').serialize(),
        cache: "false",
        beforeSend: function () {
            $("#seguridad_button").empty();
            $("#seguridad_button").append("Enviando...");
        },
        success: function (resultado) {

            var registro = JSON.parse(resultado);

            // Respuesta de Contraseña Actual

            if (registro.contraseña_actual) {
                mostrar_mensaje_campo("#contraseña_actual", mensajes_error["contraseña_actual"]);
            }
            else {
                exitoso("#contraseña_actual");
            }

            // Respuesta Conclusion
            if (!registro.fail) {
                ocultar_mensaje_formulario("#mensaje_seguridad");
                $("#formulario_seguridad").fadeOut("slow", "swing", function () {
                    $("#formulario_codigo").fadeIn("slow", "swing", function () {
                        $("#contraseña_nueva").focus();
                    });
                });
            }
            else {
                mostrar_mensaje_formulario("#mensaje_seguridad","error");
            }

            $("#seguridad_button").empty();
            $("#seguridad_button").append("<i class='material-icons left'>email</i>Solicitar cambio");

        }
    });

    return false;

}



