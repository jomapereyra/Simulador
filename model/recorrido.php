<?php

class Recorrido
{
    private $db; //conexion

    public function __construct()
    {
        require_once 'conexion.php';
        $this->db = Conexion::conectar();
    }

    //CREA A UN USUARIO QUE ADEUDA ACTIVACION

    public function traer_ultimo($id_usuario)
    {
        $consulta = $this->db->prepare('SELECT id_recorrido FROM recorrido WHERE id_usuario = :id AND completado = 0');
        $consulta->bindParam(':id', $id_usuario);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);
        if (!$datos) {
            $consulta = $this->db->prepare('INSERT INTO recorrido(id_usuario) VALUES (:id)');
            $consulta->bindParam(':id', $id_usuario);
            $consulta->execute();

            return $this->db->lastInsertId();
        } else {
            return $datos['id_recorrido'];
        }
    }
}
