<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');

$dir = '.';
$everything = scandir($dir);
echo '<pre>';
// print_r($everything);
print_r(array_slice($everything, 2));
$items = array_slice($everything, 2);
$list = ['directories' => [], 'files' => []];
foreach($items as $item) {
    $fullPath = "{$dir}/{$item}";
    echo $fullPath, PHP_EOL;
    echo is_dir($fullPath), PHP_EOL;
    if(is_dir($fullPath)) {
        $list['directories'][] = $item;
    } else {
        $list['files'][] = $item;
    }
}
print_r($list);