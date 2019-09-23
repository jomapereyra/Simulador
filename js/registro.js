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
                var regex = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ]+$/;
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

    $("#usuario").change(function () {
        var valor = $("#usuario").val();
        if (valor == "") {
            mostrar_mensaje_campo("#usuario", mensajes_error["campo"]);
        }
        else {
            if (valor.length > 30) {
                mostrar_mensaje_campo("#usuario", mensajes_error["largo"], 30);
            }
            else {
                if (valor.length < 6) {
                    mostrar_mensaje_campo("#usuario", mensajes_error["corto"], 6);
                }
                else {

                    var regex = /^\w+$/;
                    if (!regex.test(valor)) {
                        mostrar_mensaje_campo("#usuario", mensajes_error["regex"]);
                    }
                    else {
                        ocultar_mensaje_campo("#usuario");
                    }

                }

            }
        }
    });

    $("#contraseña").change(function () {
        var valor = $("#contraseña").val();
        var comparacion = $("#comparacion").val();
        if (valor == "") {
            mostrar_mensaje_campo("#contraseña", mensajes_error["campo"]);
        }
        else {
            if (valor.length > 30) {
                mostrar_mensaje_campo("#contraseña", mensajes_error["largo"], 30);
            }
            else {
                if (valor.length < 8) {
                    mostrar_mensaje_campo("#contraseña", mensajes_error["corto"], 8);
                }
                else {
                    var regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
                    if (!regex.test(valor)) {
                        mostrar_mensaje_campo("#contraseña", mensajes_error["regex"]);
                    }
                    else {
                        ocultar_mensaje_campo("#contraseña");
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
        var comparacion = $("#contraseña").val();
        if (valor != comparacion) {
            mostrar_mensaje_campo("#comparacion", mensajes_error["contraseña"]);
        }
        else {
            ocultar_mensaje_campo("#comparacion");
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

    $("#pais").change(function () {
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

});


//Para que sea accesible deberia avisarle al usuario de los cambios
function contraseña_registro() {

    mostrar_ocultar_contraseña("#contraseña");

}

function validar_registro() {

    ocultar_todo(["#nombre", "#apellido", "#correo", "#usuario", "#contraseña", "#comparacion", "#nivel", "#pregunta", "#pais", "#ciudad", "#grado", "#tipo"], "#mensaje_registro");

    $.ajax({
        url: "controller/crear_usuario.php",
        method: "POST",
        data: $('#formulario_registro').serialize(),
        cache: "false",
        beforeSend: function () {
            $("#registro_button").empty();
            $("#registro_button").append("Cargando...");
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

            // Respuesta de Usuario
            if (registro.usuario_campo) {
                mostrar_mensaje_campo("#usuario", mensajes_error["campo"]);
            }
            else {
                if (registro.usuario_max) {
                    mostrar_mensaje_campo("#usuario", mensajes_error["largo"], 30);
                }
                else {
                    if (registro.usuario_min) {
                        mostrar_mensaje_campo("#usuario", mensajes_error["corto"], 6);
                    }
                    else {
                        if (registro.usuario_formato) {
                            mostrar_mensaje_campo("#usuario", mensajes_error["regex"]);
                        }
                        else {
                            if (registro.usuario_existe) {
                                mostrar_mensaje_campo("#usuario", mensajes_error["registrado"]);
                            }
                            else {
                                exitoso("#usuario");
                            }
                        }
                    }
                }
            }

            // Respuesta de Contraseña
            if (registro.contraseña_campo) {
                mostrar_mensaje_campo("#contraseña", mensajes_error["campo"]);
            }
            else {
                if (registro.contraseña_max) {
                    mostrar_mensaje_campo("#contraseña", mensajes_error["largo"], 30);
                }
                else {
                    if (registro.contraseña_min) {
                        mostrar_mensaje_campo("#contraseña", mensajes_error["corto"], 8);
                    }
                    else {
                        if (registro.contraseña_formato) {
                            mostrar_mensaje_campo("#contraseña", mensajes_error["regex"]);
                        }
                        else {
                            if (registro.contraseña_coincide) {
                                mostrar_mensaje_campo("#comparacion", mensajes_error["contraseña"]);
                            }
                            else {
                                exitoso("#contraseña");
                            }
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
                mostrar_mensaje_formulario("#mensaje_registro","error");
                $("#registro_button").empty();
                $("#registro_button").append("Registrarse<i class='material-icons right'>send</i>");
            }
            else {
                $(location).attr("href", registro.url);
            }

        }
    });

    return false;

}