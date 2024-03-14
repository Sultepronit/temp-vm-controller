<script setup>
import sendRequest from './js/api.js';
async function getDirCont(dirName) {
    const postData = {
        action: 'getFileTree',
        baseDir: dirName
    }
    console.log(postData);

    const resp = await sendRequest(postData);
    const dirContObject = JSON.parse(resp);
 
    console.log(dirContObject);
}
getDirCont('..');
</script>

<template>
    <h1>Go</h1>
</template>

<style scoped>

</style>