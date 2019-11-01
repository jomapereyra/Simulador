<?php

$resultado = [
    'correo_campo' => false,
    'fail' => false,
    'correo_existe' => true,
    'correo_error' => '',
    'correo_no_enviado' => false,
];

require_once '../model/usuario.php';
$usuario = new Usuario();
$correo = $_POST['correo'];

//Validacion de Correo

if (empty($correo)) {
    $resultado['correo_campo'] = true;
} else {
    $datos_usuario = $usuario->buscar_con_correo($correo);
    if ($datos_usuario) {
        $resultado['correo_existe'] = false;
    }
}

//Validacion del intento

if (!in_array(true, $resultado)) {
    //Si los datos son correctos, se le asigna un codigo de seguridad al usuario y se lo envia por correo
    require_once '../model/correo.php';
    $sender = new Correo();
    $codigo = rand(0, 9999);
    $usuario->asignar_codigo($datos_usuario['id_usuario'], $codigo);
    $resultado_correo = $sender->enviar_codigo($datos_usuario['correo'], $datos_usuario['usuario'], $codigo);
    if (!$resultado_correo['enviado']) {
        $resultado['correo_error'] = $resultado_correo['contenido'];
        $resultado['correo_no_enviado'] = true;
    }
} else {
    $resultado['fail'] = true;
}

echo json_encode($resultado);
