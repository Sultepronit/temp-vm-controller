import { ref } from "vue";

const editorFrame = ref(null);

function editFile(path) {
    editorFrame.value.contentWindow.postMessage(
        JSON.stringify({file: path}),
        '*'
    );
}

export { editorFrame, editFile };