<?php
    $name = $_POST['name'];
	$phone = $_POST['tel'];
    


	$to = "allendorspace@gmail.com"; 
	$date = date ("d.m.Y"); 
	$time = date ("h:i");
	$from = $email;
	$subject = "Заявка c сайта";

	
	$msg="
    Имя: $name /n
    Фамилия: $surname /n
    Телефон: $phone"; 
	mail($to, $subject, $msg, "From: $to ");

?>

<p>Привет, форма отправлена</p>
