<?php

class Viewer
{
    private $loader;
    public $twig;

    public function __construct()
    {
        require_once './vendor/autoload.php';
        $this->loader = new Twig_Loader_Filesystem('./view');       // Cargo la ruta de todas mis vistas
        $this->twig = new Twig_Environment($this->loader, []);            //Genero el entorno con el loader antes definido
    }
}
