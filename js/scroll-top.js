// ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // Si la pagina baja mas de 50px
        $('#return-to-top').fadeIn(200);    // Aparece la flecha
    } else {
        $('#return-to-top').fadeOut(200);   // Sino desaparece
    }
});
$('#return-to-top').click(function() {      // Cuando se hace click sobre la flecha
    $('body,html').animate({
        scrollTop : 0                       // Vuelve al top del body
    }, 500);
});