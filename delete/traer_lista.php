<?php

$resultado = [
    'completada' => false,
    'respuestas' => [],
    'correcto' => false,
    'solucion' => '',
];

$correspondencia = [
    '3' => 'Dí una afirmación sorprendente o haz una pregunta',
    '5' => 'Cuenta quién eres y qué haces',
    '1' => 'Enumera qué problemas o necesidades cubres',
    '2' => 'Menciona las soluciones que aportas',
    '4' => 'Revela qué beneficio obtiene la gente contigo',
    '7' => 'Sustenta tu afirmación de que eres la persona adecuada',
    '6' => 'Llamas a la acción por parte de quien te escucha',
];

$correspondencia_id = [
    '1' => '#orden_1',
    '2' => '#orden_2',
    '3' => '#orden_3',
    '4' => '#orden_4',
    '5' => '#orden_5',
    '6' => '#orden_6',
    '7' => '#orden_7',
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
$completada = $actividad->buscar_actividad(1, 4, $ultimo_recorrido);

if ($completada) {
    $resultado['completada'] = true;
    $respuesta = explode('-', $completada['respuesta']);
    foreach ($respuesta as $res) {
        array_push($resultado['respuestas'], $correspondencia_id[$res]);
    }
    $resultado['correcto'] = $completada['correcto'];
    if (!$completada['correcto']) {
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

        $resultado['solucion'] = $html_solucion;
    }
}

echo json_encode($resultado);
