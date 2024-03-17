<script setup>
import { ref, onMounted } from 'vue';
import { editorFrame } from './js/editorFrameLogics.js'; 
import FileTree from './components/FileTree.vue';
const editorUrl = import.meta.env.VITE_EDITOR_ULR;
// const terminalUrl = import.meta.env.VITE_TERMINAL_ULR;
const terminalUrl = ref(null);

const terminal = ref(null);
const showTerminal = ref(true);
// const showTerminal = ref(false);
setTimeout(() => terminalUrl.value = import.meta.env.VITE_TERMINAL_ULR, 2000);
// onMounted(() => {
//     // console.log(editorFrame);
//     setTimeout(() => {
//         // editorFrame.value.contentWindow.postMessage('Here we go!', '*');
//         // editorFrame.value.contentWindow.postMessage('Here we go!', 'https://www.teamsimmer.com');
//         // editorFrame.value.contentWindow.postMessage('Here we go!', editorUrl);
//         // editorFrame.value.contentWindow.postMessage('{"file": "../remote.php"}', '*');
//         // terminal.value.contentWindow.postMessage('{"file": "../remote.php"}', '*');
//         terminal.value.contentWindow.postMessage('ls', '*');
        
//     }, 2000);
   
//     // console.log(editorFrame.value.contentWindow);
// });

window.onmessage = function(event){
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
        <section id="main-section">
            <div>
                <button @click="showTerminal = !showTerminal">terminal</button>
            </div>
            <iframe ref="editorFrame" id="editor" :src="editorUrl"></iframe>
            <iframe
                ref="terminal"
                id="terminal"
                :src="terminalUrl"
                :class="{above: showTerminal}"
            />
        </section>
        
    </main>
</template>

<style scoped>
main {
    height: 100vh;
    background-color: #212121;
    color: white;
    display: grid;
    grid-template-columns: auto 1fr;
}
#sidebar {
    width: 9em;
    overflow: auto;
}
#main-section {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
}
#editor {
    width: 99.5%;
    /* width: 100%; */
    /* height: 99vh; */
    height: -webkit-fill-available;
    z-index: 2;
}
#terminal {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 99%;
    height: 50vh;
}
.above {
    z-index: 3;
}
</style>