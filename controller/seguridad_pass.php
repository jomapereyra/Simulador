<?php

$resultado = [
    'contraseña_actual' => false,
    'fail' => false,
];

require_once '../model/usuario.php';

$usuario = new Usuario();
session_start();
$nombre_usuario = $_SESSION['usuario'];
$datos_usuario = $usuario->buscar_con_usuario($nombre_usuario);
$contraseña_actual = $_POST['contraseña_actual'];

// Validacion de la contraseña actual
if (!password_verify($contraseña_actual, $datos_usuario['contraseña'])) {
    $resultado['contraseña_actual'] = true;
}

//Conclusion

if (!in_array(true, $resultado)) {
    //Si los datos son correctos, se le asigna un codigo de seguridad al usuario y se lo envia por correo
    require_once '../model/correo.php';
    $sender = new Correo();
    $codigo = rand(0, 9999);
    $usuario->asignar_codigo($datos_usuario['id_usuario'], $codigo);
    $sender->enviar_codigo($datos_usuario['correo'], $nombre_usuario, $codigo);
} else {
    $resultado['fail'] = true;
}

echo json_encode($resultado);
