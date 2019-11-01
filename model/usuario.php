<?php

class Usuario
{
    private $db; //conexion

    public function __construct()
    {
        require_once 'conexion.php';
        $this->db = Conexion::conectar();
    }

    //CREA A UN USUARIO QUE ADEUDA ACTIVACION

    public function crear($nombre, $apellido, $correo, $ciudad, $nacimiento, $usuario, $contraseña, $id_activacion, $nivel, $pais, $grado, $tipo)
    {
        $resultado = $this->db->prepare('INSERT INTO usuario(nombre,apellido,correo,ciudad_residencia,hipoacusico_nacimiento,usuario,contraseña,id_activacion,id_nivel,id_pais,id_grado,id_tipo) VALUES(:nom,:ape,:correo,:ciudad,:hipo_nac,:user,:pass,:code,:nivel,:pais,:grado,:tipo)');
        $resultado->execute(array(':nom' => $nombre, ':ape' => $apellido, ':correo' => $correo, ':ciudad' => $ciudad, ':hipo_nac' => $nacimiento, ':user' => $usuario, ':pass' => $contraseña, ':code' => $id_activacion, ':nivel' => $nivel, ':pais' => $pais, ':grado' => $grado, ':tipo' => $tipo));
    }

    //MODIFICAR LOS DATOS DE UN USUARIO

    public function modificar($id, $nombre, $apellido, $correo, $ciudad, $nacimiento, /*$usuario,*/ $nivel, $pais, $grado, $tipo)
    {
        $resultado = $this->db->prepare('UPDATE usuario SET nombre=:nom,apellido=:ape,correo=:correo,ciudad_residencia=:ciudad,hipoacusico_nacimiento=:hipo_nac,/*usuario=:user,*/id_nivel=:nivel,id_pais=:pais,id_grado=:grado,id_tipo=:tipo WHERE id_usuario=:id');
        $resultado->execute(array(':id' => $id, ':nom' => $nombre, ':ape' => $apellido, ':correo' => $correo, ':ciudad' => $ciudad, ':hipo_nac' => $nacimiento, /*':user' => $usuario,*/ ':nivel' => $nivel, ':pais' => $pais, ':grado' => $grado, ':tipo' => $tipo));
    }

    //TRAE TODOS LOS DATOS DEL USUARIO A PARTIR DE SU NOMBRE DE USUARIO

    public function get_datos($usuario)
    {
        $consulta = $this->db->prepare('SELECT nombre,apellido,correo,ciudad_residencia,hipoacusico_nacimiento,usuario,usuario.id_nivel,usuario.id_pais,usuario.id_grado,usuario.id_tipo,nombre_pais,nombre_grado,nombre_nivel,nombre_protesis FROM usuario INNER JOIN pais ON usuario.id_pais=pais.id_pais INNER JOIN grado_hipoacusia ON usuario.id_grado=grado_hipoacusia.id_grado INNER JOIN nivel_educativo ON usuario.id_nivel=nivel_educativo.id_nivel INNER JOIN tipo_protesis ON usuario.id_tipo=tipo_protesis.id_tipo WHERE usuario=:user');
        $consulta->bindParam(':user', $usuario);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        return $datos;
    }

    //TRAE LOS DATOS REQUERIDOS EN LA SIDENAV

    public function get_datos_sidenav($usuario)
    {
        $consulta = $this->db->prepare('SELECT id_usuario,nombre,apellido,correo,usuario FROM usuario WHERE usuario.usuario=:usuario');
        $consulta->bindParam(':usuario', $usuario);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        return $datos;
    }

    public function get_activado($usuario)
    {
        $consulta = $this->db->prepare('SELECT status FROM usuario WHERE usuario.usuario=:usuario');
        $consulta->bindParam(':usuario', $usuario);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        return $datos['status'];
    }

    //TRAE LOS DATOS DE LA TABLA USUARIO A PARTIR DE UN NOMBRE DE USUARIO

    public function buscar_con_usuario($usuario)
    {
        $consulta = $this->db->prepare('SELECT * FROM usuario WHERE usuario.usuario=:usuario');
        $consulta->bindParam(':usuario', $usuario);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        return $datos;
    }

    //TRAE LOS DATOS DE LA TABLA USUARIO A PARTIR DE UN CORREO

    public function buscar_con_correo($correo)
    {
        $consulta = $this->db->prepare('SELECT * FROM usuario WHERE usuario.correo=:correo');
        $consulta->bindParam(':correo', $correo);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        return $datos;
    }

    //DESBLOQUEA LA CUENTA - ESTO ES NECESARIO PARA ENTRAR EN EL PROXIMO LOGIN

    public function activar_cuenta($codigo)
    {
        $consulta = $this->db->prepare('UPDATE usuario SET status=1 WHERE id_activacion = :codigo');
        $consulta->bindParam(':codigo', $codigo);
        $consulta->execute();
    }

    //CAMBIA LA CONTRASEÑA DEL USUARIO CON EL MISMO CODIGO DE ACTIVACION

    public function cambiar_contraseña($codigo, $contraseña)
    {
        $consulta = $this->db->prepare('UPDATE usuario SET contraseña=:pass WHERE id_activacion = :codigo');
        $consulta->bindParam(':pass', $contraseña);
        $consulta->bindParam(':codigo', $codigo);
        $consulta->execute();
    }

    //CAMBIA LA CONTRASEÑA DEL USUARIO BUSCANDOLO POR SU NOMBRE DE USUARIO

    public function cambiar_contraseña_con_usuario($usuario, $contraseña)
    {
        $consulta = $this->db->prepare('UPDATE usuario SET contraseña=:pass WHERE usuario = :user');
        $consulta->bindParam(':pass', $contraseña);
        $consulta->bindParam(':user', $usuario);
        $consulta->execute();
    }

    //CAMBIA LA CONTRASEÑA DEL USUARIO BUSCANDOLO POR SU CORREO

    public function cambiar_contraseña_con_correo($correo, $contraseña)
    {
        $consulta = $this->db->prepare('UPDATE usuario SET contraseña=:pass WHERE  correo = :correo');
        $consulta->bindParam(':pass', $contraseña);
        $consulta->bindParam(':correo', $correo);
        $consulta->execute();
    }

    //ASIGNA UN CODIGO DE SEGURIDAD PARA QUE EL USUARIO PUEDA MODIFICAR SU CONTRASEÑA

    public function asignar_codigo($id, $codigo)
    {
        $consulta = $this->db->prepare('UPDATE usuario SET codigo=:code WHERE id_usuario = :id');
        $consulta->bindParam(':code', $codigo);
        $consulta->bindParam(':id', $id);
        $consulta->execute();
    }
}
