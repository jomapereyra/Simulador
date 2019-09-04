<?php

$resultado = [
    'completada' => false,
    'respuestas' => [],
    'correcto' => false,
    'solucion' => '',
];

$correspondencia = [
    '147' => 'Titulación reglada. Descripción, nivel, año finalizado, centro.',
    '258' => 'Formación complementaria. Descripción, año, horas, centro, área.',
    '369' => 'Formación informal. Formación (conocimientos) adquiridos en el desempeño de un trabajo, voluntariado, prácticas, colaboración, aficiones, etc.',
];

$correspondencia_id = [
    '147' => '#orden_1',
    '258' => '#orden_2',
    '369' => '#orden_3',
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
$completada = $actividad->buscar_actividad(1, 1, $ultimo_recorrido);

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
             .$correspondencia['147'].
             '</li>

             <li class="collection-item">2) '
             .$correspondencia['258'].
             '</li>

             <li class="collection-item">3) '
             .$correspondencia['369'].
             '</li>

         </ul>';

        $resultado['solucion'] = $html_solucion;
    }
}

echo json_encode($resultado);
