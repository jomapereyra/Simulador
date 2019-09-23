<?php

$soluciones = [
    'etapa_1' => [
        'actividad_1' => '
            <ul class="collection black-text">
                <li class="collection-item">1) Titulación reglada. Descripción, nivel, año finalizado, centro.</li>
                <li class="collection-item">2) Formación complementaria. Descripción, año, horas, centro, área.</li>
                <li class="collection-item">3) Formación informal. Formación (conocimientos) adquiridos en el desempeño de un trabajo, voluntariado, prácticas, colaboración, aficiones, etc.</li>
            </ul>
        ',
        'actividad_2' => '
            <ul class="collection black-text">
                <li class="collection-item">Afirmación 1: Es VERDADERA.</li>
                <li class="collection-item">Afirmación 2: Es FALSA.</li>
                <li class="collection-item">Afirmación 3: Es FALSA.</li>
            </ul>
        ',
        'actividad_3' => '
            <ul class="collection black-text">
                <li class="collection-item">Todos estos aspectos son valorados por los entrevistadores. En caso de que no te sientas seguro en alguno de ellos, revisa el material de lectura que te sugerimos más abajo.</li>
            </ul>
        ',
    ],
    'etapa_2' => [
        'actividad_1' => '
        <ul class="collection black-text">
            <li class="collection-item">
                Antes de presentarte a la entrevista, busca <b>información</b> sobre la empresa. Durante la entrevista responde al entrevistador de
                manera <b>breve</b>, clara y concisa . Muéstrate amable, sonriente y <b>positivo</b>. Destaca tus virtudes y logros <b>profesionales</b>
                . Desde ya, demuestra que tienes interés por ser parte de la <b>empresa</b>
            </li>
            
        </ul>',
    ],
    'etapa_3' => [
        'actividad_1' => '
        <ul class="collection black-text">
            <li class="collection-item">Afirmación 1: Es FALSA. Recuerda que cuando das la mano, el apretón tiene que ser firme pero no muy alargado en el tiempo.</li>
            <li class="collection-item">Afirmación 2: Es VERDADERA. Tu mirada debe ser empática, que proyecte entusiasmo, interés y humor.</li>
            <li class="collection-item">Afirmación 3: Es VERDADERA.</li>
            <li class="collection-item">Afirmación 4: Es FALSA. Puedes y debes utilizar tus manos para resaltar cosas importantes pero evita a toda costa tics con ellas ( jugar con tus anillos, tocarte el pelo, etc.).</li>
        </ul>',
    ],
    'etapa_4' => [
        'actividad_1' => '
            <ul class="collection black-text">
                <li class="collection-item">1) Dí una afirmación sorprendente o haz una pregunta.</li>
                <li class="collection-item">2) Cuenta quién eres y qué haces.</li>
                <li class="collection-item">3) Enumera qué problemas o necesidades cubres.</li>
                <li class="collection-item">4) Menciona las soluciones que aportas.</li>
                <li class="collection-item">5) Revela qué beneficio obtiene la gente contigo.</li>
                <li class="collection-item">6) Sustenta tu afirmación de que eres la persona adecuada.</li>
                <li class="collection-item">7) Llamas a la acción por parte de quien te escucha.</li>
            </ul>',
    ],
    'etapa_5' => [
        'actividad_1' => '
        <ul class="collection black-text">
            <li class="collection-item">Afirmación 1: Es FALSA. Evita dar una señal que solo te importa
            cuánto puedas obtener. Así que siempre espera que el empleador haga una
            oferta, y evita ser el primero en comenzar la discusión sobre el salario
            . Cuando comiencen a hablar del tema sé flexible. Si vas con una oferta
            y te ofrecen menos no te niegues a negociar, ya que quizás ganes menos
            de lo esperado, pero mejoren otras cosas en tu vida.</li>
            <li class="collection-item">Afirmación 2: Es VERDADERA. Deja muy en claro tu hora de entrada y
            salida, si en alguna ocasión tienes que hacer turnos nocturnos o de
            fines de semana  antes de firmar cualquier contrato. Dado que
            en algunas ocasiones es posible que el lugar donde se realiza el proceso de selección sea distinto al lugar
            donde se va a trabajar es necesario saber dónde es el sitio de trabajo
            para  analizar cuánta es la distancia desde tu residencia y si vale la
            pena aceptar la oferta.</li>
            <li class="collection-item">Afirmación 3: Es FALSA. El silencio es incómodo para muchas personas,
            especialmente durante las negociaciones. Pero lo que consideras como
            pausas incómodas son solo pausas naturales en el proceso de
            comunicación. Este es el momento cuando la otra persona está procesando
            lo que dijiste, o está en el proceso de formular una respuesta.</li>
            <li class="collection-item">Afirmación 4: Es FALSA. Los empleadores esperan que contra ofertes, pero nadie quiere un regateador
            que negociará todo hasta el último centavo. Esta actitud de regatear podría
            disgustar al gerente de Recursos Humanos con el que estás tratando. Si el
            presupuesto permite $30,000, ya te lo habrían dado. Lo que puedes hacer
            ahora es negociar otras ventajas para hacer la diferencia, tal como más
            tiempo de vacaciones . De nuevo, la clave es equilibrar lo que quieres y los
            intereses del empleador.</li>
        </ul>',
    ],
];

$correspondencias = [
    'etapa_1' => [
        'actividad_1' => [
            '147' => '#orden1_1',
            '258' => '#orden1_2',
            '369' => '#orden1_3',
        ],
        'actividad_2' => [
            'verdadero_1' => '#vof1_true_1',
            'verdadero_2' => '#vof1_true_2',
            'verdadero_3' => '#vof1_true_3',
            'falso_1' => '#vof1_false_1',
            'falso_2' => '#vof1_false_2',
            'falso_3' => '#vof1_false_3',
        ],
        'actividad_3' => [
            '1' => '#checkbox_1',
            '2' => '#checkbox_2',
            '3' => '#checkbox_3',
            '4' => '#checkbox_4',
            '5' => '#checkbox_5',
            '6' => '#checkbox_6',
            '7' => '#checkbox_7',
            '8' => '#checkbox_8',
            '9' => '#checkbox_9',
        ],
    ],
    'etapa_2' => [
        'actividad_1' => [
            0 => ['información', 'informacion', 'info', 'informasion'],
            1 => ['breve', 'brebe'],
            2 => ['positivo', 'positibo', 'pocitivo', 'pocitibo'],
            3 => ['profesionales', 'profecionales'],
            4 => ['empresa', 'empreza'],
        ],
    ],
    'etapa_3' => [
        'actividad_1' => [
            'verdadero_1' => '#vof2_true_1',
            'verdadero_2' => '#vof2_true_2',
            'verdadero_3' => '#vof2_true_3',
            'verdadero_4' => '#vof2_true_4',
            'falso_1' => '#vof2_false_1',
            'falso_2' => '#vof2_false_2',
            'falso_3' => '#vof2_false_3',
            'falso_4' => '#vof2_false_4',
        ],
    ],
    'etapa_4' => [
        'actividad_1' => [
            '1' => '#orden2_1',
            '2' => '#orden2_2',
            '3' => '#orden2_3',
            '4' => '#orden2_4',
            '5' => '#orden2_5',
            '6' => '#orden2_6',
            '7' => '#orden2_7',
        ],
    ],
    'etapa_5' => [
        'actividad_1' => [
            'verdadero_1' => '#vof3_true_1',
            'verdadero_2' => '#vof3_true_2',
            'verdadero_3' => '#vof3_true_3',
            'verdadero_4' => '#vof3_true_4',
            'falso_1' => '#vof3_false_1',
            'falso_2' => '#vof3_false_2',
            'falso_3' => '#vof3_false_3',
            'falso_4' => '#vof3_false_4',
        ],
    ],
];

$correspondencias_nombres = ['Autoanálisis', 'Preparate para ser un ganador', 'El lenguaje corporal no miente', '¡Tienes un minuto!', 'Aprendemos a negociar', 'Repasemos', 'Llegó el momento!'];

$correspondencias_paginas = ['autoanalisis', 'preparate', 'lenguaje_corporal', 'tienes_un_minuto', 'negociar', 'repasemos', 'llego_el_momento'];

$cant_actividades_etapas = [0, 3, 1, 1, 1, 1, 0, 0];
