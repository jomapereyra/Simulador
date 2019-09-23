$(document).ready(function () {

    //Ordenar Lista 1
    $("#ordenar1").sortable();
    $("#ordenar1").disableSelection();
    $("#ordenar1 a").click(function () {
        $("#ordenar1 a").removeClass("active");
        if (!$(this).hasClass('block')) {
            $(this).addClass("active");
        }
    });

    //Ordenar Lista 2
    $("#ordenar2").sortable();
    $("#ordenar2").disableSelection();
    $("#ordenar2 a").click(function () {
        $("#ordenar2 a").removeClass("active");
        if (!$(this).hasClass('block')) {
            $(this).addClass("active");
        }
    });

    //Indico mi etapa inicial
    var indice = 1;

    carga_inicial();

    calcular_progreso();

    //Funcion del boton "Reanudar"
    $("#last").click(function () {

        var ultimo = $("#breadcrumb_autoevaluacion a").last();
        var etapa = ultimo.data("hidden");
        ir_a(etapa);

    });

    /* El evento al presionar el boton siguiente (chequea que haya una etapa siguiente o que se pueda avanzar. En caso de haberla carga sus respuestas) */

    $("#next").click(function () {

        indice = $(".etapa_actual").data("hidden");

        if (indice === undefined) {
            indice = 0;
        }

        if (indice < 6) {

            $.ajax({
                url: "controller/autoevaluacion/autoevaluacion_proxima.php",
                method: "POST",
                data: { etapa: indice },
                cache: "false",
                success: function (resultado) {

                    var registro = JSON.parse(resultado);

                    //Si faltan hacer actividades, no se puede avanzar

                    if (registro.fail) {
                        mostrar_error();
                    }
                    else {

                        var mis_etapas = tamaño_breadcrumb() - 1;

                        $("html").animate({
                            scrollTop: 0
                        }, 800);

                        $("#error_etapa").fadeOut("fast");

                        //Oculto mi etapa actual
                        $(".actual").fadeOut("slow", "swing", function () {

                            //Elimino mi estado actual
                            $(".actual").removeClass("actual");
                            $("#breadcrumb_autoevaluacion a").removeClass("etapa_actual");

                            //Incremento mi indice
                            indice++;

                            //Si es una etapa nueva, la debo cargar
                            if (mis_etapas < indice) {
                                $("#etapa_" + indice).load("view/autoevaluacion/" + registro.etapa);
                                $("#breadcrumb_autoevaluacion").append("<a id='enlace_etapa" + indice + "' data-hidden='" + indice + "' class='breadcrumb font_breadcrumb_big etapa_actual' onclick='ir_a(" + indice + ");'>" + registro.nombre_etapa + "</a>");
                            }

                            //Actualizo mi etapa actual
                            $("#etapa_" + indice).addClass("actual");
                            $("#enlace_etapa" + indice).addClass("etapa_actual");
                            $("#etapa_" + indice).fadeIn("slow");

                            //Si es necesario, cambio el tamaño de mi breadcrumb
                            if (tamaño_breadcrumb() > 3) {
                                $("#breadcrumb_autoevaluacion a").removeClass("font_breadcrumb_big");
                                $("#breadcrumb_autoevaluacion a").addClass("font_breadcrumb_small");
                            }

                        });

                        if (indice == 5) {
                            $("#next_button").fadeOut("slow", "swing", function () {
                                $("#finish_button").fadeIn("slow");
                            });
                        }

                    }

                }
            });

        }

    });

    /* El evento al presionar el boton anterior (chequea que haya una etapa anterior y een caso de haberla carga sus respuestas) */

    $("#prev").click(function () {

        indice = $(".etapa_actual").data("hidden");

        if (indice === undefined) {
            indice = 1;
        }

        if (indice > 0) {

            $.ajax({
                url: "controller/autoevaluacion/autoevaluacion_anterior.php",
                method: "POST",
                data: { etapa: indice },
                cache: "false",
                success: function (resultado) {

                    var registro = JSON.parse(resultado);

                    $("html").animate({
                        scrollTop: 0
                    }, 800);

                    $("#error_etapa").fadeOut("fast");

                    //Oculto mi etapa actual
                    $(".actual").fadeOut("slow", "swing", function () {

                        //Elimino mi estado actual
                        $(".actual").removeClass("actual");
                        $("#breadcrumb_autoevaluacion a").removeClass("etapa_actual");

                        //Decremento mi indice
                        indice--;

                        //Actualizo mi etapa actual
                        $("#etapa_" + indice).addClass("actual");
                        $("#enlace_etapa" + indice).addClass("etapa_actual");
                        $("#etapa_" + indice).fadeIn("slow");

                    });

                }

            });

            if (indice == 6) {
                $("#finish_button").fadeOut("slow", "swing", function () {
                    $("#next_button").fadeIn("slow");
                });
            }

        }
    });

});

/* Muestra un mensaje de respuesta correcta */

function mostrar_correcto(id) {

    var boton = id + "_button";
    var id_respuesta = id + "_respuesta";

    $(boton).fadeOut("slow", "swing", function () {
        $(boton).remove();
        $(id_respuesta).removeClass();
        $(id_respuesta).empty();
        $(id_respuesta).addClass("card-panel green lighten-1");
        var html = "<div class='white-text'><h4 class='valign-wrapper'><i class='small material-icons left'>check_circle</i>Correcto: Felicitaciones!</h4></div>";
        $(id_respuesta).append(html);
        $(id_respuesta).fadeIn("slow");
    });

}

/* Muestra un mensaje de respuesta incorrecta con la correspondiente solucion */

function mostrar_incorrecto(id, solucion) {

    var boton = id + "_button";
    var id_respuesta = id + "_respuesta";

    $(boton).fadeOut("slow", "swing", function () {
        $(boton).remove();
        $(id_respuesta).removeClass();
        $(id_respuesta).empty();
        $(id_respuesta).addClass("card-panel red lighten-1");
        var html = "<div class='white-text'><h4 class='valign-wrapper'><i class='small material-icons left'>error</i>Incorrecto</h4><p>- Solución:</p><p>" + solucion + "</p></div>";
        $(id_respuesta).append(html);
        $(id_respuesta).fadeIn("slow");
    });
}

/* Muestra un mensaje si no se puede avanzar en la etapa siguiente */

function mostrar_error() {

    $("#error_etapa").addClass("red lighten-1");
    $("#error_etapa").empty();
    var html = "<div class='white-text'><h4 class='valign-wrapper'>Etapa incompleta:</h4><p>Faltan realizar algunas actividades</p></div>";
    $("#error_etapa").append(html);
    $("#error_etapa").fadeIn("slow");

}

/* Muestra un mensaje de advertencia para que se completen todos los campos de la actividad */

function mostrar_advertencia(id) {

    var id_respuesta = id + "_respuesta";
    $(id_respuesta).removeClass();
    $(id_respuesta).empty();
    $(id_respuesta).addClass("card-panel yellow darken-3");
    $(id_respuesta).addClass("h-margin");
    var html = "<div class='white-text'><h4 class='valign-wrapper'><i class='small material-icons left'>error</i>Actividad incompleta</h4><p>Para realizar la actividad se deben completar todos sus campos</p></div>";
    $(id_respuesta).append(html);
    $(id_respuesta).fadeIn("slow");

}

// El envio de respuesta de una actividad tipo ordenar. 

function enviar_respuesta_ordenar(tamaño, id, etapa, actividad) {

    var orden = new Array(tamaño);
    var i = 0;

    $("#" + id + " a").each(function () {
        orden[i] = $(this).data("hidden");
        i++;
    });

    $.ajax({
        url: "controller/autoevaluacion/respuesta_actividad.php",
        method: "POST",
        data: { 'orden': JSON.stringify(orden), 'etapa': etapa, 'actividad': actividad },
        cache: "false",
        success: function (resultado) {

            var registro = JSON.parse(resultado);

            if (registro.error) {
                mostrar_advertencia("#" + id);
            }
            else {

                if (registro.correcto) {

                    mostrar_correcto("#" + id);

                }
                else {

                    mostrar_incorrecto("#" + id, registro.solucion);

                }

                desactivar_recurso("ordenar", id);

                calcular_progreso();

            }

        }

    });
}

// Envia la respuesta de un recurso tipo vof,multiple o rellenar

function enviar_respuesta(id, recurso) {

    $.ajax({
        url: "controller/autoevaluacion/respuesta_actividad.php",
        method: "POST",
        data: $('#formulario_' + id).serialize(),
        cache: "false",
        success: function (resultado) {

            var registro = JSON.parse(resultado);

            if (registro.error) {
                mostrar_advertencia("#" + id);
            }
            else {

                if (registro.correcto) {

                    mostrar_correcto("#" + id);

                }
                else {

                    mostrar_incorrecto("#" + id, registro.solucion);

                }

                if (recurso == "rellenar") {
                    rellenar_respuesta(registro.rellenar, registro.seteo);
                }

                desactivar_recurso(recurso, id);

                calcular_progreso();

            }

        }
    });

}

// Registra las respuestas correctas e incorrectas de la actividad Rellenar

function rellenar_respuesta(respuestas, seteo) {

    var index = 0;
    $("#formulario_rellenar input").each(function () {
        if (respuestas[index]) {
            $(this).addClass("rellenar_correcto");
            $(this).val(seteo[index]);
        }
        else {
            $(this).addClass("rellenar_incorrecto");
        }
        index++;
    });

}

// Deshabilita un determinado recurso

function desactivar_recurso(recurso, id) {
    switch (recurso) {

        case "vof":

            $("#formulario_" + id + " input").attr("disabled", true);

            break;

        case "multiple":

            $("#formulario_" + id + " input").attr("disabled", true);

            break;

        case "ordenar":

            $("#" + id).sortable();
            $("#" + id).sortable("disable");
            $("#" + id + " a").removeClass("active");
            $("#" + id + " a").addClass("block");

            break;

        case "rellenar":

            $("#formulario_" + id + " input").attr("disabled", true);

            break;

    }
}

//Evento que capta el click de la lista a ordenar

function seleccionar_ordenar(id, idFather) {

    if (!$("#" + id).hasClass('block')) {

        $("#" + idFather + " a").removeClass("active");
        $("#" + id).addClass("active");

    }

}


/* Carga las respuestas de una etapa especifica */

function cargar_etapa(num) {

    if (num < 5) {

        var numero = num + 1;

        $.ajax({
            url: "controller/autoevaluacion/traer_etapa.php",
            method: "POST",
            cache: "false",
            data: { 'etapa': numero },
            success: function (resultado) {

                var registro = JSON.parse(resultado);

                for (index = 0; index < registro.cant_actividades; index++) {

                    num_actividad = index + 1;

                    if (registro.completada[index]) {

                        mostrar_respuestas(registro.recurso[index], registro.respuestas["actividad_" + num_actividad], registro.id[index]);

                        if (registro.correcto[index]) {

                            mostrar_correcto("#" + registro.id[index]);

                        }
                        else {

                            mostrar_incorrecto("#" + registro.id[index], registro.solucion["actividad_" + num_actividad]);

                        }

                    }

                }

            }

        });

    }

}

// Muestra la respuesta y deshabilita los campos correspondientes

function mostrar_respuestas(recurso, respuestas, id) {

    switch (recurso) {

        case "vof":

            $("#formulario_" + id + " input").attr("checked", false);
            jQuery.each(respuestas, function (i, val) {
                $(val).attr("checked", true);
            });

            desactivar_recurso(recurso, id);

            break;

        case "multiple":

            jQuery.each(respuestas, function (i, val) {
                $(val).attr("checked", true);
            });
            desactivar_recurso(recurso, id);

            break;

        case "ordenar":

            var index = 0;
            jQuery.each(respuestas, function (index, val) {
                if (index == 0) {
                    $(val).insertBefore("#" + id + ":first-child");
                }
                else {
                    $(val).insertAfter($(respuestas[index - 1]));
                }
            });

            desactivar_recurso(recurso, id);

            break;

        case "rellenar":

            var index = 0;
            $("#formulario_" + id + " input").each(function () {
                $(this).val(respuestas.valor[index]);
                if (respuestas.calificacion[index]) {
                    $(this).addClass("rellenar_correcto");
                }
                else {
                    $(this).addClass("rellenar_incorrecto");
                }
                index++;
            });
            desactivar_recurso(recurso, id);

            break;

    }

}

/* En base a la cantidad total de actividades, mide el progreesso actual del alumno */

function calcular_progreso() {

    $.ajax({
        url: "controller/autoevaluacion/calcular_progreso.php",
        method: "POST",
        cache: "false",
        success: function (resultado) {

            $("#mi_porcentaje").empty();
            $("#mi_porcentaje").append(resultado);
            $(".determinate").css("width", resultado);

        }
    });

}

//Carga que reanuda el recorrido del usuario

function carga_inicial() {

    $.ajax({
        url: "controller/autoevaluacion/traer_inicial.php",
        method: "POST",
        cache: "false",
        success: function (resultado) {

            var registro = JSON.parse(resultado);

            var clase_breadcrumb = "font_breadcrumb_big";

            var tamaño = registro.nombres.length;

            //Cargo el breadcrumb

            if (tamaño > 3) {

                clase_breadcrumb = "font_breadcrumb_small";

            }

            if (tamaño > 1) {
                jQuery.each(registro.nombres, function (index, val) {
                    $("#breadcrumb_autoevaluacion").append("<a id='enlace_etapa" + index + "' data-hidden='" + index + "' class='breadcrumb " + clase_breadcrumb + "' onclick='ir_a(" + index + ");' href='#'>" + val + "</a>");
                });
            }
            else {
                $("#breadcrumb_autoevaluacion").append("<a id='enlace_etapa0' data-hidden='0' class='breadcrumb " + clase_breadcrumb + "' onclick='ir_a(0);' href='#'>Autoanálisis</a>");
            }

            $("#enlace_etapa0").addClass("etapa_actual");

            //Cargo las paginas que ya recorri junto a sus respuestas

            jQuery.each(registro.paginas, function (index, val) {
                $("#etapa_" + index).load("view/autoevaluacion/" + val + ".html");
                cargar_etapa(index);
            });

        }
    });
}

//Abre alguna etapa ya recorrida a partir de seleccionarla en el bread

function ir_a(etapa) {

    //Quito el mensaje de error (een caso que exista)
    $("#error_etapa").fadeOut("fast");

    //Quito la marca actual del bread
    $("#breadcrumb_autoevaluacion a").removeClass("etapa_actual");

    //Agrego la marca al bread
    $("#enlace_etapa" + etapa).addClass("etapa_actual");

    $(".actual").fadeOut("slow", "swing");
    $(".actual").removeClass("actual");
    $("#etapa_" + etapa).addClass("actual");
    $(".actual").fadeIn("slow");

    if (etapa == 6) {
        $("#next_button").fadeOut("slow", "swing", function () {
            $("#finish_button").fadeIn("slow");
        });
    }
    else {
        $("#finish_button").fadeOut("slow", "swing", function () {
            $("#next_button").fadeIn("slow");
        });
    }

}

//Retorna la cantidad de etapa recorridas

function tamaño_breadcrumb() {

    var tamaño = 0;

    $("#breadcrumb_autoevaluacion a").each(function () {
        tamaño++;
    });

    return tamaño;

}

//Funciones de la actividad ordenar

function arriba(id) {
    item = $("#" + id + " .active");
    before = item.prev();
    item.insertBefore(before);
}

function abajo(id) {
    item = $("#" + id + " .active");
    after = item.next();
    item.insertAfter(after);
}

//Finalizar Autoevaluacion

function finalizar() {

    $.ajax({
        url: "controller/autoevaluacion/finalizar.php",
        method: "POST",
        cache: "false",
        success: function (resultado) {

            var registro = JSON.parse(resultado);

            console.log(resultado);

            if (registro.fail) {
                mostrar_error();
            }
            else {

                //Modifico el bread
                $("#breadcrumb_autoevaluacion").fadeOut("slow", "swing", function () {
                    $("#breadcrumb_autoevaluacion").empty();
                    $("#breadcrumb_autoevaluacion").append("<a class='breadcrumb font_breadcrumb_big etapa_actual'>Autoevaluación finalizada</a>");
                    $("#breadcrumb_autoevaluacion").fadeIn("slow");
                });

                //Mostrar estadisticas, recomendacion y formulario
                $("#resultado").load("view/autoevaluacion/final.html", function () {
                    $("#etapa_6").fadeOut("slow", "swing", function () {
                        $("#auto_options").remove();
                        $("#resultado").fadeIn("slow");
                    });
                    $("#correctas").append(" "+registro.cant_correctas);
                    if (registro.recomendacion) {
                        $("#recomendacion").fadeIn("slow");
                        $("#recomendacion").append("Te recomendamos volver a realizar las actividades.")
                    }
                });

            }

        }
    });
}