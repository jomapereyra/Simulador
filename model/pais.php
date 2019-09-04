<?php

class Pais
{
    private $db; //conexion

    public function __construct()
    {
        require_once 'conexion.php';
        $this->db = Conexion::conectar();
    }

    public static function get_paises()
    {
        require_once 'conexion.php';
        $db = Conexion::conectar();
        $consulta = $db->query('SELECT * FROM pais ORDER BY nombre_pais');
        $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);

        return $datos;
    }

    public function existe($id)
    {
        $registro = $this->db->query("SELECT * FROM pais WHERE id_pais='".$id."'")->rowCount();

        return $registro > 0;
    }
}
