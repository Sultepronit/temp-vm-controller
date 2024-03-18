<script setup>
import { ref, onMounted } from 'vue';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/php/php.js';
// import 'codemirror/mode/gfm/gfm.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
// import { editorFrame } from './js/editorFrameLogics.js'; 
import FileTree from './components/FileTree.vue';
// const editorUrl = import.meta.env.VITE_EDITOR_ULR;
// const terminalUrl = import.meta.env.VITE_TERMINAL_ULR;

// let cm = new CodeMirror();
const terminalUrl = ref(null);

const editor = ref(null);
const content = ref('let a = 1;');


const terminal = ref(null);
const showTerminal = ref(true);
// const showTerminal = ref(false);
setTimeout(() => terminalUrl.value = import.meta.env.VITE_TERMINAL_ULR, 2000);
onMounted(() => {
    CodeMirror.fromTextArea(editor.value, {
        lineNumbers: true,
        theme: 'dracula',
        // mode: 'javascript',
        mode: 'php',
        hint: CodeMirror.hint.javascript
        // theme: 'material'
    });
});

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
            <!-- <iframe ref="editorFrame" id="editor" :src="editorUrl"></iframe> -->
            <textarea ref="editor" id="editor" v-model="content" />
            <!-- <iframe
                ref="terminal"
                id="terminal"
                :src="terminalUrl"
                :class="{above: showTerminal}"
            /> -->
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