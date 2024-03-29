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
// print_r($postData);

// $filePath = trim($postData['filePath']);
if($postData['action'] === 'getFile') {
    $filePath = $postData['file'];

    $fileContents = file_get_contents($filePath);
    echo $fileContents;
} else if($postData['action'] === 'saveFile') {
    // echo "Saving...";
    file_put_contents($postData['file'], $postData['contents']);
    echo "Saved!";
} else if($postData['action'] === 'getFileTree') {
    require_once 'getFileTree.php';
    echo getFileTree($postData['baseDir']);
} else  if($postData['action'] === 'manage-filesystem') {
    $command = 'cd ' . $postData['path'];
    if($postData['command'] === 'touch') {
        // $command .= ' && touch' . $postData['name'] . ' 2>&1';
        $command = "{$command} && touch {$postData['name']} 2>&1";
    }
} else {
    print_r($postData); 
}
