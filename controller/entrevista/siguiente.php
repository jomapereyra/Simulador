<?php

$respuesta = [
    'tiene_siguiente' => false,
    'error' => false,
    'nro_decision' => 0,
];

$decisiones = [
    1 => 1,
    2 => 2,
    3 => 3,
    4 => 4,
    5 => 5,
    6 => 6,
    7 => 7,
];

$video = $_POST['nro_video'];
if (isset($video) && is_numeric($video)) {
    if ($video > 0 && $video < 10) {
        $keys = array_keys($decisiones);
        $respuesta['tiene_siguiente'] = in_array($video, $keys);
        if ($respuesta['tiene_siguiente']) {
            $respuesta['nro_decision'] = $decisiones[$video];
        }
    } else {
        $respuesta['error'] = true;
    }
} else {
    $respuesta['error'] = true;
}

echo json_encode($respuesta);
