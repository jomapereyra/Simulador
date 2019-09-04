<?php

$resultado = [
    'usuario_campo' => false,
    'contraseña_campo' => false,
    'fail' => true,
    'check' => true,
    'existe' => true,
    'activado' => true,
    'url' => '',
];

require_once '../model/usuario.php';
require_once '../model/config.php';

$usuario = new Usuario();
$user = $_POST['usuario'];
$pass = $_POST['contraseña'];

//Validacion de Usuario

if (empty($user)) {
    $resultado['usuario_campo'] = true;
}

//Validacion de Contraseña

if (empty($pass)) {
    $resultado['contraseña_campo'] = true;
}

//Validacion en conjunto

if (!empty($user) && !empty($pass)) {
    $resultado['check'] = false;
    $datos_usuario = $usuario->buscar_con_usuario($user);
    if ($datos_usuario) {
        if (password_verify($pass, $datos_usuario['contraseña'])) {
            $resultado['existe'] = false;
            if ($datos_usuario['status']) {
                $resultado['activado'] = false;
                $resultado['fail'] = false;
                $resultado['url'] = $dns;
                session_start();
                $_SESSION['usuario'] = $user;
                $_SESSION['activate'] = true;
            }
        }
    }
}

echo json_encode($resultado);
