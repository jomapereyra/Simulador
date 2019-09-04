<?php

require_once 'model/viewer.php';
$viewer = new Viewer('./view');
session_start();

//Si el usuario NO esta logeado

if (!isset($_SESSION['usuario'])) {
    echo $viewer->twig->render('login.twig', array('name' => 'Login', 'mode' => 0));
}

//Si el usuario ESTA logeado

else {
    //Si quiere ir a un punto especifico

    if (isset($_GET['page'])) {
        $page = $_GET['page'];
    }

    //Sino lo manda al home

    else {
        $page = 'inicio';
    }

    $name = ucwords($page);
    require_once 'model/usuario.php';
    $usuario = new Usuario();

    //Si voy a las configuraciones, me tengo que traer todos los datos del usuario

    if ($page == 'configuraciones') {
        require_once 'model/pais.php';
        $paises = Pais::get_paises();
        $datos = $usuario->get_datos($_SESSION['usuario']);
        if ($datos['hipoacusico_nacimiento']) {
            $datos['hipoacusico_nacimiento'] = 'Soy hipoacúsico de nacimiento';
        } else {
            $datos['hipoacusico_nacimiento'] = 'Soy postlocutivo';
        }
        $datos += ['countries' => $paises];
    }

    //Sino solo basta con traer algunos

    else {
        $datos = $usuario->get_datos_sidenav($_SESSION['usuario']);
    }

    $datos += ['name' => $name, 'mode' => 1];

    //Agrego la notificacion de activacion de cuenta si es necesario

    if (!$_SESSION['activate']) {
        $datos += ['not_activate' => true];
    }

    echo $viewer->twig->render($page.'.twig', $datos);
}