<?php

require_once '../model/usuario.php';
$codigo = $_GET['link'];
$usuario = new Usuario();
$usuario->activar_cuenta($codigo);
header('location:../anuncio_activacion.php');
