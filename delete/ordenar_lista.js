$(document).ready(function () {

    $("#sortable").sortable();
    $("#sortable").disableSelection();

    $("#sortable a").click(function () {
        $("#sortable a").removeClass("active");
        if(!$(this).hasClass('block')){
            $(this).addClass("active");
        }
    });


})

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