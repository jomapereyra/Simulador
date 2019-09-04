<?php

$orden = json_decode($_POST['orden']);

$correspondencia = [
    '3' => 'Dí una afirmación sorprendente o haz una pregunta',
    '5' => 'Cuenta quién eres y qué haces',
    '1' => 'Enumera qué problemas o necesidades cubres',
    '2' => 'Menciona las soluciones que aportas',
    '4' => 'Revela qué beneficio obtiene la gente contigo',
    '7' => 'Sustenta tu afirmación de que eres la persona adecuada',
    '6' => 'Llamas a la acción por parte de quien te escucha',
];

$respuesta = [
    'correcto' => 0,
    'solucion' => '',
    'error' => false,
];

if (array_key_exists($orden[0], $correspondencia) && array_key_exists($orden[1], $correspondencia) && array_key_exists($orden[2], $correspondencia) && array_key_exists($orden[3], $correspondencia) && array_key_exists($orden[4], $correspondencia) && array_key_exists($orden[5], $correspondencia) && array_key_exists($orden[6], $correspondencia)) {
    if ($orden[0] == '3' && $orden[1] == '5' && $orden[2] == '1' && $orden[3] == '2' && $orden[4] == '4' && $orden[5] == '7' && $orden[6] == '6') {
        $respuesta['correcto'] = 1;
    } else {
        //ARMO LA SOLUCION
        $html_solucion = '
        <ul class="collection black-text">

            <li class="collection-item">1) '
            .$correspondencia['3'].
            '</li>

            <li class="collection-item">2) '
            .$correspondencia['5'].
            '</li>

            <li class="collection-item">3) '
            .$correspondencia['1'].
            '</li>

            <li class="collection-item">4) '
            .$correspondencia['2'].
            '</li>

            <li class="collection-item">5) '
            .$correspondencia['4'].
            '</li>

            <li class="collection-item">6) '
            .$correspondencia['7'].
            '</li>

            <li class="collection-item">7) '
            .$correspondencia['6'].
            '</li>

        </ul>';

        $respuesta['solucion'] = $html_solucion;
    }

    $mi_respuesta = $orden[0].'-'.$orden[1].'-'.$orden[2].'-'.$orden[3].'-'.$orden[4].'-'.$orden[5].'-'.$orden[6];

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
    $actividad->crear_actividad(1, 4, $mi_respuesta, $respuesta['correcto'], $ultimo_recorrido);
} else {
    $respuesta['error'] = true;
}

echo json_encode($respuesta);
