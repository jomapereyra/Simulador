<?php

require_once '../model/usuario.php';
$nueva = $_GET['new'];
$codigo = $_GET['link'];
$contraseña = password_hash($nueva, PASSWORD_DEFAULT, ['cost' => 10]); //Tengo que encriptar antes de cambiarla
$usuario = new Usuario();
$usuario->cambiar_contraseña($codigo, $contraseña);
header('location:../anuncio_pass.php');
