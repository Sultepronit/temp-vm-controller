<script setup>
console.log('Here we go!');
import { ref, onMounted } from 'vue';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
console.log(monaco);

const editor = ref(null);
console.log(editor);

let monacoEditor = null;
onMounted(() => {
    console.log(editor);
    console.log(editor.value);

    const params = {
        wordWrap: 'on',
        theme: 'vs-dark',
        // theme: 'hc-black',
        fontSize: '20',
        // language: 'html'
    };
    monacoEditor = monaco.editor.create(editor.value, params);
});
</script>

<template>
    <h1>Go!</h1>
    <div ref="editor" id="editor"></div>
</template>

<style scoped>
#editor {
    height: 500px;
}
</style>