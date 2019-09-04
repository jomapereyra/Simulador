$(document).ready(function () {

    $('.sidenav').sidenav({
        onCloseEnd: function () {
            $(".sidenav").fadeOut();
            activar_focus();
        },
        onOpenStart: function () {
            $(".sidenav").fadeIn();
            desactivar_focus();
            $(".primero").focus();
        }
    });

    //Comportamiento al abrir el sidenav
    $("#nav").click(function () {
        $('.sidenav').sidenav("open");
        $("#encabezado").css("padding-left", "300px");
        $("main").css("padding-left", "300px");
        $("footer").css("padding-left", "300px");
    })

    //Comportamiento al tocar el overlay
    $(".sidenav-overlay").click(function () {
        $("#encabezado").css("padding-left", "0px");
        $("main").css("padding-left", "0px");
        $("footer").css("padding-left", "0px");
    })

    //Actualizacion de las pestañas del navegador
    
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

    $("#nav_header li").each(function () {
        if ($(this).children().attr("href") == pgurl || $(this).children().attr("href") == pgurl+"#") {
            $(this).addClass("active");
            $(this).children().focus();
        }
        else {
            $(this).removeClass("active");
        }
    })

    if (pgurl == "") {
        $("#nav_header li").removeClass("active");
        $("#login").addClass("active");
        $("#inicio").addClass("active");
        $("#inicio").children().focus();
    }

    if (pgurl == "index.php?page=configuraciones") {
        $("#opciones").addClass("active");
        $("#opciones").children().focus();
    }


});

//Cerrar sidenav
function cerrar() {
    $('.sidenav').sidenav("close");
    $("#encabezado").css("padding-left", "0px");
    $("main").css("padding-left", "0px");
    $("footer").css("padding-left", "0px");
}

function desactivar_focus() {
    $('.accesible').each(function () {
        var elem = $(this);
        elem.attr("tabindex", "-1");
    });
}

function activar_focus(){
    var index=1;
    $('.accesible').each(function () {
        var elem = $(this);
        elem.attr("tabindex", index);
        index++;
    });
    $("#menu_sitio").focus();
    $("#nav").focus();

}




