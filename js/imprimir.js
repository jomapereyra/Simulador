function imprimir() {
        
    $("#encabezado").hide();
    $("footer").hide();
    $("#page_title").show();
    $("#encabezado").css("padding-left", "0px");
    $("main").css("padding-left", "0px");
    $("footer").css("padding-left", "0px");
    window.print();
    $("#encabezado").show();
    $("#nav_header").show();
    $("footer").show();
    $("#page_title").hide();
    $("#encabezado").css("padding-left", "300px");
    $("main").css("padding-left", "300px");
    $("footer").css("padding-left", "300px");

}