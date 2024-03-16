<script setup>
import { ref, onMounted } from 'vue';
import { editorFrame } from './js/iframeLogics';
import FileTree from './components/FileTree.vue';
import MonacoEditor from './components/MonacoEditor.vue';
const editorUrl = import.meta.env.VITE_EDITOR_ULR;

// const editorFrame = ref(null);
onMounted(() => {
    // console.log(editorFrame);
    // setTimeout(() => {
    //     // editorFrame.value.contentWindow.postMessage('Here we go!', '*');
    //     // editorFrame.value.contentWindow.postMessage('Here we go!', 'https://www.teamsimmer.com');
    //     // editorFrame.value.contentWindow.postMessage('Here we go!', editorUrl);
    //     editorFrame.value.contentWindow.postMessage('{"file": "../remote.php"}', '*');
        
    // }, 2000);
   
    // console.log(editorFrame.value.contentWindow);
});

window.onmessage = function(event){
    // if (event.data == 'message') {
    //     console('Message received!');
    // }
    if(typeof event.data === 'object') {
        return;
    }
    console.log(event.data);
    // console.log(typeof event.data);
    // window.top.postMessage('reply!', '*')
};
</script>

<template>
    <main>
        <FileTree id="sidebar" />
        <!-- <MonacoEditor id="editor" /> -->
        <iframe ref="editorFrame" id="editor" :src="editorUrl"></iframe>
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