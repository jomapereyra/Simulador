<?php

$resultado = [
    'campo' => false,
    'check' => true,
    'existe' => true,
];

require_once '../model/usuario.php';
$usuario = new Usuario();
$correo = $_POST['correo'];

//Validacion de Correo

if (empty($correo)) {
    $resultado['campo'] = true;
}

//Validacion del intento

if (!empty($correo)) {
    $resultado['check'] = false;
    $datos_usuario = $usuario->buscar_con_correo($correo);
    if ($datos_usuario) {
        $resultado['existe'] = false;
        require_once '../model/correo.php';
        $sender = new Correo();
        $sender->enviar_recuperacion($correo, $datos_usuario['usuario'], $datos_usuario['id_activacion']);
    }
}

echo json_encode($resultado);
