$(document).ready(function () {

    $('.tabs').tabs();

    var mensajes_error = {
        "campo": "Este campo no debe estar vacio",
        "largo": "El campo 0 no debe superar los 1 caracteres",
        "corto": "Debe ingresar al menos 1 caracteres en el campo 0",
        "regex": "Este campo no respeta un formato de 0 válido",
        "contraseña": "Las contraseña nueva no coincide con su repeticion",
    };

    var error = [false, false];


    $("#contraseña_nueva").change(function () {
        var valor = $("#contraseña_nueva").val();
        var comparacion = $("#comparacion").val();
        if (valor == "") {
            mostrar_advertencia("#contraseña_nueva_error", "#contraseña_nueva", mensajes_error["campo"], 0);
        }
        else {
            if (valor.length > 30) {
                mostrar_advertencia("#contraseña_nueva_error", "#contraseña_nueva", mensajes_error["largo"], 30);
            }
            else {
                if (valor.length < 8) {
                    mostrar_advertencia("#contraseña_nueva_error", "#contraseña_nueva", mensajes_error["corto"], 8);
                }
                else {
                    var regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
                    if (!regex.test(valor)) {
                        mostrar_advertencia("#contraseña_nueva_error", "#contraseña_nueva", mensajes_error["regex"], 0);
                    }
                    else {
                        $("#contraseña_nueva_error").empty();
                        exitoso("#contraseña_nueva");
                        error[0] = true;
                        if (!error.includes(false)) {
                            limpiar_error_codigo();
                        }
                        if (valor != comparacion) {
                            mostrar_advertencia("#comparacion_error", "#comparacion", mensajes_error["contraseña"], 0);
                        }
                        else {
                            $("#comparacion_error").empty();
                            exitoso("#comparacion");
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
            mostrar_advertencia("#comparacion_error", "#comparacion", mensajes_error["contraseña"], 0);
        }
        else {
            $("#comparacion_error").empty();
            exitoso("#comparacion");
            error[1] = true;
            if (!error.includes(false)) {
                limpiar_error_codigo();
            }
        }
    });

});

function limpiar_error_codigo() {
    $("#error_codigo").empty();
}

function limpiar_todo_codigo() {
    limpiar_error_codigo();
    $("#contraseña_nueva_error").empty();
    $("#comparacion_error").empty();
    $("#codigo_error").empty();
}

function enviar_error_codigo(mensaje) {
    $("#error_codigo").empty();
    var html = "<div class='card-panel red lighten-1'><span class='white-text valign-wrapper'style='font-weight: bold'><div class='col s2 center-align'><i class='small material-icons'>error</i></div><div class='col s10'>" + mensaje + "</div></span></div>";
    $("#error_codigo").append(html);
    $("#error_codigo").fadeIn();
    $(".modal-content").animate({
        scrollTop: $('#error_codigo').position().top
    }, 'slow');
}

function enviar_notificacion_codigo(mensaje) {
    $("#error_codigo").empty();
    var html = "<div class='card-panel green lighten-1'><span class='white-text valign-wrapper'style='font-weight: bold'><div class='col s2 center-align'><i class='small material-icons'>check_circle</i></div><div class='col s10'>" + mensaje + "</div></span></div>";
    $("#error_codigo").append(html);
    $("#error_codigo").fadeIn();
    $(".modal-content").animate({
        scrollTop: $('#error_codigo').position().top
    }, 'slow');
}

function mostrar_ocultar_contraseña_nueva() {
    if ($("#contraseña_nueva").attr('type') == "password") {
        $("#contraseña_nueva").attr('type', 'text');
    }
    else {
        $("#contraseña_nueva").attr('type', 'password');
    }

}

function validar_codigo() {

    var mensajes_error = {
        "campo": "Este campo no debe estar vacio",
        "largo": "El campo 0 no debe superar los 1 caracteres",
        "corto": "Debe ingresar al menos 1 caracteres en el campo 0",
        "regex": "Este campo no respeta un formato de 0 válido",
        "contraseña": "Las contraseña nueva no coincide con su repeticion",
        "codigo":"El codigo ingresado no corresponde al que le hemos enviado",
    };

    limpiar_todo_codigo();

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

            window.setTimeout(function () {

                var registro = JSON.parse(resultado);

                // Respuesta de Contraseña Nueva

                if (registro.contraseña_campo) {
                    mostrar_advertencia("#contraseña_nueva_error", "#contraseña_nueva", mensajes_error["campo"], 0);
                }
                else {
                    if (registro.contraseña_max) {
                        mostrar_advertencia("#contraseña_nueva_error", "#contraseña_nueva", mensajes_error["largo"], 30);
                    }
                    else {
                        if (registro.contraseña_min) {
                            mostrar_advertencia("#contraseña_nueva_error", "#contraseña_nueva", mensajes_error["corto"], 8);
                        }
                        else {
                            if (registro.contraseña_formato) {
                                mostrar_advertencia("#contraseña_nueva_error", "#contraseña_nueva", mensajes_error["regex"], 0);
                            }
                            else {
                                if (registro.contraseña_coincide) {
                                    mostrar_advertencia("#comparacion_error", "#comparacion", mensajes_error["contraseña"], 0);
                                }
                                else {
                                    exitoso("#contraseña_nueva");
                                }
                            }
                        }
                    }
                }

                //Respuesta del codigo

                if(registro.codigo){
                    mostrar_advertencia("#codigo_error", "#codigo", mensajes_error["codigo"], 0);
                }
                else{
                    exitoso("#codigo");
                }

                // Respuesta Conclusion

                if (registro.fail) {
                    enviar_error_codigo("Existen algunos errores que deben corregirse. Asegurese de ingresar bien los datos");
                }
                else {
                    enviar_notificacion_codigo("Se ha modificado la contraseña exitosamente. Recuerdela para su proximo ingreso.");
                    $("codigo_button").attr("disabled", true);
                }
                $("#codigo_button").empty();
                $("#codigo_button").append("<i class='material-icons left'>email</i>Aplicar cambio");


            }, 1000);

        }
    });

    return false;

}

function mostrar_ocultar_contraseña_actual() {
    if ($("#contraseña_actual").attr('type') == "password") {
        $("#contraseña_actual").attr('type', 'text');
    }
    else {
        $("#contraseña_actual").attr('type', 'password');
    }

}

function limpiar_todo_seguridad() {
    $("#contraseña_actual_error").empty();
}

function validar_seguridad() {

    var mensajes_error = {
        "campo": "Este campo no debe estar vacio",
        "largo": "El campo 0 no debe superar los 1 caracteres",
        "corto": "Debe ingresar al menos 1 caracteres en el campo 0",
        "regex": "Este campo no respeta un formato de 0 válido",
        "contraseña": "Las contraseña nueva no coincide con su repeticion",
        "contraseña_actual": "La contraseña ingresada no coincide con la que tiene registrada el usuario actualmente",
    };

    limpiar_todo_seguridad();

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

            window.setTimeout(function () {

                var registro = JSON.parse(resultado);

                // Respuesta de Contraseña Actual

                if (registro.contraseña_actual) {
                    mostrar_advertencia("#contraseña_actual_error", "#contraseña_actual", mensajes_error["contraseña_actual"], 0);
                }
                else {
                    exitoso("#contraseña_actual");
                }

                // Respuesta Conclusion
                if (!registro.fail) {
                    limpiar_todo_seguridad();
                    $("#contraseña_nueva").val("");
                    $('#contraseña_nueva').attr('style', "");
                    $("#comparacion").val("");
                    $('#comparacion').attr('style', "");
                    $("label").removeClass("active");
                    $("codigo_button").attr("disabled", false);
                    $("#seguridad").fadeOut("fast");
                    $("#seguridad_footer").fadeOut("fast");
                    $("#cod_seguridad").fadeIn();
                    $("#codigo_footer").fadeIn();
                }

                $("#seguridad_button").empty();
                $("#seguridad_button").append("<i class='material-icons left'>email</i>Solicitar cambio");


            }, 1000);

        }
    });

    return false;

}



