<?php

$resultado = [
    'etapa' => 'autoanalisis.html',
    'num_etapa' => 1,
    'quitar' => '',
];

$etapas = ['autoanalisis.html', 'preparate.html', 'lenguaje_corporal.html', 'tienes_un_minuto.html', 'negociar.html', 'repasemos.html', 'llego_el_momento.html'];

$nombre_etapas = ['Autoanálisis', 'Preparate para ser un ganador', 'El lenguaje corporal no miente', '¡Tienes un minuto!', 'Aprendemos a negociar', 'Repasemos', 'Llegó el momento!'];

$etapa_actual = $_POST['etapa'];

$etapa_anterior = $etapa_actual - 1;

$resultado['etapa'] = $etapas[$etapa_anterior];

$resultado['num_etapa'] = $etapa_anterior;

$resultado['quitar'] = $nombre_etapas[$etapa_actual];

echo json_encode($resultado);
