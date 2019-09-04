<?php

require_once '../../model/usuario.php';
require_once '../../model/recorrido.php';
require_once '../../model/actividad.php';

$total_actividades = 8;

session_start();
$usuario = new Usuario();
$datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);
$recorrido = new Recorrido();
$ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);
$actividad = new Actividad();
$terminadas = $actividad->total_terminadas($ultimo_recorrido);
$porcentaje = $terminadas * 100 / $total_actividades;
echo $porcentaje.'%';
