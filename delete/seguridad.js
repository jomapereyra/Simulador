
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

function seguridad() {
    $("#mis_datos").fadeOut("fast");
    $("#mis_datos_footer").fadeOut("fast");
    $("#seguridad").fadeIn();
    $("#seguridad_footer").fadeIn();

    limpiar_todo_seguridad();
    $("#contraseña_actual").val("");
    $('#contraseña_actual').attr('style', "");
    $("label").removeClass("active");

}

//Comportamiento del boton cancelar del modal
function cancelar_seguridad() {
    $("#seguridad").fadeOut("fast");
    $("#seguridad_footer").fadeOut("fast");
    $("#mis_datos").fadeIn();
    $("#mis_datos_footer").fadeIn();
    $(".modal-content").animate({
        scrollTop: $('.modal-content').position().top
    }, 'fast');

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

