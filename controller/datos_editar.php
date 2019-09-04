<?php

session_start();
require_once '../model/usuario.php';
require_once '../model/pais.php';
$usuario = new Usuario();
$datos_usuario = $usuario->get_datos($_SESSION['usuario']);
$paises = Pais::get_paises();
$datos = ['usuario' => $datos_usuario, 'paises' => $paises];
echo json_encode($datos);
