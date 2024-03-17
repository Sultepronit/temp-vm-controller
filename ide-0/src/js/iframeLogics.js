import { ref } from "vue";

const editorFrame = ref(null);

// setTimeout(() => {
//     // editorFrame.value.contentWindow.postMessage('Here we go!', '*');
//     // editorFrame.value.contentWindow.postMessage('Here we go!', 'https://www.teamsimmer.com');
//     // editorFrame.value.contentWindow.postMessage('Here we go!', editorUrl);
//     editorFrame.value.contentWindow.postMessage('{"file": "../remote.php"}', '*');
    
// }, 2000);

function editFile(path) {
    editorFrame.value.contentWindow.postMessage(
        JSON.stringify({file: path}),
        // '{"file": "../remote.php"}',
        '*');
}

export { editorFrame, editFile };