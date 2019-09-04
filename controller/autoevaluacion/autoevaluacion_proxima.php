<?php

$resultado = [
    'fail' => false,
    'etapa' => 'autoanalisis.html',
    'nombre_etapa' => 'Autoanálisis',
    'num_etapa' => 1,
    'etapa_nueva' => false,
    'consulta_respuesta' => '',
];

$etapas = ['autoanalisis.html', 'preparate.html', 'lenguaje_corporal.html', 'tienes_un_minuto.html', 'negociar.html', 'repasemos.html', 'llego_el_momento.html'];

$nombre_etapas = ['Autoanálisis', 'Preparate para ser un ganador', 'El lenguaje corporal no miente', '¡Tienes un minuto!', 'Aprendemos a negociar', 'Repasemos', 'Llegó el momento!'];

$etapa_actual = $_POST['etapa'];

$respuestas_por_etapa = [3, 1, 1, 1, 1, 0, 0];

require_once '../../model/recorrido.php';
require_once '../../model/usuario.php';

session_start();
$usuario = new Usuario();
$recorrido = new Recorrido();

//AGARRO LOS DATOS DEL USUARIO
$datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);

//TENGO QUE AGARRAR MI ULTIMO RECORRIDO
$ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);

//SI NO TENGO RECORRIDO
if (!$ultimo_recorrido) {
    $resultado['fail'] = true;
} else {
    //CASO CONTRARIO
    require_once '../../model/actividad.php';
    $actividad = new Actividad();
    //TENGO COMPLETADA LA ETAPA? --> CUENTO LAS ACTIVIDADES QUE HICE EN LA ETAPA
    $cantidad_realizadas = $actividad->terminadas($ultimo_recorrido, $etapa_actual + 1);
    if ($cantidad_realizadas < $respuestas_por_etapa[$etapa_actual]) {
        $resultado['fail'] = true;
    } else {
        $ir_a_etapa = $etapa_actual + 1;
        $etapa_visitar = $ir_a_etapa + 1;
        //LA ETAPA DESTINO ES NUEVA O YA FUE VISITADA??
        if ($etapa_visitar < 6) {
            $pase = $actividad->ya_pase($etapa_visitar, $ultimo_recorrido);
            $resultado['consulta_respuesta'] = $pase;
        } else {
            $pase = 1;
        }
        if ($pase == 0) {
            $resultado['etapa_nueva'] = true;
        }
        $resultado['num_etapa'] = $ir_a_etapa;
        $resultado['etapa'] = $etapas[$ir_a_etapa];
        $resultado['nombre_etapa'] = $nombre_etapas[$ir_a_etapa];
    }
}

echo json_encode($resultado);
