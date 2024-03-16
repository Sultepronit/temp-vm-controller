<script setup>
import FileTree from './components/FileTree.vue';
import MonacoEditor from './components/MonacoEditor.vue';
const editorUrl = import.meta.env.VITE_EDITOR_ULR;
</script>

<template>
    <main>
        <FileTree id="sidebar" />
        <!-- <MonacoEditor id="editor" /> -->
        <iframe id="editor" :src="editorUrl"></iframe>
    </main>
</template>

<style scoped>
main {
    display: grid;
    grid-template-columns: auto 1fr;
}
#sidebar {
    width: 9em;
}
#editor {
    width: 99%;
    height: 99vh;
}
</style>