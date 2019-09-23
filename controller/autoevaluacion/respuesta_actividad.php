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

require_once '../../model/actividad.php';
require_once '../../model/usuario.php';
require_once '../../model/recorrido.php';
require_once 'correspondencias.php';

$respuesta = [
    'correcto' => 0,
    'solucion' => '',
    'error' => false,
];

$etapa = $_POST['etapa'];
$actividad = $_POST['actividad'];

switch ($etapa) {
    case '1':

        if ($actividad == '1') {
            $orden = json_decode($_POST['orden']);
            if (array_key_exists($orden[0], $correspondencias['etapa_1']['actividad_1']) && array_key_exists($orden[1], $correspondencias['etapa_1']['actividad_1']) && array_key_exists($orden[2], $correspondencias['etapa_1']['actividad_1'])) {
                if ($orden[0] == '147' && $orden[1] == '258' && $orden[2] == '369') {
                    $respuesta['correcto'] = 1;
                } else {
                    $respuesta['solucion'] = $soluciones['etapa_1']['actividad_1'];
                }

                $mi_respuesta = $orden[0].'-'.$orden[1].'-'.$orden[2];
            } else {
                $respuesta['error'] = true;
            }
        } else {
            if ($actividad == '2') {
                if (isset($_POST['pregunta1']) && isset($_POST['pregunta2']) && isset($_POST['pregunta3'])) {
                    $pregunta = [];

                    for ($i = 1; $i < 4; ++$i) {
                        if ($_POST['pregunta'.$i]) {
                            $pregunta[$i] = 'verdadero_'.$i;
                        } else {
                            $pregunta[$i] = 'falso_'.$i;
                        }
                    }

                    if ($pregunta[1] == 'verdadero_1' && $pregunta[2] == 'falso_2' && $pregunta[3] == 'falso_3') {
                        $respuesta['correcto'] = 1;
                    } else {
                        $respuesta['solucion'] = $soluciones['etapa_1']['actividad_2'];
                    }

                    $mi_respuesta = $pregunta[1].'-'.$pregunta[2].'-'.$pregunta[3];
                } else {
                    $respuesta['error'] = true;
                }
            } else {
                if (isset($_POST['actitud'])) {
                    $cantidad_seleccionados = count($_POST['actitud']);
                    if ($cantidad_seleccionados == 9) {
                        $respuesta['correcto'] = 1;
                    } else {
                        $respuesta['solucion'] = $soluciones['etapa_1']['actividad_3'];
                    }
                    $mi_respuesta = '';
                    foreach ($_POST['actitud'] as $seleccionado) {
                        $mi_respuesta = $mi_respuesta.$seleccionado.'-';
                    }
                    $mi_respuesta = substr($mi_respuesta, 0, -1);
                } else {
                    $mi_respuesta = '-';
                }
            }
        }

        break;

    case '2':
        $respuesta['rellenar'] = [];
        $respuesta['seteo'] = ['información', 'breve', 'positivo', 'profesionales', 'empresa'];

        if (!empty($_POST['rellenar_1']) && !empty($_POST['rellenar_2']) && !empty($_POST['rellenar_3']) && !empty($_POST['rellenar_4']) && !empty($_POST['rellenar_5'])) {
            // Cada palabra pasa por 3 filtros. El primero se encarga de sacar las tildes, el segundo de eliminar las letras repetidas y el tercero de convertir a minusculas

            $rellenar = [];

            for ($i = 1; $i < 6; ++$i) {
                $rellenar[$i] = eliminar_tildes($_POST['rellenar_'.$i]);
                $rellenar[$i] = eliminar_repetidos($rellenar[$i]);
                $rellenar[$i] = strtolower($rellenar[$i]);
            }

            //Si esta bien -> 1
            //Si esta mal -> 0

            for ($i = 1; $i < 6; ++$i) {
                $index = $i - 1;
                if (in_array($rellenar[$i], $correspondencias['etapa_2']['actividad_1'][$index])) {
                    $rellenar[$i] = $respuesta['seteo'][$index];
                    array_push($respuesta['rellenar'], 1);
                } else {
                    array_push($respuesta['rellenar'], 0);
                }
            }

            if (!in_array(0, $respuesta['rellenar'])) {
                $respuesta['correcto'] = 1;
            } else {
                $respuesta['solucion'] = $soluciones['etapa_2']['actividad_1'];
            }

            $mi_respuesta = $rellenar[1].'-'.$rellenar[2].'-'.$rellenar[3].'-'.$rellenar[4].'-'.$rellenar[5];
        } else {
            $respuesta['error'] = true;
        }

        break;

    case '3':
        if (isset($_POST['pregunta1']) && isset($_POST['pregunta2']) && isset($_POST['pregunta3']) && isset($_POST['pregunta4'])) {
            $pregunta = [];

            for ($i = 1; $i < 5; ++$i) {
                if ($_POST['pregunta'.$i]) {
                    $pregunta[$i] = 'verdadero_'.$i;
                } else {
                    $pregunta[$i] = 'falso_'.$i;
                }
            }

            if ($pregunta[1] == 'falso_1' && $pregunta[2] == 'verdadero_2' && $pregunta[3] == 'verdadero_3' && $pregunta[4] == 'falso_4') {
                $respuesta['correcto'] = 1;
            } else {
                $respuesta['solucion'] = $soluciones['etapa_3']['actividad_1'];
            }

            $mi_respuesta = $pregunta[1].'-'.$pregunta[2].'-'.$pregunta[3].'-'.$pregunta[4];
        } else {
            $respuesta['error'] = true;
        }
        break;
    case '4':
        $orden = json_decode($_POST['orden']);
        if (array_key_exists($orden[0], $correspondencias['etapa_4']['actividad_1']) && array_key_exists($orden[1], $correspondencias['etapa_4']['actividad_1']) && array_key_exists($orden[2], $correspondencias['etapa_4']['actividad_1']) && array_key_exists($orden[3], $correspondencias['etapa_4']['actividad_1']) && array_key_exists($orden[4], $correspondencias['etapa_4']['actividad_1']) && array_key_exists($orden[5], $correspondencias['etapa_4']['actividad_1']) && array_key_exists($orden[6], $correspondencias['etapa_4']['actividad_1'])) {
            if ($orden[0] == '3' && $orden[1] == '5' && $orden[2] == '1' && $orden[3] == '2' && $orden[4] == '4' && $orden[5] == '7' && $orden[6] == '6') {
                $respuesta['correcto'] = 1;
            } else {
                $respuesta['solucion'] = $soluciones['etapa_4']['actividad_1'];
            }

            $mi_respuesta = $orden[0].'-'.$orden[1].'-'.$orden[2].'-'.$orden[3].'-'.$orden[4].'-'.$orden[5].'-'.$orden[6];
        } else {
            $respuesta['error'] = true;
        }
        break;
    case '5':
        if (isset($_POST['pregunta1']) && isset($_POST['pregunta2']) && isset($_POST['pregunta3']) && isset($_POST['pregunta4'])) {
            $pregunta = [];

            for ($i = 1; $i < 5; ++$i) {
                if ($_POST['pregunta'.$i]) {
                    $pregunta[$i] = 'verdadero_'.$i;
                } else {
                    $pregunta[$i] = 'falso_'.$i;
                }
            }

            if ($pregunta[1] == 'falso_1' && $pregunta[2] == 'verdadero_2' && $pregunta[3] == 'falso_3' && $pregunta[4] == 'falso_4') {
                $respuesta['correcto'] = 1;
            } else {
                $respuesta['solucion'] = $soluciones['etapa_5']['actividad_1'];
            }

            $mi_respuesta = $pregunta[1].'-'.$pregunta[2].'-'.$pregunta[3].'-'.$pregunta[4];
        } else {
            $respuesta['error'] = true;
        }
        break;
}

if (!$respuesta['error']) {
    //ACA DEBERIA CHEQUEAR QUE LA ACTIVIDAD A CREAR NO SE HAYA CREADO ANTES
    //GUARDO MI RESPUESTA
    session_start();
    $obj_actividad = new Actividad();
    $usuario = new Usuario();
    $recorrido = new Recorrido();
    $datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);
    $ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);
    $obj_actividad->crear_actividad($actividad, $etapa, $mi_respuesta, $respuesta['correcto'], $ultimo_recorrido);
}

echo json_encode($respuesta);
