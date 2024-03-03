<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');

$postJson = file_get_contents('php://input');
$postData = json_decode($postJson, true);
print_r($postData);