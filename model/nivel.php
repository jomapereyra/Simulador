<?php

class Nivel
{
    private $db; //conexion

    public function __construct()
    {
        require_once 'conexion.php';
        $this->db = Conexion::conectar();
    }

    public function existe($id)
    {
        $registro = $this->db->query("SELECT * FROM nivel_educativo WHERE id_nivel='".$id."'")->rowCount();

        return $registro > 0;
    }
}
