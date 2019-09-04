<?php

require_once '../../model/recorrido.php';
require_once '../../model/usuario.php';
require_once '../../model/actividad.php';

session_start();
$usuario = new Usuario();
$recorrido = new Recorrido();
$actividad = new Actividad();

$breadcrumb = [
    'contenido' => [],
];

$correspondencia = ['Autoanálisis', 'Preparate para ser un ganador', 'El lenguaje corporal no miente', '¡Tienes un minuto!', 'Aprendemos a negociar', 'Repasemos', 'Llegó el momento!'];

//AGARRO LOS DATOS DEL USUARIO
$datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);

//TENGO QUE AGARRAR MI ULTIMO RECORRIDO
$ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);

//AGARRO LA ULTIMA ETAPA QUE TENGO REGISTRADA

$ultima_atapa = $actividad->traer_ultima_etapa($ultimo_recorrido);

if (isset($ultima_atapa)) {
    if ($ultima_atapa == 5) {
        $breadcrumb['contenido'] = $correspondencia;
    } else {
        for ($i = 0; $i < $ultima_atapa; ++$i) {
            array_push($breadcrumb['contenido'], $correspondencia[$i]);
        }
    }
}

echo json_encode($breadcrumb);
