<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');

function customErrorHandler($errno, $errstr, $errfile, $errline) {
    if ($errno == E_WARNING) {
        // Handle warnings
        echo "Warning: $errstr in $errfile on line $errline\n";
    } else {
        // Handle other types of errors
        echo "Error: $errstr in $errfile on line $errline\n";
    }
}

// Set the custom error handler
set_error_handler('customErrorHandler');

$postJson = file_get_contents('php://input');
$postData = json_decode($postJson, true);
print_r($postData);

// $filePath = trim($postData['filePath']);
if($postData['action'] === 'getFile') {
    $filePath = $postData['file'];

    $fileContents = file_get_contents($filePath);
    // echo $fileContents;
} else if($postData['action'] === 'saveFile') {
    echo "Saving...";
}
