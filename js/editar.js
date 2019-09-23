$(document).ready(function () {

    $("#nombre").change(function () {
        var valor = $("#nombre").val();
        if (valor == "") {
            mostrar_mensaje_campo("#nombre", mensajes_error["campo"]);
        }
        else {
            if (valor.length > 30) {
                mostrar_mensaje_campo("#nombre", mensajes_error["largo"], 30);
            }
            else {
                var regex = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ]/;
                if (!regex.test(valor)) {
                    mostrar_mensaje_campo("#nombre", mensajes_error["regex"]);
                }
                else {
                    ocultar_mensaje_campo("#nombre");
                }
            }
        }
    });

    $("#apellido").change(function () {
        var valor = $("#apellido").val();
        if (valor == "") {
            mostrar_mensaje_campo("#apellido", mensajes_error["campo"]);
        }
        else {
            if (valor.length > 30) {
                mostrar_mensaje_campo("#apellido", mensajes_error["largo"], 30);
            }
            else {
                var regex = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ]+$/;
                if (!regex.test(valor)) {
                    mostrar_mensaje_campo("#apellido", mensajes_error["regex"]);
                }
                else {
                    ocultar_mensaje_campo("#apellido");
                }
            }
        }
    });

    $("#correo").change(function () {
        var valor = $("#correo").val();
        if (valor == "") {
            mostrar_mensaje_campo("#correo", mensajes_error["campo"]);
        }
        else {
            if (valor.length > 40) {
                mostrar_mensaje_campo("#correo", mensajes_error["largo"], 40);
            }
            else {
                var regex = /\w+@\w+\.+[a-z]/;
                if (!regex.test(valor)) {
                    mostrar_mensaje_campo("#correo", mensajes_error["regex"]);
                }
                else {
                    ocultar_mensaje_campo("#correo");
                }
            }
        }
    });

    $("#ciudad").change(function () {
        var valor = $("#ciudad").val();
        if (valor == "") {
            mostrar_mensaje_campo("#ciudad", mensajes_error["campo"]);
        }
        else {
            if (valor.length > 40) {
                mostrar_mensaje_campo("#ciudad", mensajes_error["largo"], 40);
            }
            else {
                ocultar_mensaje_campo("#ciudad");
            }
        }
    });

    $("#pais").click(function () {
        var valor = $("#pais").val();
        if (valor == "") {
            mostrar_mensaje_campo("#pais", mensajes_error["select"]);
        }
        else {
            ocultar_mensaje_campo("#pais");
        }
    });

    $("#grado").change(function () {
        var valor = $("#grado").val();
        if (valor == "") {
            mostrar_mensaje_campo("#grado", mensajes_error["select"]);
        }
        else {
            ocultar_mensaje_campo("#grado");
        }
    });

    //Comportamiento del focus inicial para cada pestaña

    $("#editar_tab").click(function () {
        window.setTimeout(function () {
            $("#nombre").focus();
        }, 200);
    });

    $("#datos_tab").click(function () {
        window.setTimeout(function () {
            $("#primero").focus();
        }, 200);
    });

    $("#seguridad_tab").click(function () {
        window.setTimeout(function () {
            $("#contraseña_actual").focus();
        }, 200);
    });

});

function validar_editar() {

    ocultar_todo(["#nombre", "#apellido", "#correo", "#ciudad", "#pais", "#grado", "#tipo", "#nivel"], "#mensaje_editar");

    $.ajax({
        url: "controller/editar_usuario.php",
        method: "POST",
        data: $('#formulario_editar').serialize(),
        cache: "false",
        beforeSend: function () {
            $("#guardar_button").empty();
            $("#guardar_button").append("Actualizando...");
        },
        success: function (resultado) {

            var registro = JSON.parse(resultado);

            // Respuesta de Nombre
            if (registro.nombre_campo) {
                mostrar_mensaje_campo("#nombre", mensajes_error["campo"]);
            }
            else {
                if (registro.nombre_max) {
                    mostrar_mensaje_campo("#nombre", mensajes_error["largo"], 30);
                }
                else {
                    if (registro.nombre_formato) {
                        mostrar_mensaje_campo("#nombre", mensajes_error["regex"]);
                    }
                    else {
                        exitoso("#nombre");
                    }
                }
            }

            // Respuesta de Apellido
            if (registro.apellido_campo) {
                mostrar_mensaje_campo("#apellido", mensajes_error["campo"]);
            }
            else {
                if (registro.apellido_max) {
                    mostrar_mensaje_campo("#apellido", mensajes_error["largo"], 30);
                }
                else {
                    if (registro.apellido_formato) {
                        mostrar_mensaje_campo("#apellido", mensajes_error["regex"]);
                    }
                    else {
                        exitoso("#apellido");
                    }
                }
            }

            // Respuesta de Correo
            if (registro.correo_campo) {
                mostrar_mensaje_campo("#correo", mensajes_error["campo"]);
            }
            else {
                if (registro.correo_max) {
                    mostrar_mensaje_campo("#correo", mensajes_error["largo"], 40);
                }
                else {
                    if (registro.correo_formato) {
                        mostrar_mensaje_campo("#correo", mensajes_error["regex"]);
                    }
                    else {
                        if (registro.correo_existe) {
                            mostrar_mensaje_campo("#correo", mensajes_error["registrado"]);
                        }
                        else {
                            exitoso("#correo");
                        }
                    }
                }
            }

            // Respuesta de Nivel
            if (registro.nivel_campo) {
                mostrar_mensaje_campo("#nivel", mensajes_error["cambio_radio"]);
            }
            else {
                if (registro.nivel_existe) {
                    mostrar_mensaje_campo("#nivel", mensajes_error["cambio"]);
                }
            }

            // Respuesta de Pregunta
            if (registro.pregunta_campo) {
                mostrar_mensaje_campo("#pregunta", mensajes_error["cambio_radio"]);
            }

            // Respuesta de Pais
            if (registro.pais_campo) {
                mostrar_mensaje_campo("#pais", mensajes_error["select"]);
            }
            else {
                if (registro.pais_existe) {
                    mostrar_mensaje_campo("#pais", mensajes_error["cambio"]);
                }
                else {
                    exitoso("#pais");
                }
            }

            // Respuesta de Grado
            if (registro.grado_campo) {
                mostrar_mensaje_campo("#grado", mensajes_error["select"]);
            }
            else {
                if (registro.grado_existe) {
                    mostrar_mensaje_campo("#grado", mensajes_error["cambio"]);
                }
                else {
                    exitoso("#grado");
                }
            }

            // Respuesta de Tipo
            if (registro.tipo_campo) {
                mostrar_mensaje_campo("#tipo", mensajes_error["cambio_radio"]);
            }
            else {
                if (registro.tipo_existe) {
                    mostrar_mensaje_campo("#tipo", mensajes_error["cambio"]);
                }
            }

            // Respuesta de Ciudad
            if (registro.ciudad_campo) {
                mostrar_mensaje_campo("#ciudad", mensajes_error["campo"]);
            }
            else {
                if (registro.ciudad_max) {
                    mostrar_mensaje_campo("#ciudad", mensajes_error["largo"], 40);
                }
                else {
                    exitoso("#ciudad");
                }
            }

            // Respuesta Conclusion
            if (registro.fail) {
                mostrar_mensaje_formulario("#mensaje_editar","error");
            }
            else {
                mostrar_mensaje_formulario("#mensaje_editar","exito");
            }

            $("#guardar_button").empty();
            $("#guardar_button").append("<i class='material-icons left'>check</i>Guardar cambios");

        }

    });

    return false;

}

function cancelar_editar() {
    cancelar("#formulario_editar","#editar_tab",["#nombre", "#apellido", "#correo", "#ciudad", "#pais", "#grado", "#tipo", "#nivel"],"#mensaje_editar",true);
}