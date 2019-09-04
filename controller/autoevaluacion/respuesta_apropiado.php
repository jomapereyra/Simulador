<?php

$correspondencia = [
    '1' => 'Es FALSA. Evita dar una señal que solo te importa
    cuánto puedas obtener. Así que siempre espera que el empleador haga una
    oferta, y evita ser el primero en comenzar la discusión sobre el salario
    . Cuando comiencen a hablar del tema sé flexible. Si vas con una oferta
    y te ofrecen menos no te niegues a negociar, ya que quizás ganes menos
    de lo esperado, pero mejoren otras cosas en tu vida.',

    '2' => 'Es VERDADERA. Deja muy en claro tu hora de entrada y
                        salida, si en alguna ocasión tienes que hacer turnos nocturnos o de
                        fines de semana  antes de firmar cualquier contrato. Dado que
                        en algunas ocasiones es posible que el lugar donde se realiza el proceso de selección sea distinto al lugar
                        donde se va a trabajar es necesario saber dónde es el sitio de trabajo
                        para  analizar cuánta es la distancia desde tu residencia y si vale la
                        pena aceptar la oferta.',

    '3' => 'Es FALSA. El silencio es incómodo para muchas personas,
    especialmente durante las negociaciones. Pero lo que consideras como
    pausas incómodas son solo pausas naturales en el proceso de
    comunicación. Este es el momento cuando la otra persona está procesando
    lo que dijiste, o está en el proceso de formular una respuesta.',

    '4' => 'Es FALSA. Los empleadores esperan que contra ofertes, pero nadie quiere un regateador
    que negociará todo hasta el último centavo. Esta actitud de regatear podría
    disgustar al gerente de Recursos Humanos con el que estás tratando. Si el
    presupuesto permite $30,000, ya te lo habrían dado. Lo que puedes hacer
    ahora es negociar otras ventajas para hacer la diferencia, tal como más
    tiempo de vacaciones . De nuevo, la clave es equilibrar lo que quieres y los
    intereses del empleador.',
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

    if ($pregunta_1 == '0' && $pregunta_2 == '1' && $pregunta_3 == '0' && $pregunta_4 == '0') {
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
    $actividad->crear_actividad(1, 5, $mi_respuesta, $respuesta['correcto'], $ultimo_recorrido);
} else {
    $respuesta['error'] = true;
}

echo json_encode($respuesta);
