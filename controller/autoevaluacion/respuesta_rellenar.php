<?php

function eliminar_tildes($cadena)
{
    $cadena = str_replace(
        array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
        array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
        $cadena
    );

    $cadena = str_replace(
        array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
        array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
        $cadena);

    $cadena = str_replace(
        array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
        array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
        $cadena);

    $cadena = str_replace(
        array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
        array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
        $cadena);

    $cadena = str_replace(
        array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
        array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
        $cadena);

    $cadena = str_replace(
        array('ñ', 'Ñ', 'ç', 'Ç'),
        array('n', 'N', 'c', 'C'),
        $cadena
    );

    return $cadena;
}

function eliminar_repetidos($cadena)
{
    $patron = '/(.)\1+/u';

    return preg_replace($patron, '$1', $cadena);
}

$correspondencia = [
    '1' => ['informacion', 'info', 'informasion'],
    '2' => ['breve', 'brebe'],
    '3' => ['positivo', 'positibo', 'pocitivo', 'pocitibo'],
    '4' => ['profesionales', 'profecionales'],
    '5' => ['empresa', 'empreza'],
];

$respuesta = [
    'correcto' => 0,
    'solucion' => '',
    'rellenar' => [],
    'seteo' => ['información', 'breve', 'positivo', 'profesionales', 'empresa'],
    'error' => false,
];

$seteo = ['información', 'breve', 'positivo', 'profesionales', 'empresa'];

if (!empty($_POST['rellenar_1']) && !empty($_POST['rellenar_2']) && !empty($_POST['rellenar_3']) && !empty($_POST['rellenar_4']) && !empty($_POST['rellenar_5'])) {
    // Cada palabra pasa por 3 filtros. El primero se encarga de sacar las tildes, el segundo de eliminar las letras repetidas y el tercero de convertir a minusculas

    $rellenar_1 = eliminar_tildes($_POST['rellenar_1']);
    $rellenar_1 = eliminar_repetidos($rellenar_1);
    $rellenar_1 = strtolower($rellenar_1);

    $rellenar_2 = eliminar_tildes($_POST['rellenar_2']);
    $rellenar_2 = eliminar_repetidos($rellenar_2);
    $rellenar_2 = strtolower($rellenar_2);

    $rellenar_3 = eliminar_tildes($_POST['rellenar_3']);
    $rellenar_3 = eliminar_repetidos($rellenar_3);
    $rellenar_3 = strtolower($rellenar_3);

    $rellenar_4 = eliminar_tildes($_POST['rellenar_4']);
    $rellenar_4 = eliminar_repetidos($rellenar_4);
    $rellenar_4 = strtolower($rellenar_4);

    $rellenar_5 = eliminar_tildes($_POST['rellenar_5']);
    $rellenar_5 = eliminar_repetidos($rellenar_5);
    $rellenar_5 = strtolower($rellenar_5);

    //Si esta bien -> 1
    //Si esta mal -> 0

    if (in_array($rellenar_1, $correspondencia['1'])) {
        $rellenar_1 = $seteo[0];
        array_push($respuesta['rellenar'], 1);
    } else {
        array_push($respuesta['rellenar'], 0);
    }

    if (in_array($rellenar_2, $correspondencia['2'])) {
        $rellenar_2 = $seteo[1];
        array_push($respuesta['rellenar'], 1);
    } else {
        array_push($respuesta['rellenar'], 0);
    }

    if (in_array($rellenar_3, $correspondencia['3'])) {
        $rellenar_3 = $seteo[2];
        array_push($respuesta['rellenar'], 1);
    } else {
        array_push($respuesta['rellenar'], 0);
    }

    if (in_array($rellenar_4, $correspondencia['4'])) {
        $rellenar_4 = $seteo[3];
        array_push($respuesta['rellenar'], 1);
    } else {
        array_push($respuesta['rellenar'], 0);
    }

    if (in_array($rellenar_5, $correspondencia['5'])) {
        $rellenar_5 = $seteo[4];
        array_push($respuesta['rellenar'], 1);
    } else {
        array_push($respuesta['rellenar'], 0);
    }

    if (!in_array(0, $respuesta['rellenar'])) {
        $respuesta['correcto'] = 1;
    } else {
        //ARMO LA SOLUCION
        $html_solucion = '
         <ul class="collection black-text">

             <li class="collection-item">

             Antes de presentarte a la entrevista, busca <b>'.$seteo[0].'</b> sobre la empresa. Durante la entrevista responde al entrevistador de
             manera <b>'.$seteo[1].'</b>, clara y concisa . Muéstrate amable, sonriente y <b>'.$seteo[2].'</b>. Destaca tus virtudes y logros <b>'.$seteo[3].'</b>
             . Desde ya, demuestra que tienes interés por ser parte de la <b>'.$seteo[4].'</b>

             </li>

         </ul>';

        $respuesta['solucion'] = $html_solucion;
    }

    $mi_respuesta = $rellenar_1.'-'.$rellenar_2.'-'.$rellenar_3.'-'.$rellenar_4.'-'.$rellenar_5;

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
    $actividad->crear_actividad(1, 2, $mi_respuesta, $respuesta['correcto'], $ultimo_recorrido);
} else {
    $respuesta['error'] = true;
}

echo json_encode($respuesta);
