<?php

require_once '../../model/usuario.php';
require_once '../../model/recorrido.php';
require_once '../../model/actividad.php';

$respuesta = [
    'fail' => false,
    'cant_correctas' => 0,
    'recomendacion' => false,
];

$total_actividades = 7;

session_start();
$usuario = new Usuario();
$datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);
$recorrido = new Recorrido();
$ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);
$actividad = new Actividad();
$terminadas = $actividad->total_terminadas($ultimo_recorrido);
if ($terminadas != $total_actividades) {
    $respuesta['fail'] = true;
} else {
    $respuesta['cant_correctas'] = $actividad->cant_correctas($ultimo_recorrido);
    if ($respuesta['cant_correctas'] < 5) {
        $respuesta['recomendacion'] = true;
    }
    $recorrido->finalizar($ultimo_recorrido);
}

echo json_encode($respuesta);
