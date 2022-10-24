<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = `UTF-8`;
$mail->IsHTML(true);

$mail->setForm('allendor@foft', 'Заявка на дзвінок' );
$mail->addAddress('allendorspace@gmail.com');
$mail->Subject = 'Заявка на зворотній дзвінок!';

$body = '<h1>Заявка</h1>';

    if(trim(!empty($_POST[`name`]))) {
    $body.='<p><strong>ПІБ:</strong> '.$_POST['name'].'</p>';
   }
   if(trim(!empty($_POST[`tel`]))) {
       $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
      }

$mail->Body = $body;

if(!$mail->send()) {
$message = 'Помилка';
} else {
$message = 'Заявка надіслана';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
