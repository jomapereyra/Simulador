<?php

$correspondencia = [
    '1' => 'En caso de que no te sientas seguro en alguno de estos ítems, revisa el material de lectura que te sugerimos  más abajo',
];

$respuesta = [
    'correcto' => 0,
    'solucion' => '',
];

$mi_respuesta = '';

if (isset($_POST['actitud'])) {
    $cantidad_seleccionados = count($_POST['actitud']);
    if ($cantidad_seleccionados == 9) {
        $respuesta['correcto'] = 1;
    }
    foreach ($_POST['actitud'] as $seleccionado) {
        $mi_respuesta = $mi_respuesta.$seleccionado.'-';
    }
    $mi_respuesta = substr($mi_respuesta, 0, -1);
} else {
    $cantidad_seleccionados = 0;
    $mi_respuesta = '0';
}

//ARMO LA SOLUCION
$html_solucion = '
<ul class="collection black-text">

    <li class="collection-item">'
    .$correspondencia['1'].
    '</li>

</ul>';

$respuesta['solucion'] = $html_solucion;

//GUARDO MI RESPUESTA
require_once '../../model/actividad.php';
require_once '../../model/usuario.php';
require_once '../../model/recorrido.php';

session_start();
$actividad = new Actividad();
$usuario = new Usuario();
$recorrido = new Recorrido();
$datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);
$ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);
//ACA DEBERIA CHEQUEAR QUE LA ACTIVIDAD A CREAR NO SE HAYA CREADO ANTES
$actividad->crear_actividad(3, 1, $mi_respuesta, $respuesta["correcto"], $ultimo_recorrido);

echo json_encode($respuesta);
