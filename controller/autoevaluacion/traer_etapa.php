<?php

require_once 'correspondencias.php';

$resultado = [
    'etapa_1' => [
        'completada' => [false, false, false],
        'respuestas' => [
            'actividad_1' => [],
            'actividad_2' => [],
            'actividad_3' => [],
        ],
        'correcto' => [false, false, false],
        'solucion' => [
            'actividad_1' => [],
            'actividad_2' => [],
            'actividad_3' => [],
        ],
        'id' => ['ordenar1', 'vof1', 'multiple'],
        'recurso' => ['ordenar', 'vof', 'multiple'],
        'cant_actividades' => $cant_actividades_etapas[1],
    ],

    'etapa_2' => [
        'completada' => false,
        'respuestas' => [
            'actividad_1' => [
                'valor' => [],
                'calificacion' => [],
            ],
        ],
        'correcto' => false,
        'solucion' => [
            'actividad_1' => [],
        ],
        'id' => ['rellenar'],
        'recurso' => ['rellenar'],
        'cant_actividades' => $cant_actividades_etapas[2],
    ],

    'etapa_3' => [
        'completada' => false,
        'respuestas' => [
            'actividad_1' => [],
        ],
        'correcto' => false,
        'solucion' => [
            'actividad_1' => [],
        ],
        'id' => ['vof2'],
        'recurso' => ['vof'],
        'cant_actividades' => $cant_actividades_etapas[3],
    ],

    'etapa_4' => [
        'completada' => false,
        'respuestas' => [
            'actividad_1' => [],
        ],
        'correcto' => false,
        'solucion' => [
            'actividad_1' => [],
        ],
        'id' => ['ordenar2'],
        'recurso' => ['ordenar'],
        'cant_actividades' => $cant_actividades_etapas[4],
    ],

    'etapa_5' => [
        'completada' => false,
        'respuestas' => [
            'actividad_1' => [],
        ],
        'correcto' => false,
        'solucion' => [
            'actividad_1' => [],
        ],
        'id' => ['vof3'],
        'recurso' => ['vof'],
        'cant_actividades' => $cant_actividades_etapas[5],
    ],
];

require_once '../../model/actividad.php';
require_once '../../model/usuario.php';
require_once '../../model/recorrido.php';

$num_etapa = $_POST['etapa'];
$nombre_etapa = 'etapa_'.$num_etapa;

session_start();
$actividad = new Actividad();
$usuario = new Usuario();
$recorrido = new Recorrido();
$datos_usuario = $usuario->buscar_con_usuario($_SESSION['usuario']);

//Agarro mi ultimo recorrido
$ultimo_recorrido = $recorrido->traer_ultimo($datos_usuario['id_usuario']);

for ($i = 0; $i < $cant_actividades_etapas[$num_etapa]; ++$i) {
    $num_actividad = $i + 1;
    $nombre_actividad = 'actividad_'.$num_actividad;

    //Busco si complete la actividad (agarro mi respuesta en caso afirmativo)
    $completada = $actividad->buscar_actividad($num_actividad, $num_etapa, $ultimo_recorrido);

    if ($completada) {
        $resultado[$nombre_etapa]['completada'][$i] = true;
        $respuesta = explode('-', $completada['respuesta']);

        if ($num_etapa == 2) {
            //Agarro las respuestas del usuario
            foreach ($respuesta as $res) {
                array_push($resultado[$nombre_etapa]['respuestas'][$nombre_actividad]['valor'], $res);
            }

            //Evaluo los resultados individuales

            //Si esta bien -> 1
            //Si esta mal -> 0

            foreach ($resultado[$nombre_etapa]['respuestas'][$nombre_actividad]['valor'] as $indice => $word) {
                if (in_array($word, $correspondencias[$nombre_etapa][$nombre_actividad][$indice])) {
                    array_push($resultado[$nombre_etapa]['respuestas'][$nombre_actividad]['calificacion'], 1);
                } else {
                    array_push($resultado[$nombre_etapa]['respuestas'][$nombre_actividad]['calificacion'], 0);
                }
            }
        } else {
            //Agreego la respuesta de mi actividad
            foreach ($respuesta as $res) {
                array_push($resultado[$nombre_etapa]['respuestas'][$nombre_actividad], $correspondencias[$nombre_etapa][$nombre_actividad][$res]);
            }
        }

        //Guardo su calificacion (Correcto/Incorrecto)
        $resultado[$nombre_etapa]['correcto'][$i] = $completada['correcto'];

        //Si es incorrecto, muestro
        if (!$completada['correcto']) {
            $resultado[$nombre_etapa]['solucion'][$nombre_actividad] = $soluciones[$nombre_etapa][$nombre_actividad];
        }
    }
}

echo json_encode($resultado[$nombre_etapa]);
