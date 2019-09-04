$(document).ready(function () {

    var mensajes_error = {
        "campo": "El campo 0 no debe estar vacio",
        "largo": "El campo 0 no debe superar los 1 caracteres",
        "corto": "Debe ingresar al menos 1 caracteres en el campo 0",
        "regex": "Este campo no respeta un formato de 0 válido",
        "registrado": "Este 0 ya se encuentra registrado. Por favor, ingrese otro",
        "contraseña": "Las contraseñas ingresadas no coinciden",
        "select": "Debe seleccionar un 0",
        "cambio": "El dato seleccionado no existe. Por favor, no intente cambiar el HTML",
        "cambio_radio": "No se ha seleccionado ningun dato. Por favor, no intente cambiar el HTML",
    };

    var error = [false, false, false, false, false, false, false, false, false];

    $("#nombre").change(function () {
        var valor = $("#nombre").val();
        if (valor == "") {
            mostrar_advertencia("#nombre_error", "#nombre", mensajes_error["campo"], 0);
        }
        else {
            if (valor.length > 30) {
                mostrar_advertencia("#nombre_error", "#nombre", mensajes_error["largo"], 30);
            }
            else {
                var regex = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ]+$/;
                if (!regex.test(valor)) {
                    mostrar_advertencia("#nombre_error", "#nombre", mensajes_error["regex"], 0);
                }
                else {
                    $("#nombre_error").empty();
                    exitoso("#nombre");
                    error[0] = true;
                    if (!error.includes(false)) {
                        limpiar_error();
                    }
                }
            }
        }
    });

    $("#apellido").change(function () {
        var valor = $("#apellido").val();
        if (valor == "") {
            mostrar_advertencia("#apellido_error", "#apellido", mensajes_error["campo"], 0);
        }
        else {
            if (valor.length > 30) {
                mostrar_advertencia("#apellido_error", "#apellido", mensajes_error["largo"], 30);
            }
            else {
                var regex = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ]+$/;
                if (!regex.test(valor)) {
                    mostrar_advertencia("#apellido_error", "#apellido", mensajes_error["regex"], 0);
                }
                else {
                    $("#apellido_error").empty();
                    exitoso("#apellido");
                    error[1] = true;
                    if (!error.includes(false)) {
                        limpiar_error();
                    }
                }
            }
        }
    });

    $("#correo").change(function () {
        var valor = $("#correo").val();
        if (valor == "") {
            mostrar_advertencia("#correo_error", "#correo", mensajes_error["campo"], 0);
        }
        else {
            if (valor.length > 40) {
                mostrar_advertencia("#correo_error", "#correo", mensajes_error["largo"], 40);
            }
            else {
                var regex = /\w+@\w+\.+[a-z]/;
                if (!regex.test(valor)) {
                    mostrar_advertencia("#correo_error", "#correo", mensajes_error["regex"], 0);
                }
                else {
                    $("#correo_error").empty();
                    exitoso("#correo");
                    error[2] = true;
                    if (!error.includes(false)) {
                        limpiar_error();
                    }
                }
            }
        }
    });

    $("#usuario").change(function () {
        var valor = $("#usuario").val();
        if (valor == "") {
            mostrar_advertencia("#usuario_error", "#usuario", mensajes_error["campo"], 0);
        }
        else {
            if (valor.length > 30) {
                mostrar_advertencia("#usuario_error", "#usuario", mensajes_error["largo"], 30);
            }
            else {
                if (valor.length < 6) {
                    mostrar_advertencia("#usuario_error", "#usuario", mensajes_error["corto"], 6);
                }
                else {

                    var regex = /^\w+$/;
                    if (!regex.test(valor)) {
                        mostrar_advertencia("#usuario_error", "#usuario", mensajes_error["regex"], 0);
                    }
                    else {
                        $("#usuario_error").empty();
                        exitoso("#usuario");
                        error[3] = true;
                        if (!error.includes(false)) {
                            limpiar_error();
                        }
                    }

                }

            }
        }
    });

    $("#contraseña").change(function () {
        var valor = $("#contraseña").val();
        var comparacion = $("#comparacion").val();
        if (valor == "") {
            mostrar_advertencia("#contraseña_error", "#contraseña", mensajes_error["campo"], 0);
        }
        else {
            if (valor.length > 30) {
                mostrar_advertencia("#contraseña_error", "#contraseña", mensajes_error["largo"], 30);
            }
            else {
                if (valor.length < 8) {
                    mostrar_advertencia("#contraseña_error", "#contraseña", mensajes_error["corto"], 8);
                }
                else {
                    var regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
                    if (!regex.test(valor)) {
                        mostrar_advertencia("#contraseña_error", "#contraseña", mensajes_error["regex"], 0);
                    }
                    else {
                        $("#contraseña_error").empty();
                        exitoso("#contraseña");
                        error[4] = true;
                        if (!error.includes(false)) {
                            limpiar_error();
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
        var comparacion = $("#contraseña").val();
        if (valor != comparacion) {
            mostrar_advertencia("#comparacion_error", "#comparacion", mensajes_error["contraseña"], 0);
        }
        else {
            $("#comparacion_error").empty();
            exitoso("#comparacion");
            error[5] = true;
            if (!error.includes(false)) {
                limpiar_error();
            }
        }
    });

    $("#ciudad").change(function () {
        var valor = $("#ciudad").val();
        if (valor == "") {
            mostrar_advertencia("#ciudad_error", "#ciudad", mensajes_error["campo"], 0);
        }
        else {
            if (valor.length > 40) {
                mostrar_advertencia("#ciudad_error", "#ciudad", mensajes_error["largo"], 40);
            }
            else {
                $("#ciudad_error").empty();
                exitoso("#ciudad");
                error[6] = true;
                if (!error.includes(false)) {
                    limpiar_error();
                }
            }
        }
    });

    $("#pais").click(function () {
        var valor = $("#pais").val();
        if (valor == "") {
            mostrar_advertencia("#pais_error", "#pais", mensajes_error["select"], 0);
        }
        else {
            $("#pais_error").empty();
            exitoso("#pais");
            error[7] = true;
            if (!error.includes(false)) {
                limpiar_error();
            }
        }
    });

    $("#grado").change(function () {
        var valor = $("#grado").val();
        if (valor == "") {
            mostrar_advertencia("#grado_error", "#grado", mensajes_error["select"], 0);
        }
        else {
            $("#grado_error").empty();
            exitoso("#grado");
            error[8] = true;
            if (!error.includes(false)) {
                limpiar_error();
            }
        }
    });

});

function mostrar_ocultar_contraseña() {
    if($("#contraseña").attr('type')=="password"){
        $("#contraseña").attr('type','text');
    }
    else{
        $("#contraseña").attr('type','password');
    }
    
}

function enviar_error(mensaje) {
    $("#error").empty();
    var html = "<div class='card-panel red lighten-1'><span class='white-text valign-wrapper'style='font-weight: bold'><div class='col s2 center-align'><i class='small material-icons' aria-hidden='true' focusable='false'>error</i></div><div id='mensaje_error' class='col s10'>" + mensaje + "</div></span></div>";
    $("#error").append(html);
    $("#error").fadeIn();
}

function limpiar_error() {
    $("#error").empty();
}

function limpiar_todo() {
    limpiar_error();
    $("#nombre_error").empty();
    $("#apellido_error").empty();
    $("#correo_error").empty();
    $("#usuario_error").empty();
    $("#tipo_error").empty();
    $("#grado_error").empty();
    $("#pais_error").empty();
    $("#ciudad_error").empty();
    $("#nivel_error").empty();
    $("#contraseña_error").empty();
    $("#pregunta_error").empty();

}

function enviar_notificacion(mensaje) {
    $("#error").empty();
    var html = "<div class='card-panel green lighten-1'><span class='white-text valign-wrapper'style='font-weight: bold'><div class='col s2 center-align'><i class='small material-icons'>email</i></div><div class='col s10'>" + mensaje + "</div></span></div>";
    $("#error").append(html);
    $("#error").fadeIn();
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

function validar_registro() {

    var mensajes_error = {
        "campo": "El campo 0 no debe estar vacio",
        "largo": "El campo 0 no debe superar los 1 caracteres",
        "corto": "Debe ingresar al menos 1 caracteres en el campo 0",
        "regex": "Este campo no respeta un formato de 0 válido",
        "registrado": "Este 0 ya se encuentra registrado. Por favor, ingrese otro",
        "contraseña": "Las contraseñas ingresadas no coinciden",
        "select": "Debe seleccionar un 0",
        "cambio": "El dato seleccionado no existe. Por favor, no intente cambiar el HTML",
        "cambio_radio": "No se ha seleccionado ningun dato. Por favor, no intente cambiar el HTML",
    };

    limpiar_todo();

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

            window.setTimeout(function () {

                var registro = JSON.parse(resultado);

                // Respuesta de Nombre
                if (registro.nombre_campo) {
                    mostrar_advertencia("#nombre_error", "#nombre", mensajes_error["campo"], 0);
                }
                else {
                    if (registro.nombre_max) {
                        mostrar_advertencia("#nombre_error", "#nombre", mensajes_error["largo"], 30);
                    }
                    else {
                        if (registro.nombre_formato) {
                            mostrar_advertencia("#nombre_error", "#nombre", mensajes_error["regex"], 0);
                        }
                        else {
                            exitoso("#nombre");
                        }
                    }
                }

                // Respuesta de Apellido
                if (registro.apellido_campo) {
                    mostrar_advertencia("#apellido_error", "#apellido", mensajes_error["campo"], 0);
                }
                else {
                    if (registro.apellido_max) {
                        mostrar_advertencia("#apellido_error", "#apellido", mensajes_error["largo"], 30);
                    }
                    else {
                        if (registro.apellido_formato) {
                            mostrar_advertencia("#apellido_error", "#apellido", mensajes_error["regex"], 0);
                        }
                        else {
                            exitoso("#apellido");
                        }
                    }
                }

                // Respuesta de Correo
                if (registro.correo_campo) {
                    mostrar_advertencia("#correo_error", "#correo", mensajes_error["campo"], 0);
                }
                else {
                    if (registro.correo_max) {
                        mostrar_advertencia("#correo_error", "#correo", mensajes_error["largo"], 40);
                    }
                    else {
                        if (registro.correo_formato) {
                            mostrar_advertencia("#correo_error", "#correo", mensajes_error["regex"], 0);
                        }
                        else {
                            if (registro.correo_existe) {
                                mostrar_advertencia("#correo_error", "#correo", mensajes_error["registrado"], 0);
                            }
                            else {
                                exitoso("#correo");
                            }
                        }
                    }
                }

                // Respuesta de Usuario
                if (registro.usuario_campo) {
                    mostrar_advertencia("#usuario_error", "#usuario", mensajes_error["campo"], 0);
                }
                else {
                    if (registro.usuario_max) {
                        mostrar_advertencia("#usuario_error", "#usuario", mensajes_error["largo"], 30);
                    }
                    else {
                        if (registro.usuario_min) {
                            mostrar_advertencia("#usuario_error", "#usuario", mensajes_error["corto"], 6);
                        }
                        else {
                            if (registro.usuario_formato) {
                                mostrar_advertencia("#usuario_error", "#usuario", mensajes_error["regex"], 0);
                            }
                            else {
                                if (registro.usuario_existe) {
                                    mostrar_advertencia("#usuario_error", "#usuario", mensajes_error["registrado"], 0);
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
                    mostrar_advertencia("#contraseña_error", "#contraseña", mensajes_error["campo"], 0);
                }
                else {
                    if (registro.contraseña_max) {
                        mostrar_advertencia("#contraseña_error", "#contraseña", mensajes_error["largo"], 30);
                    }
                    else {
                        if (registro.contraseña_min) {
                            mostrar_advertencia("#contraseña_error", "#contraseña", mensajes_error["corto"], 8);
                        }
                        else {
                            if (registro.contraseña_formato) {
                                mostrar_advertencia("#contraseña_error", "#contraseña", mensajes_error["regex"], 0);
                            }
                            else {
                                if (registro.contraseña_coincide) {
                                    mostrar_advertencia("#comparacion_error", "#comparacion", mensajes_error["contraseña"], 0);
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
                    mostrar_advertencia("#nivel_error", "#nivel", mensajes_error["cambio_radio"], 0);
                }
                else {
                    if (registro.nivel_existe) {
                        mostrar_advertencia("#nivel_error", "#nivel", mensajes_error["cambio"], 0);
                    }
                }

                // Respuesta de Pregunta
                if (registro.pregunta_campo) {
                    mostrar_advertencia("#pregunta_error", "#pregunta", mensajes_error["cambio_radio"], 0);
                }

                // Respuesta de Pais
                if (registro.pais_campo) {
                    mostrar_advertencia("#pais_error", "#pais", mensajes_error["select"], 0);
                }
                else {
                    if (registro.pais_existe) {
                        mostrar_advertencia("#pais_error", "#pais", mensajes_error["cambio"], 0);
                    }
                    else {
                        exitoso("#pais");
                    }
                }

                // Respuesta de Grado
                if (registro.grado_campo) {
                    mostrar_advertencia("#grado_error", "#grado", mensajes_error["select"], 0);
                }
                else {
                    if (registro.grado_existe) {
                        mostrar_advertencia("#grado_error", "#grado", mensajes_error["cambio"], 0);
                    }
                    else {
                        exitoso("#grado");
                    }
                }

                // Respuesta de Tipo
                if (registro.tipo_campo) {
                    mostrar_advertencia("#tipo_error", "#tipo", mensajes_error["cambio_radio"], 0);
                }
                else {
                    if (registro.tipo_existe) {
                        mostrar_advertencia("#tipo_error", "#tipo", mensajes_error["cambio"], 0);
                    }
                }

                // Respuesta de Ciudad
                if (registro.ciudad_campo) {
                    mostrar_advertencia("#ciudad_error", "#ciudad", mensajes_error["campo"], 0);
                }
                else {
                    if (registro.ciudad_max) {
                        mostrar_advertencia("#ciudad_error", "#ciudad", mensajes_error["largo"], 40);
                    }
                    else {
                        exitoso("#ciudad");
                    }
                }

                // Respuesta Conclusion
                if (registro.fail) {
                    enviar_error("Existen algunos errores que deben corregirse. Asegurese de ingresar bien los datos");
                    $("#registro_button").empty();
                    $("#registro_button").append("Registrarse<i class='material-icons right'>send</i>");
                    $("#error").focus();
                }
                else {
                    $(location).attr("href", registro.url);
                }
            }, 1000);

        }
    });

    return false;

}