<?php
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
?>
