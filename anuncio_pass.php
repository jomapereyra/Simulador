<?php

require_once 'model/viewer.php';
require_once './vendor/autoload.php';
$viewer = new Viewer('./view');
session_start();
if (!isset($_SESSION['usuario'])) {     //Si el usuario NO esta logeado
    echo $viewer->twig->render('anuncio_pass.twig', array('name' => 'Aviso', 'mode' => 0));
} else {
    header('location:index.php');
}
