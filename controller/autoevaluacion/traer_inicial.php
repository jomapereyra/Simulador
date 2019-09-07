<?php

require_once '../../model/recorrido.php';
require_once '../../model/usuario.php';
require_once '../../model/actividad.php';
require_once 'correspondencias.php';

session_start();
$usuario = new Usuario();
$recorrido = new Recorrido();
$actividad = new Actividad();

$respuesta = [
    'nombres' => [],
    'paginas' => [],
];

//AGARRO LOS DATOS DEL USUARIO
$datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);

//TENGO QUE AGARRAR MI ULTIMO RECORRIDO
$ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);

//AGARRO LA ULTIMA ETAPA QUE TENGO REGISTRADA

$ultima_atapa = $actividad->traer_ultima_etapa($ultimo_recorrido);

if (isset($ultima_atapa)) {
    if ($ultima_atapa == 5) {
        $respuesta['nombres'] = $correspondencias_nombres;
        $respuesta['paginas'] = $correspondencias_paginas;
    } else {
        for ($i = 0; $i < $ultima_atapa; ++$i) {
            array_push($respuesta['nombres'], $correspondencias_nombres[$i]);
            array_push($respuesta['paginas'], $correspondencias_paginas[$i]);
        }
    }
}

echo json_encode($respuesta);
