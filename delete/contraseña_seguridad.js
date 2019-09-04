function mostrar_ocultar_contraseña_actual() {
    if($("#contraseña_actual").attr('type')=="password"){
        $("#contraseña_actual").attr('type','text');
    }
    else{
        $("#contraseña_actual").attr('type','password');
    }
    
}

function mostrar_ocultar_contraseña_nueva() {
    if($("#contraseña_nueva").attr('type')=="password"){
        $("#contraseña_nueva").attr('type','text');
    }
    else{
        $("#contraseña_nueva").attr('type','password');
    }
    
}