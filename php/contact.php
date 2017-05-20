<?php
$to = 'manuel@3wpanama.com';
$subject = 'Formulario de contacto - 3W';
$headers = 'From: (3W Panama)' . "\r\n" . 'Content-type: text/html; charset=utf-8';
$message = '
<html>
	<head>
		<title>Formulario de contacto - 3W</title>
	</head>
	<body>
		<h3>Name: <span style="font-weight: normal;">' . $_POST['name'] . '</span></h3>
		<h3>Email: <span style="font-weight: normal;">' . $_POST['email'] . '</span></h3>
		<div>
			<h3 style="margin-bottom: 5px;">Comment:</h3>
			<div>' . $_POST['comment'] . '</div>
		</div>
	</body>
</html>';

if (!empty($_POST['name']) && !empty($_POST['email'])) {
	if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		mail($to, $subject, $message, $headers) or die('<span class="text-danger">Error sending Mail</span>');
	  echo '<span class="text-success send-true">Your email was sent!</span>';
	} else {
		echo '<span class="text-danger">Please specify correct e-mail!</span>';
	}
} else {
	echo '<span class="text-danger">All fields must be filled!</span>';
}
?>