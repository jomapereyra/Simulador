<?php

$orden = json_decode($_POST['orden']);

$correspondencia = [
    '147' => 'Titulación reglada. Descripción, nivel, año finalizado, centro.',
    '258' => 'Formación complementaria. Descripción, año, horas, centro, área.',
    '369' => 'Formación informal. Formación (conocimientos) adquiridos en el desempeño de un trabajo, voluntariado, prácticas, colaboración, aficiones, etc.',
];

$respuesta = [
    'correcto' => 0,
    'solucion' => '',
    'error' => false,
];

if (array_key_exists($orden[0], $correspondencia) && array_key_exists($orden[1], $correspondencia) && array_key_exists($orden[2], $correspondencia)) {
    if ($orden[0] == '147' && $orden[1] == '258' && $orden[2] == '369') {
        $respuesta['correcto'] = 1;
    } else {
        //ARMO LA SOLUCION
        $html_solucion = '
        <ul class="collection black-text">

            <li class="collection-item">1) '
            .$correspondencia['147'].
            '</li>

            <li class="collection-item">2) '
            .$correspondencia['258'].
            '</li>

            <li class="collection-item">3) '
            .$correspondencia['369'].
            '</li>

        </ul>';

        $respuesta['solucion'] = $html_solucion;
    }

    $mi_respuesta = $orden[0].'-'.$orden[1].'-'.$orden[2];

    //GUARDO MI RESPUESTA
    require_once '../../model/actividad.php';
    require_once '../../model/usuario.php';
    require_once '../../model/recorrido.php';

    session_start();
    $actividad = new Actividad();
    $usuario = new Usuario();
    $recorrido = new Recorrido();
    $datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);
    $ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);
    $actividad->crear_actividad(1, 1, $mi_respuesta, $respuesta['correcto'], $ultimo_recorrido);
} else {
    $respuesta['error'] = true;
}

echo json_encode($respuesta);
