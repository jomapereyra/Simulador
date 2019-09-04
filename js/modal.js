$(document).ready(function () {
    $('.modal').modal({
        onCloseEnd: function(){
            $("#info-button").focus();
        },
        onOpenEnd: function(){
            $("#info-tittle").focus();
        }
    });
});