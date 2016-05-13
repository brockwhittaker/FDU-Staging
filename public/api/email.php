<?php

require_once 'swift/swift_required.php';
// send text messages

function sendEmail ($email, $subject, $message) {
  $contents = str_replace("<br />", "\n", $_POST['message']);

	$transport = Swift_SmtpTransport::newInstance('fdustaging.blindhack.com', 465, "ssl") 			// we need their informaiton here
	  ->setUsername('**username**')
	  ->setPassword('**password**');

	$mailer = Swift_Mailer::newInstance($transport);

	$message = Swift_Message::newInstance("$subject")
		->setFrom(array($email => $email))
		->setTo(array($email))
		->setBody($message);

	$result = $mailer->send($message);

	return json_encode(array(
		"success" => 1,
		"data"		=> array(
			"email"		=> $email,
			"subject"	=> $subject,
			"body"		=> $message,
      "result"  => $result
		)
	));
}

?>
