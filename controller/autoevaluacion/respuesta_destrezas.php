<?php

$correspondencia = [
    '1' => 'Es VERDADERA',
    '2' => 'Es FALSA',
    '3' => 'Es FALSA',
];

$respuesta = [
    'correcto' => 0,
    'solucion' => '',
    'error' => false,
];

if (isset($_POST['pregunta1']) && isset($_POST['pregunta2']) && isset($_POST['pregunta3'])) {
    $pregunta_1 = $_POST['pregunta1'];
    $pregunta_2 = $_POST['pregunta2'];
    $pregunta_3 = $_POST['pregunta3'];

    if ($pregunta_1 == '1' && $pregunta_2 == '0' && $pregunta_3 == '0') {
        $respuesta['correcto'] = 1;
    } else {
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
    
            </ul>';

        $respuesta['solucion'] = $html_solucion;
    }

    $mi_respuesta = $pregunta_1.'-'.$pregunta_2.'-'.$pregunta_3;

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
    $actividad->crear_actividad(2, 1, $mi_respuesta, $respuesta['correcto'], $ultimo_recorrido);
} else {
    $respuesta['error'] = true;
}

echo json_encode($respuesta);
