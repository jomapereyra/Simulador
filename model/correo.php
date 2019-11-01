<?php
   use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Correo
{
    private $mail;
    private $url_activacion = '/controller/activacion.php?link=';
    private $url_recuperacion = '/controller/cambiar_pass.php?new=';

    public function __construct()
    {
        require_once '../phpmailer/phpmailer/src/Exception.php';
        require_once '../phpmailer/phpmailer/src/PHPMailer.php';
        require_once '../phpmailer/phpmailer/src/SMTP.php';
        $this->mail = new PHPMailer(true);

        //Datos de conexion del Servidor SMTP

        $this->mail->SMTPDebug = 0;                                       // Ver el Debug del envio del mail - 0 para desactivarlo, 2 para activarlo
        $this->mail->isSMTP();                                            // Utilizo el protocolo SMTP para enviar
        //$this->mail->Host = 'smtp.office365.com';                         // Declaro el servidor de SMTP que voy a utilizar
        $this->mail->Host = 'simulador.aulalibre.com.ar';
        $this->mail->SMTPAuth = true;                                     // Habilita la autenticacion SMTP
        //$this->mail->Username = 'jomapereyra@hotmail.com';                // Usuario SMTP (Depende del servidor utilizado)
        $this->mail->Username = 'joma@simulador.aulalibre.com.ar';
        //$this->mail->Password = 'facil123';                               // Contraseña SMTP
        $this->mail->Password = 'KEYblock111:)';
        $this->mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
        //$this->mail->Port = 587;                                          // TCP port to connect to
        $this->mail->Port = 587;
        //$this->mail->setFrom('jomapereyra@hotmail.com');
        $this->mail->setFrom('joma@simulador.aulalibre.com.ar');
        $this->mail->CharSet = 'UTF-8';
    }

    public function enviar_activacion($correo, $usuario, $id_activacion)
    {
        $mensaje = [
            'enviado' => false,
            'contenido' => '',
        ];
        try {
            require 'config.php';
            $this->mail->addAddress($correo);     // Agrego destinatario

            // Contenido
            $this->mail->isHTML(true);
            $this->mail->Subject = 'Activación de su cuenta';
            $this->mail->Body = 'Estimado usuario '.$usuario.' su cuenta fue registrada satisfactoriamente.</br> 
            Antes de su proximo ingreso debe activarla haciendo click en el siguiente enlace: <a href="'.$dns.$this->url_activacion.$id_activacion.'">Activar Cuenta</a>';
            $this->mail->send();
            $mensaje['enviado'] = true;
            $mensaje['contenido'] = 'El mensaje fue enviado';

            return $mensaje;
        } catch (Exception $e) {
            $mensaje['contenido'] = "El mensaje no pudo enviarse. Mailer Error: {$this->mail->ErrorInfo}";

            return $mensaje;
        }
    }

    public function enviar_recuperacion($correo, $usuario, $id_activacion)
    {
        $new_password = md5($id_activacion);
        try {
            require_once 'config.php';
            $this->mail->addAddress($correo);     // Agrego destinatario

            // Contenido
            $this->mail->isHTML(true);
            $this->mail->Subject = 'Recuperar contraseña';
            $this->mail->Body = 'Estimado usuario '.$usuario.' se envio una solicitud para recuperar su contraseña.</br>
            Su nueva contraseña es: <b>'.$new_password.'</b><br>
            Una vez haya iniciado sesion puede modificarla dentro de su perfil.<br>
            Si acepta el cambio de contraseña, haga click en el siguiente enlace: <a href='.$dns.$this->url_recuperacion.$new_password.'&link='.$id_activacion.'>Cambiar contraseña</a>';
            $this->mail->send();
        } catch (Exception $e) {
            echo "El mensaje no pudo enviarse. Mailer Error: {$mail->ErrorInfo}";
        }
    }

    public function enviar_codigo($correo, $usuario, $codigo)
    {
        $mensaje = [
            'enviado' => false,
            'contenido' => '',
        ];
        try {
            require 'config.php';
            $this->mail->addAddress($correo);     // Agrego destinatario

            // Contenido
            $this->mail->isHTML(true);
            $this->mail->Subject = 'Cambio de contraseña';
            $this->mail->Body = 'Estimado usuario '.$usuario.', recientemente ha solicitado un cambio de contraseña.</br>
            Para efectuar este cambio debe ingresar el siguiente codigo dentro de la entrada correspondiente : <b>'.$codigo.'</b><br>
            Si usted no solicito el cambio, le recomendamos que ingrese a nuestro sitio y cambie su contraseña lo antes posible.<br>
            Muchas gracias por su tiempo, que tenga un buen día';
            $this->mail->send();
            $mensaje['enviado'] = true;
            $mensaje['contenido'] = 'El mensaje fue enviado';

            return $mensaje;
        } catch (Exception $e) {
            $mensaje['contenido'] = "El mensaje no pudo enviarse. Mailer Error: {$this->mail->ErrorInfo}";

            return $mensaje;
        }
    }
}
