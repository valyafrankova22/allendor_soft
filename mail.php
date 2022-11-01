<?php 

require_once('PHPMailer-master/PHPMailerAutoload.php');

$mail = new PHPMailer;
$mail->CharSet = "UTF-8";

$name = $_POST['name'];
$phone = $_POST['tel'];
$title = "заявка з сайта";

$mail->isSMTP();
$mail->SMTPAuth   = true;
$mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
 $mail->Username   = 'allendorspace@gmail.com'; // Логин на почте
 $mail->Password   = 'ovmeajkzbsgmwedy'; // Пароль на почте
 $mail->SMTPSecure = 'ssl';
 $mail->Port       = 465;

$mail->setFrom('allendorspace@gmail.com', 'Заявка з сайта'); // Адрес самой почты и имя отправителя
$mail->addAddress('allendorspace@gmail.com');
$mail->addAddress('officepelicano@gmail.com');

$mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = '' .$name . 'Залишив заявку' .$phone;
  $mail->AltBody = '';

  if(!$mail->send()) {
    echo 'Error';
  } else {
    echo 'Заявка надіслана';
  }





