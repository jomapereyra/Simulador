<?php

$resultado = [
    'fail' => false,
    'etapa' => 'autoanalisis.html',
    'nombre_etapa' => 'Autoanálisis',
];

$etapa_actual = $_POST['etapa'] + 1;

require_once '../../model/recorrido.php';
require_once '../../model/usuario.php';
require_once 'correspondencias.php';

session_start();
$usuario = new Usuario();
$recorrido = new Recorrido();

//AGARRO LOS DATOS DEL USUARIO
$datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);

//TENGO QUE AGARRAR MI ULTIMO RECORRIDO
$ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);

require_once '../../model/actividad.php';
$actividad = new Actividad();

//TENGO COMPLETADA LA ETAPA? --> CUENTO LAS ACTIVIDADES QUE HICE EN LA ETAPA
$cantidad_realizadas = $actividad->terminadas($ultimo_recorrido, $etapa_actual);
if ($cantidad_realizadas < $cant_actividades_etapas[$etapa_actual]) {
    $resultado['fail'] = true;
} else {
    $resultado['etapa'] = $correspondencias_paginas[$etapa_actual].'.html';
    $resultado['nombre_etapa'] = $correspondencias_nombres[$etapa_actual];
}

echo json_encode($resultado);
