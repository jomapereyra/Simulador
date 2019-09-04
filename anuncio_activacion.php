<?php

require_once 'model/viewer.php';
require_once './vendor/autoload.php';
$viewer = new Viewer('./view');
session_start();
if (!isset($_SESSION['usuario'])) {     //Si el usuario NO esta logeado
    echo $viewer->twig->render('anuncio_activacion.twig', array('name' => 'Activación', 'mode' => 0));
} else {
    require_once 'model/usuario.php';
    $usuario = new Usuario();
    $datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);
    $datos_usuario += ['name' => 'Activación', 'mode' => 1];
    echo $viewer->twig->render('anuncio_activacion.twig', $datos_usuario);
}
