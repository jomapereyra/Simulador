<?php

require_once 'model/viewer.php';
require_once './vendor/autoload.php';
$viewer = new Viewer('./view');
session_start();
if (!isset($_SESSION['usuario'])) {     //Si el usuario NO esta logeado
    require_once 'model/pais.php';
    $paises = Pais::get_paises();
    echo $viewer->twig->render('registro.twig', array('name' => 'Registro', 'countries' => $paises));
} else {
    header('location:index.php');
}
