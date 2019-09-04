<?php

$resultado = [
    'completada' => false,
    'respuestas' => [],
    'correcto' => false,
    'solucion' => '',
];

$correspondencia = [
    '1' => 'Todos estos aspectos son valorados por los entrevistadores. En caso de que no te sientas seguro en alguno de ellos, revisa el material de lectura que te sugerimos más abajo',
];

$correspondencia_id = [
    '1' => '#checkbox_1',
    '2' => '#checkbox_2',
    '3' => '#checkbox_3',
    '4' => '#checkbox_4',
    '5' => '#checkbox_5',
    '6' => '#checkbox_6',
    '7' => '#checkbox_7',
    '8' => '#checkbox_8',
    '9' => '#checkbox_9',
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
$completada = $actividad->buscar_actividad(3, 1, $ultimo_recorrido);

if ($completada) {
    $resultado['completada'] = true;
    $respuesta = explode('-', $completada['respuesta']);
    //PREGUNTO SI EL USUARIO SELECCIONO ALGO
    if ($respuesta[0] != '0') {
        foreach ($respuesta as $res) {
            array_push($resultado['respuestas'], $correspondencia_id[$res]);
        }
    }

    $resultado['correcto'] = $completada['correcto'];
    if (!$completada['correcto']) {
        //ARMO LA SOLUCION
        $html_solucion = '
        <ul class="collection black-text">
        <li class="collection-item">'
        .$correspondencia['1'].
        '</li>
        </ul>';

        $resultado['solucion'] = $html_solucion;
    }
}

echo json_encode($resultado);
