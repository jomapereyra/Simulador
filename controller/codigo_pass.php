<?php

$resultado = [
    'contraseña_campo' => false,
    'contraseña_max' => false,
    'contraseña_min' => false,
    'contraseña_coincide' => false,
    'contraseña_formato' => false,
    'codigo' => false,
    'fail' => false,
];

require_once '../model/usuario.php';

$usuario = new Usuario();
session_start();
$nombre_usuario = $_SESSION['usuario'];
$datos_usuario = $usuario->buscar_con_usuario($nombre_usuario);
$contraseña_nueva = $_POST['contraseña_nueva'];
$comparacion = $_POST['comparacion'];
$codigo = $_POST['codigo'];

//Regex

$regex_contraseña = "/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/";

//Validacion de la contraseña nueva

if (empty($contraseña_nueva)) {
    $resultado['contraseña_campo'] = true;
} else {
    if (strlen($contraseña_nueva) > 30) {
        $resultado['contraseña_max'] = true;
    } else {
        if (strlen($contraseña_nueva) < 8) {
            $resultado['contraseña_min'] = true;
        } else {
            if (!preg_match($regex_contraseña, $contraseña_nueva)) {
                $resultado['contraseña_formato'] = true;
            } else {
                if ($contraseña_nueva != $comparacion) {
                    $resultado['contraseña_coincide'] = true;
                }
            }
        }
    }
}

//Validacion del codigo

if ($codigo != $datos_usuario['codigo']) {
    $resultado['codigo'] = true;
}

//Conclusion

if (!in_array(true, $resultado)) {
    //Tengo que cambiar la contraseña del usuario
    $contraseña = password_hash($contraseña_nueva, PASSWORD_DEFAULT, ['cost' => 10]); //Tengo que encriptar antes de cambiarla
    $usuario->cambiar_contraseña_con_usuario($nombre_usuario, $contraseña);
} else {
    $resultado['fail'] = true;
}

echo json_encode($resultado);
