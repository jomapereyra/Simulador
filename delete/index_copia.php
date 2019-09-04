<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sarasa</title>
</head>
<body>
    <p>Hasta aca funciona</p>   
    <?php
    require_once 'model/viewer.php';
     'vendor/autoload.php';
    session_start();
    if (!isset($_SESSION['usuario'])) {     //Si el usuario NO esta logeado
        echo "<p>Deberia redireccionar al login</p>";
    } else {                                //Si el usuario ESTA logeado
        if (isset($_GET['page'])) {
            $page = $_GET['page'];
        } else {
            $page = 'inicio';
        }
        echo "<p>Deberia ir a ".$page."</p>";
    }

    ?>
</body>
</html>
