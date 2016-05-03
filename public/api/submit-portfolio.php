<?php
$full_name = $_POST["full_name"];
$email = $_POST["email"];
$portfolio_link = $_POST["portfolio_link"];
$telephone = $_POST["telephone"];
$message = $_POST["message"];

echo json_encode(array(
  "address" => $address,
  "email" => $email,
  "full_name" => $full_name,
  "message" => $message,
  "telephone" => $telephone
));
?>
