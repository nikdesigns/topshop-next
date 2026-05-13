<?php
declare(strict_types=1);

header('Content-Type: text/plain; charset=UTF-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo 'Method Not Allowed';
  exit;
}

function field(string $name): string {
  return trim((string)($_POST[$name] ?? ''));
}

function esc(string $value): string {
  return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$fullName = field('FullName');
$email = field('Email');
$phone = field('Phone');
$companyName = field('CompanyName');
$detail = field('Detail');

if ($fullName === '') {
  http_response_code(400);
  echo 'Missing FullName';
  exit;
}

// Keep this recipient aligned with the original legacy implementation.
$to = 'juliana@the145.com';
$subject = 'TopShop Query';

$message = '<br><table>'
  . '<tr><td>Hi,</td></tr>'
  . '<tr><td>&nbsp;</td></tr>'
  . '<tr><td>Name:</td><td>' . esc($fullName) . '</td></tr>'
  . '<tr><td>Email:</td><td>' . esc($email) . '</td></tr>'
  . '<tr><td>Phone:</td><td>' . esc($phone) . '</td></tr>'
  . '<tr><td>Company Name:</td><td>' . esc($companyName) . '</td></tr>'
  . '<tr><td>Detail:</td><td>' . nl2br(esc($detail)) . '</td></tr>'
  . '<tr><td>&nbsp;</td></tr>'
  . '<tr><td>Thanks</td></tr>'
  . '</table>';

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= "From: <info@topshopawards.com>\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $headers .= "Reply-To: {$email}\r\n";
}

$sent = mail($to, $subject, $message, $headers);
if ($sent) {
  echo 'Mail sent';
  exit;
}

http_response_code(500);
echo 'Mail failed';
