<?php

class Grado
{
    private $db; //conexion

    public function __construct()
    {
        require_once 'conexion.php';
        $this->db = Conexion::conectar();
    }

    public function existe($id)
    {
        $registro = $this->db->query("SELECT * FROM grado_hipoacusia WHERE id_grado='".$id."'")->rowCount();

        return $registro > 0;
    }
}
