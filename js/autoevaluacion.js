$(document).ready(function () {

    //Ordenar Lista
    $("#sortable").sortable();
    $("#sortable").disableSelection();

    $("#sortable a").click(function () {
        $("#sortable a").removeClass("active");
        if(!$(this).hasClass('block')){
            $(this).addClass("active");
        }
    });

    //Indico mi etapa inicial
    var indice = 1;

    cargar_etapa(indice);

    cargar_breadcrumb();

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

                    console.log(resultado);

                    var registro = JSON.parse(resultado);

                    //Si faltan hacer actividades, no se puede avanzar

                    if (registro.fail) {
                        mostrar_error();
                    }
                    else {

                        $("html").animate({
                            scrollTop: 0
                        }, 800);

                        $("#error_etapa").fadeOut("fast");

                        $("#contenido").fadeOut("slow", "swing", function () {
                            $("#contenido").load("view/autoevaluacion/" + registro.etapa, cargar_etapa(registro.num_etapa));
                            $("#contenido").fadeIn("slow");
                        });

                        indice++;

                        $("#breadcrumb_autoevaluacion a").removeClass("etapa_actual");

                        //Es necesario crear el enlace en caso de que sea la primera vez que se acede a la etapa

                        if (!breadcrumb_incluye(registro.num_etapa)) {
                            $("#breadcrumb_autoevaluacion").append("<a id='enlace_etapa" + indice + "' data-hidden='" + indice + "' class='breadcrumb font_breadcrumb_big etapa_actual' onclick='ir_a(" + indice + ");'>" + registro.nombre_etapa + "</a>");
                        }
                        else {

                            //Sino solo debemos iluminar el enlace que ya esta creado

                            $("#enlace_etapa" + indice).addClass("etapa_actual");

                        }

                        if (tamaño_breadcrumb() > 3) {
                            $("#breadcrumb_autoevaluacion a").removeClass("font_breadcrumb_big");
                            $("#breadcrumb_autoevaluacion a").addClass("font_breadcrumb_small");
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

                    $("#contenido").fadeOut("slow", "swing", function () {
                        $("#contenido").load("view/autoevaluacion/" + registro.etapa, cargar_etapa(registro.num_etapa));
                        $("#contenido").fadeIn("slow");
                    });

                    //$("#breadcrumb_autoevaluacion a").filter(":contains('" + registro.quitar + "')").remove();

                    $("#breadcrumb_autoevaluacion a").removeClass("etapa_actual");
                    $("#enlace_etapa" + registro.num_etapa).addClass("etapa_actual");

                    indice--;

                }

            });

        }
    });


});


/*
function ventana_emergente(pagina) {
    window.open(pagina, 'TituloParaLaNuevaVentana', 'toolbar=yes');
}
*/

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

function enviar_respuesta_ordenar(tamaño, calcular_respuesta) {

    var orden = new Array(tamaño);
    var i = 0;

    $("#sortable a").each(function () {
        orden[i] = $(this).data("hidden");
        i++;
    });

    $.ajax({
        url: "controller/autoevaluacion/" + calcular_respuesta + ".php",
        method: "POST",
        data: { 'orden': JSON.stringify(orden) },
        cache: "false",
        success: function (resultado) {

            var registro = JSON.parse(resultado);

            if (registro.error) {
                mostrar_advertencia("#ordenar");
            }
            else {

                if (registro.correcto) {

                    mostrar_correcto("#ordenar");

                }
                else {

                    mostrar_incorrecto("#ordenar", registro.solucion);

                }

                desactivar_recurso("ordenar");

                calcular_progreso();

            }

        }

    });
}

// Envia la respuesta de un recurso tipo vof,multiple o rellenar
// Deberia cargar solo un archivo php y este quee se encarge de hacer el procesamiento correspondiente

function enviar_respuesta(id, recurso, calcular_respuesta) {

    $.ajax({
        url: "controller/autoevaluacion/" + calcular_respuesta + ".php",
        method: "POST",
        data: $('#formulario_' + recurso).serialize(),
        cache: "false",
        success: function (resultado) {

            console.log(resultado);

            var registro = JSON.parse(resultado);

            if (registro.error) {
                mostrar_advertencia(id);
            }
            else {

                if (registro.correcto) {

                    mostrar_correcto(id);

                }
                else {

                    mostrar_incorrecto(id, registro.solucion);

                }

                if (recurso == "rellenar") {
                    rellenar_respuesta(registro.rellenar, registro.seteo);
                }

                desactivar_recurso(recurso);

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

function desactivar_recurso(recurso) {
    switch (recurso) {

        case "vof":

            $("#formulario_vof input").attr("disabled", true);

            break;

        case "multiple":

            $("#formulario_multiple input").attr("disabled", true);

            break;

        case "ordenar":

            $("#sortable").sortable();
            $("#sortable").sortable("disable");
            $("#sortable a").removeClass("active");
            $("#sortable a").addClass("block");

            break;

        case "rellenar":

            $("#formulario_rellenar input").attr("disabled", true);

            break;

    }
}

//Evento que capta el click de la lista a ordenar

function seleccionar_ordenar(num) {

    var id = "#orden_" + num;

    if (!$(id).hasClass('block')) {

        $("#sortable a").removeClass("active");
        $(id).addClass("active");

    }


}


/* Carga las respuestas de una etapa especifica */

function cargar_etapa(numero) {

    var cant=[0,3,1,1,1,1];

    $.ajax({
        url: "controller/autoevaluacion/traer_etapa.php",
        method: "POST",
        cache: "false",
        data: { etapa: numero, cant_actividades: cant[numero] },
        success: function (resultado) {

            console.log(resultado);

            var registro = JSON.parse(resultado);

            for (index = 0; index < cant[numero]; index++) {

                num_actividad = index + 1;

                if (registro.completada[index]) {

                    mostrar_respuestas(registro.recurso[index], registro.respuestas["actividad_" + num_actividad]);

                    if (registro.correcto[index]) {

                        mostrar_correcto(registro.id[index]);

                    }
                    else {

                        mostrar_incorrecto(registro.id[index], registro.solucion["actividad_" + num_actividad]);

                    }

                }

            }

        }

    });

    if(numero == 6){
        progreso_finalizado();
    }

}


// Carga la respuesta de una actividad especifica

/*function cargar(id, traer_respuestas, recurso) {

    $.ajax({
        url: "controller/autoevaluacion/" + traer_respuestas + ".php",
        method: "POST",
        cache: "false",
        success: function (resultado) {

            var registro = JSON.parse(resultado);

            if (registro.completada) {

                mostrar_respuestas(recurso, registro.respuestas);

                if (registro.correcto) {

                    mostrar_correcto(id);

                }
                else {

                    mostrar_incorrecto(id, registro.solucion);

                }

            }

        }
    });

}*/

// Muestra la respuesta y deshabilita los campos correspondientes

function mostrar_respuestas(recurso, respuestas) {

    switch (recurso) {

        case "vof":

            $("#formulario_vof input").attr("checked", false);
            jQuery.each(respuestas, function (i, val) {
                $(val).attr("checked", true);
            });
            $("#formulario_vof input").attr("disabled", true);

            break;

        case "multiple":

            jQuery.each(respuestas, function (i, val) {
                $(val).attr("checked", true);
            });
            $("#formulario_multiple input").attr("disabled", true);

            break;

        case "ordenar":

            var index = 0;
            jQuery.each(respuestas, function (index, val) {
                $(val).insertBefore($(respuestas[index + 1]));
            });
            $(respuestas[index]).insertBefore(respuestas[index + 1]);
            $("#sortable").sortable();
            $("#sortable").sortable("disable");
            $("#sortable a").removeClass("active");
            $("#sortable a").addClass("block");

            break;

        case "rellenar":

            var index = 0;
            $("#formulario_rellenar input").each(function () {
                $(this).val(respuestas.valor[index]);
                if (respuestas.calificacion[index]) {
                    $(this).addClass("rellenar_correcto");
                }
                else {
                    $(this).addClass("rellenar_incorrecto");
                }
                index++;
            });
            $("#formulario_rellenar input").attr("disabled", true);

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

function progreso_finalizado() {

    $("#mi_porcentaje").empty();
    $("#mi_porcentaje").append("100%");
    $(".determinate").css("width", "100%");

}

function cargar_breadcrumb() {


    $.ajax({
        url: "controller/autoevaluacion/traer_breadcrumb.php",
        method: "POST",
        cache: "false",
        success: function (resultado) {

            var registro = JSON.parse(resultado);

            var clase_breadcrumb = "font_breadcrumb_big";

            var tamaño = registro.contenido.length;

            if (tamaño > 3) {

                clase_breadcrumb = "font_breadcrumb_small";

            }

            if (tamaño > 1) {
                jQuery.each(registro.contenido, function (index, val) {
                    $("#breadcrumb_autoevaluacion").append("<a id='enlace_etapa" + index + "' data-hidden='" + index + "' class='breadcrumb " + clase_breadcrumb + "' onclick='ir_a(" + index + ");' href='#'>" + val + "</a>");
                });
            }
            else {
                $("#breadcrumb_autoevaluacion").append("<a id='enlace_etapa0' data-hidden='0' class='breadcrumb " + clase_breadcrumb + "' onclick='ir_a(0);' href='#'>Autoanálisis</a>");
            }

            $("#enlace_etapa0").addClass("etapa_actual");

            return tamaño;

        }
    });
}

function ir_a(etapa) {

    var correspondencia_pagina = ['autoanalisis', 'preparate', 'lenguaje_corporal', 'tienes_un_minuto', 'negociar', 'repasemos', 'llego_el_momento'];

    $("#contenido").fadeOut("slow", "swing", function () {
        $("#contenido").load("view/autoevaluacion/" + correspondencia_pagina[etapa] + ".html", cargar_etapa(etapa));
        $("#contenido").fadeIn("slow");
    });

    $("#breadcrumb_autoevaluacion a").removeClass("etapa_actual");
    $("#enlace_etapa" + etapa).addClass("etapa_actual");

}

function breadcrumb_incluye(indice) {

    console.log("este es el parametro:" + indice);
    var existe = false;
    $("#breadcrumb_autoevaluacion a").each(function () {
        var num = $(this).data("hidden");
        console.log(num);
        if (num == indice) {
            existe = true;
        }
    });
    console.log(existe);
    return existe;
}

function tamaño_breadcrumb() {

    var tamaño = 0;

    $("#breadcrumb_autoevaluacion a").each(function () {
        tamaño++;
    });

    console.log("tamaño " + tamaño);

    return tamaño;

}

//Funciones de la actividad ordenar

function arriba() {
    item = $("#sortable .active");
    before = item.prev();
    item.insertBefore(before);
}

function abajo() {
    item = $("#sortable .active");
    after = item.next();
    item.insertAfter(after);
}

function desactivar() {
    $("#sortable").sortable("disable");
}

function ordenar(item1, item2, item3) {
    $(item1).insertBefore($(item2));
    $(item3).insertAfter($(item2));
}