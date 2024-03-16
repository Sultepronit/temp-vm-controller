<script setup>
import { ref, onMounted } from 'vue';

// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// console.log(monaco);
import { monacoEditor, createEditor } from '../js/monacoLogics.js';

const editorElement = ref(null);
// console.log(editorElement);

// let monacoEditor = null;
onMounted(() => {
    // console.log(editorElement);
    // console.log(editorElement.value);

    // const params = {
    //     wordWrap: 'on',
    //     theme: 'vs-dark',
    //     // theme: 'hc-black',
    //     fontSize: '20',
    //     // language: 'html'
    // };
    // monacoEditor = monaco.editor.create(editorElement.value, params);
    createEditor(editorElement);
});
</script>

<template>
    <div ref="editorElement" id="editor"></div>
</template>

<style scoped>
#editor {
    /* height: 500px; */
    height: 99vh;
    border: 1px solid red;
}
</style>