<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=UTF-8');

function value(string $key): string {
  return trim((string)($_REQUEST[$key] ?? ''));
}

function esc(string $value): string {
  return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$facilityId = value('thisIdV');
$companyName = value('CompanyName');

if ($facilityId === '') {
  http_response_code(400);
  echo 'Missing thisIdV';
  exit;
}

$token = base64_encode($facilityId);
$safeCompanyName = $companyName !== '' ? esc($companyName) : 'Selected Company';

echo "<h5 style='margin-top:0px;'>Company Name: <span style='font-size:16px;color:#666;'>{$safeCompanyName}</span></h5>";
echo "1) Copy URL below to link the button:<br>";
echo "https://www.topshopawards.com/submit_nomination.html?tsn#{$token}<br><br>";
echo "2) Download the button by clicking <a href='assets/images/button/ts_vote_2026.png' download style='color:blue;text-decoration:underline;vertical-align:middle;font-weight:600;'>here</a><br><br>";
echo "(Note: If you're not sure how to paste the code behind the button, follow the steps below:)<br>";
echo "a) First insert the Top Shop Vote Now image in your email editor<br>";
echo "b) In the Link tab or Link section add the above URL.<br>";

