<?php

require_once 'model/viewer.php';
require_once './vendor/autoload.php';
$viewer = new Viewer('./view');
session_start();
require_once 'model/usuario.php';
$usuario = new Usuario();
$datos_usuario = $usuario->get_datos($_SESSION['usuario']);
echo $viewer->twig->render('mis_datos.twig', $datos_usuario);
