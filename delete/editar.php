<?php

require_once 'model/viewer.php';
require_once './vendor/autoload.php';
$viewer = new Viewer('./view');
session_start();
require_once 'model/usuario.php';
require_once 'model/pais.php';
$paises = Pais::get_paises();
$usuario = new Usuario();
$datos_usuario = $usuario->get_datos($_SESSION['usuario']);
$datos_usuario += ['countries' => $paises];
echo $viewer->twig->render('editar.twig', $datos_usuario);
