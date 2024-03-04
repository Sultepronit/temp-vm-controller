<?php
declare(strict_types=1);

// header('Access-Control-Allow-Origin: *');

// $dir = '.';

function getFileTree($dir) {
    $everything = scandir($dir);
    $items = array_slice($everything, 2);

    $list = ['directories' => [], 'files' => []];

    foreach($items as $item) {
        $fullPath = "{$dir}/{$item}";

        if(is_dir($fullPath)) {
            $list['directories'][] = $item;
        } else {
            $list['files'][] = $item;
        }
    }

    // echo '<pre>';
    // print_r($list);
    // echo json_encode($list);
    return json_encode($list);
}
