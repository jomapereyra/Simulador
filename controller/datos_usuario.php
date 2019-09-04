<?php

session_start();
require_once '../model/usuario.php';
$usuario = new Usuario();
$datos_usuario = $usuario->get_datos($_SESSION['usuario']);
echo json_encode($datos_usuario);
