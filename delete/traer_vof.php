<?php

$resultado = [
    'completada' => false,
    'respuestas' => [],
    'correcto' => false,
    'solucion' => '',
];

$correspondencia = [
    '1' => 'Es FALSA. Recuerda que cuando das la mano, el apretón tiene que ser firme pero no muy alargado en el tiempo.',
    '2' => 'Es VERDADERA. Tu mirada debe ser empática, que proyecte entusiasmo, interés y humor.',
    '3' => 'Es VERDADERA.',
    '4' => 'Es FALSA. Puedes y debes utilizar tus manos para resaltar cosas importantes pero evita a toda costa tics con ellas ( jugar con tus anillos, tocarte el pelo, etc.).',
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
$completada = $actividad->buscar_actividad(1, 3, $ultimo_recorrido);

if ($completada) {
    $resultado['completada'] = true;
    $respuesta = explode('-', $completada['respuesta']);

    for ($i = 1; $i < 5; ++$i) {
        if ($respuesta[$i - 1] == '0') {
            array_push($resultado['respuestas'], '#false_'.$i);
        } else {
            array_push($resultado['respuestas'], '#true_'.$i);
        }
    }

    $resultado['correcto'] = $completada['correcto'];
    if (!$completada['correcto']) {
        //ARMO LA SOLUCION
        $html_solucion = '
         <ul class="collection black-text">

             <li class="collection-item">Pregunta 1: '
             .$correspondencia['1'].
             '</li>

             <li class="collection-item">Pregunta 2: '
             .$correspondencia['2'].
             '</li>

             <li class="collection-item">Pregunta 3: '
             .$correspondencia['3'].
             '</li>

             <li class="collection-item">Pregunta 4: '
             .$correspondencia['4'].
             '</li>

         </ul>';

        $resultado['solucion'] = $html_solucion;
    }
}

echo json_encode($resultado);
