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
} else if($postData['action'] === 'manage-filesystem') {
    // $command = 'cd ' . $postData['path'];
    $command = '';

    if($postData['command'] === 'touch') {
        $command = "cd {$postData['path']} && touch {$postData['name']} 2>&1";
    } else if($postData['command'] === 'mkdir') {
        $command = "cd {$postData['path']} && mkdir {$postData['name']} 2>&1";
    } else if($postData['command'] === 'rm') {
        $command = "rm -r {$postData['item']} 2>&1";
    }

    echo $command;
    $result = shell_exec($command);
    echo $result;
} else {
    print_r($postData); 
}
