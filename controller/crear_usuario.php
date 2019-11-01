<?php

$resultado = [
    'nombre_campo' => false,
    'nombre_max' => false,
    'nombre_formato' => false,
    'apellido_campo' => false,
    'apellido_max' => false,
    'apellido_formato' => false,
    'correo_campo' => false,
    'correo_max' => false,
    'correo_formato' => false,
    'correo_existe' => false,
    'usuario_campo' => false,
    'usuario_max' => false,
    'usuario_min' => false,
    'usuario_formato' => false,
    'usuario_existe' => false,
    'contraseña_campo' => false,
    'contraseña_max' => false,
    'contraseña_min' => false,
    'contraseña_coincide' => false,
    'contraseña_formato' => false,
    'nivel_campo' => false,
    'nivel_existe' => false,
    'pregunta_campo' => false,
    'pregunta_existe' => false,
    'pais_campo' => false,
    'pais_existe' => false,
    'grado_campo' => false,
    'grado_existe' => false,
    'tipo_campo' => false,
    'tipo_existe' => false,
    'ciudad_campo' => false,
    'ciudad_max' => false,
    'fail' => false,
    'url' => '',
    'correo_error' => '',
    'correo_no_enviado' => false,
];

require_once '../model/usuario.php';
require_once '../model/nivel.php';
require_once '../model/pais.php';
require_once '../model/tipo.php';
require_once '../model/grado.php';

$usuario = new Usuario();
$nivel = new Nivel();
$pais = new Pais();
$tipo = new Tipo();
$grado = new Grado();

$nombre = ucwords(strtolower($_POST['nombre']));
$apellido = ucwords(strtolower($_POST['apellido']));
$correo = $_POST['correo'];
$nombre_usuario = $_POST['usuario'];
$contraseña = $_POST['contraseña'];
$comparacion = $_POST['comparacion'];
$ciudad = ucwords(strtolower($_POST['ciudad']));

//Regex

$regex_contraseña = "/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/";
$regex_nombre_apellido = '/^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ]+$/';
$regex_usuario = '/^\w+$/';

//Validacion del nombre
if (empty($nombre)) {
    $resultado['nombre_campo'] = true;
} else {
    if (strlen($nombre) > 30) {
        $resultado['nombre_max'] = true;
    } else {
        if (!preg_match($regex_nombre_apellido, $nombre)) {
            $resultado['nombre_formato'] = true;
        }
    }
}

//Validacion del apellido
if (empty($apellido)) {
    $resultado['apellido_campo'] = true;
} else {
    if (strlen($apellido) > 30) {
        $resultado['apellido_max'] = true;
    } else {
        if (!preg_match($regex_nombre_apellido, $apellido)) {
            $resultado['apellido_formato'] = true;
        }
    }
}

//Validacion del correo
if (empty($correo)) {
    $resultado['correo_campo'] = true;
} else {
    if (strlen($correo) > 40) {
        $resultado['correo_max'] = true;
    } else {
        if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
            $resultado['correo_formato'] = true;
        } else {
            if ($usuario->buscar_con_correo($correo)) {
                $resultado['correo_existe'] = true;
            }
        }
    }
}

//Validacion del usuario
if (empty($nombre_usuario)) {
    $resultado['usuario_campo'] = true;
} else {
    if (strlen($nombre_usuario) > 30) {
        $resultado['usuario_max'] = true;
    } else {
        if (strlen($nombre_usuario) < 6) {
            $resultado['usuario_min'] = true;
        } else {
            if (!preg_match($regex_usuario, $nombre_usuario)) {
                $resultado['usuario_formato'] = true;
            } else {
                if ($usuario->buscar_con_usuario($nombre_usuario)) {
                    $resultado['usuario_existe'] = true;
                }
            }
        }
    }
}

//Validacion de la contraseña
if (empty($contraseña)) {
    $resultado['contraseña_campo'] = true;
} else {
    if (strlen($contraseña) > 30) {
        $resultado['contraseña_max'] = true;
    } else {
        if (strlen($contraseña) < 8) {
            $resultado['contraseña_min'] = true;
        } else {
            if (!preg_match($regex_contraseña, $contraseña)) {
                $resultado['contraseña_formato'] = true;
            } else {
                if ($contraseña != $comparacion) {
                    $resultado['contraseña_coincide'] = true;
                }
            }
        }
    }
}

//Validacion del nivel

if (!isset($_POST['nivel'])) {
    $resultado['nivel_campo'] = true;
} else {
    $nivel_id = $_POST['nivel'];
    if (!$nivel->existe($nivel_id)) {
        $resultado['nivel_existe'] = true;
    }
}

// Validacion de pregunta
if (!isset($_POST['pregunta'])) {
    $resultado['pregunta_campo'] = true;
} else {
    $pregunta = (int) boolval($_POST['pregunta']);
}

//Validacion del pais

if (!isset($_POST['pais'])) {
    $resultado['pais_campo'] = true;
} else {
    $pais_id = $_POST['pais'];
    if (!$pais->existe($pais_id)) {
        $resultado['pais_existe'] = true;
    }
}

//Validacion del grado

if (!isset($_POST['grado'])) {
    $resultado['grado_campo'] = true;
} else {
    $grado_id = $_POST['grado'];
    if (!$grado->existe($grado_id)) {
        $resultado['grado_existe'] = true;
    }
}

//Validacion del tipo

if (!isset($_POST['tipo'])) {
    $resultado['tipo_campo'] = true;
} else {
    $tipo_id = $_POST['tipo'];
    if (!$tipo->existe($tipo_id)) {
        $resultado['tipo_existe'] = true;
    }
}

//Validacion de la ciudad

if (empty($ciudad)) {
    $resultado['ciudad_campo'] = true;
} else {
    if (strlen($ciudad) > 40) {
        $resultado['ciudad_max'] = true;
    }
}

//Conclusion

if (!in_array(true, $resultado)) {
    require_once '../model/correo.php';
    require '../model/config.php';
    $resultado['url'] = $dns;
    $sender = new Correo();
    $contraseña = password_hash($contraseña, PASSWORD_DEFAULT, ['cost' => 10]);
    $codigo = str_shuffle($nombre_usuario);
    $id_activacion = md5($codigo);
    $resultado_correo = $sender->enviar_activacion($correo, $nombre_usuario, $id_activacion);
    if ($resultado_correo['enviado']) {
        $usuario->crear($nombre, $apellido, $correo, $ciudad, $pregunta, $nombre_usuario, $contraseña, $id_activacion, $nivel_id, $pais_id, $grado_id, $tipo_id);
        session_start();
        $_SESSION['usuario'] = $nombre_usuario;
    } else {
        $resultado['correo_error'] = $resultado_correo['contenido'];
        $resultado['correo_no_enviado'] = true;
    }
} else {
    $resultado['fail'] = true;
}

echo json_encode($resultado);
