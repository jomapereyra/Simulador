<?php

$resultado = [
    'completada' => false,
    'respuestas' => [
        'valor' => [],
        'calificacion' => [],
    ],
    'correcto' => false,
    'solucion' => '',
];

$seteo = ['información', 'breve', 'positivo', 'profesionales', 'empresa'];

$correspondencia = [
    '1' => ['información', 'informacion', 'info', 'informasion'],
    '2' => ['breve', 'brebe'],
    '3' => ['positivo', 'positibo', 'pocitivo', 'pocitibo'],
    '4' => ['profesionales', 'profecionales'],
    '5' => ['empresa', 'empreza'],
];

//SABER SI COMPLETE LA ACTIVIDAD
require_once '../../model/actividad.php';
require_once '../../model/usuario.php';
require_once '../../model/recorrido.php';

session_start();
$actividad = new Actividad();
$usuario = new Usuario();
$recorrido = new Recorrido();
$datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);
$ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);
$completada = $actividad->buscar_actividad(1, 2, $ultimo_recorrido);

if ($completada) {
    $resultado['completada'] = true;
    $respuesta = explode('-', $completada['respuesta']);

    //Agarro las respuestas del usuario

    foreach ($respuesta as $res) {
        array_push($resultado['respuestas']['valor'], $res);
    }

    //Evaluo los resultados individuales

    //Si esta bien -> 1
    //Si esta mal -> 0

    if (in_array($resultado['respuestas']['valor'][0], $correspondencia['1'])) {
        array_push($resultado['respuestas']['calificacion'], 1);
    } else {
        array_push($resultado['respuestas']['calificacion'], 0);
    }

    if (in_array($resultado['respuestas']['valor'][1], $correspondencia['2'])) {
        array_push($resultado['respuestas']['calificacion'], 1);
    } else {
        array_push($resultado['respuestas']['calificacion'], 0);
    }

    if (in_array($resultado['respuestas']['valor'][2], $correspondencia['3'])) {
        array_push($resultado['respuestas']['calificacion'], 1);
    } else {
        array_push($resultado['respuestas']['calificacion'], 0);
    }

    if (in_array($resultado['respuestas']['valor'][3], $correspondencia['4'])) {
        array_push($resultado['respuestas']['calificacion'], 1);
    } else {
        array_push($resultado['respuestas']['calificacion'], 0);
    }

    if (in_array($resultado['respuestas']['valor'][4], $correspondencia['5'])) {
        array_push($resultado['respuestas']['calificacion'], 1);
    } else {
        array_push($resultado['respuestas']['calificacion'], 0);
    }

    //Pregunto si la actividad es correcta

    $resultado['correcto'] = $completada['correcto'];

    //Si es incorrecta, armo la solucion
    if (!$completada['correcto']) {
        //ARMO LA SOLUCION
        $html_solucion = '
        <ul class="collection black-text">

        <li class="collection-item">

        Antes de presentarte a la entrevista, busca <b>'.$seteo[0].'</b> sobre la empresa. Durante la entrevista responde al entrevistador de
        manera <b>'.$seteo[1].'</b>, clara y concisa . Muéstrate amable, sonriente y <b>'.$seteo[2].'</b>. Destaca tus virtudes y logros <b>'.$seteo[3].'</b>
        . Desde ya, demuestra que tienes interés por ser parte de la <b>'.$seteo[4].'</b>

        </li>

        </ul>';

        $resultado['solucion'] = $html_solucion;
    }
}

echo json_encode($resultado);
