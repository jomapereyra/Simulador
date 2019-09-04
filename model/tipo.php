<?php

class Tipo
{
    private $db; //conexion

    public function __construct()
    {
        require_once 'conexion.php';
        $this->db = Conexion::conectar();
    }

    public function existe($id)
    {
        $registro = $this->db->query("SELECT * FROM tipo_protesis WHERE id_tipo='".$id."'")->rowCount();

        return $registro > 0;
    }
}
