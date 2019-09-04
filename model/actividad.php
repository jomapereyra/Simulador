<?php

class Actividad
{
    private $db; //conexion

    public function __construct()
    {
        require_once 'conexion.php';
        $this->db = Conexion::conectar();
    }

    //SIRVE PARA REANUDAR EL TRABAJO DEL USUARIO

    public function traer_ultima_etapa($id_recorrido)
    {
        $consulta = $this->db->prepare('SELECT etapa FROM actividad WHERE id_recorrido = :id ORDER BY etapa DESC LIMIT 1');
        $consulta->bindParam(':id', $id_recorrido);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);
        if (empty($datos)) {
            return false;
        } else {
            return $datos['etapa'];
        }
    }

    //RETORNA UN BOOLEANO EN LA CUAL ES VERDADERO SI NUNCA PASE POR UNA ETAPA DETERMINADA

    public function ya_pase($etapa, $id_recorrido)
    {
        $consulta = $this->db->prepare('SELECT COUNT(*) AS cantidad FROM actividad WHERE id_recorrido = :id AND etapa = :etapa');
        $consulta->bindParam(':id', $id_recorrido);
        $consulta->bindParam(':etapa', $etapa);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        return $datos['cantidad'];
    }

    //RETORNA LA CANTIDAD DE ACTIVIDADES RESUELTAS DE CIERTA ETAPA

    public function terminadas($id_recorrido, $etapa)
    {
        $consulta = $this->db->prepare('SELECT COUNT(id_actividad) AS cantidad FROM actividad WHERE id_recorrido = :id AND etapa = :etapa');
        $consulta->bindParam(':id', $id_recorrido);
        $consulta->bindParam(':etapa', $etapa);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        return $datos['cantidad'];
    }

    public function total_terminadas($id_recorrido)
    {
        $consulta = $this->db->prepare('SELECT COUNT(id_actividad) AS cantidad FROM actividad WHERE id_recorrido = :id');
        $consulta->bindParam(':id', $id_recorrido);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        return $datos['cantidad'];
    }

    //GUARDA MI RESPUESTA EN LA BD

    public function crear_actividad($num_actividad, $etapa, $respuesta, $correcto, $id_recorrido)
    {
        $consulta = $this->db->prepare('INSERT INTO actividad(nro_actividad, etapa, respuesta, correcto, id_recorrido) VALUES (:num_actividad,:etapa,:respuesta,:correcto, :id_recorrido)');
        $consulta->bindParam(':num_actividad', $num_actividad);
        $consulta->bindParam(':etapa', $etapa);
        $consulta->bindParam(':respuesta', $respuesta);
        $consulta->bindParam(':correcto', $correcto);
        $consulta->bindParam(':id_recorrido', $id_recorrido);
        $consulta->execute();
    }

    //BUSCA UNA ACTIVIDAD DE UNA DETERMINADA ETAPA Y RECOORRIDO

    public function buscar_actividad($num_actividad, $etapa, $id_recorrido)
    {
        $consulta = $this->db->prepare('SELECT * FROM actividad WHERE id_recorrido = :id AND etapa = :etapa AND nro_actividad = :num');
        $consulta->bindParam(':id', $id_recorrido);
        $consulta->bindParam(':etapa', $etapa);
        $consulta->bindParam(':num', $num_actividad);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        return $datos;
    }
}
