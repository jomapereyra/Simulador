<?php

$correspondencia = [
    '1' => 'Es FALSA. Recuerda que cuando das la mano, el apretón tiene que ser firme pero no muy alargado en el tiempo.',
    '2' => 'Es VERDADERA. Tu mirada debe ser empática, que proyecte entusiasmo, interés y humor.',
    '3' => 'Es VERDADERA.',
    '4' => 'Es FALSA. Puedes y debes utilizar tus manos para resaltar cosas importantes pero evita a toda costa tics con ellas ( jugar con tus anillos, tocarte el pelo, etc.).',
];

$respuesta = [
    'correcto' => 0,
    'solucion' => '',
    'error' => false,
];

if (isset($_POST['pregunta1']) && isset($_POST['pregunta2']) && isset($_POST['pregunta3']) && isset($_POST['pregunta4'])) {
    $pregunta_1 = $_POST['pregunta1'];
    $pregunta_2 = $_POST['pregunta2'];
    $pregunta_3 = $_POST['pregunta3'];
    $pregunta_4 = $_POST['pregunta4'];

    if ($pregunta_1 == '0' && $pregunta_2 == '1' && $pregunta_3 == '1' && $pregunta_4 == '0') {
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

                <li class="collection-item">Pregunta 4: '
                .$correspondencia['4'].
                '</li>
    
            </ul>';

        $respuesta['solucion'] = $html_solucion;
    }

    $mi_respuesta = $pregunta_1.'-'.$pregunta_2.'-'.$pregunta_3.'-'.$pregunta_4;

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
    $actividad->crear_actividad(1, 3, $mi_respuesta, $respuesta['correcto'], $ultimo_recorrido);
} else {
    $respuesta['error'] = true;
}

echo json_encode($respuesta);
