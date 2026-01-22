<?php
require_once 'conexion.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if (isset($_POST['registro'])) {
    
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];

    try {
        $sql = "INSERT INTO Validacion (nombre, email, telefono) VALUES (:nom, :ema, :tel)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':nom' => $nombre, ':ema' => $email, ':tel' => $telefono]);

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'gustvo2506@gmail.com'; 
        $mail->Password   = 'rxovdbdptdjzjthc'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('gustvo2506@gmail.com', 'Portafolio Web');
        $mail->addAddress($email, $nombre);
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Confirmación de Registro - Portafolio';

        // --- PLANTILLA DE CORREO MODERNA Y LIMPIA ---
        $mail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                .email-container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
                .header { background-color: #4a7c7a; padding: 40px 20px; text-align: center; }
                .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
                .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
                .welcome-text { font-size: 18px; margin-bottom: 20px; color: #2c4d4b; }
                .data-box { background-color: #f8fcfc; border-left: 5px solid #4a7c7a; padding: 20px; margin: 25px 0; border-radius: 4px; }
                .data-item { margin-bottom: 10px; font-size: 15px; }
                .data-label { font-weight: bold; color: #555; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
                .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; }
            </style>
        </head>
        <body>
            <div class='email-container'>
                <div class='header'>
                    <h1>¡REGISTRO EXITOSO!</h1>
                </div>
                <div class='content'>
                    <p class='welcome-text'>Hola, <strong>$nombre</strong> 👋</p>
                    <p>Tu información ha sido recibida y almacenada correctamente en nuestra base de datos. Gracias por participar en esta prueba de servicio SMTP.</p>
                    
                    <div class='data-box'>
                        <div class='data-item'>
                            <div class='data-label'>Correo Registrado</div>
                            <div style='color: #4a7c7a; font-weight: 600;'>$email</div>
                        </div>
                        <div class='data-item' style='margin-bottom: 0;'>
                            <div class='data-label'>Teléfono de Contacto</div>
                            <div>$telefono</div>
                        </div>
                    </div>

                    <p>Si no realizaste este registro, puedes ignorar este mensaje.</p>
                </div>
                <div class='footer'>
                    © 2026 Portafolio de Desarrollo · Gustavo Rocamontes
                </div>
            </div>
        </body>
        </html>";

        $mail->send();
        header('Location: exito.php?email=' . urlencode($email));
        exit; 

    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
} else {
    header('Location: index.html');
    exit;
}
?>