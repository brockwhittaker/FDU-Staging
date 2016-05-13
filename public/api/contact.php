<?php
require_once "email.php";

$full_name = $_POST["full_name"];
$email = $_POST["email"];
$telephone = $_POST["telephone"];
$message = $_POST["message"];

echo json_encode(array(
  "full_name" => $full_name,
  "email" => $email,
  "telephone" => $telephone,
  "message" => $message
));

sendEmail("joneil@fdu.edu", "Contact from $full_name at $email. P/N: $telephone", $message);
?>
