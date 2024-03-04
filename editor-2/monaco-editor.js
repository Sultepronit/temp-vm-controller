require.config({ paths: { vs: 'node_modules/monaco-editor/min/vs' } });

const params = {
    wordWrap: 'on',
    theme: 'vs-dark',
    fontSize: '20'
};

let monacoEditor = null;
let model = null;
require(['vs/editor/editor.main'], () => {
    monacoEditor = monaco.editor.create(document.getElementById('monaco'), params);
});

const models = {};

function editInMonaco(filePath, fileContent) {
    if(models[filePath]) {
        monacoEditor.setModel(models[filePath]);
    } else {
        require(['vs/editor/editor.main'], () => { 
            model = monaco.editor.createModel(fileContent, null, monaco.Uri.file(filePath));
            monacoEditor.setModel(model);
            models[filePath] = model;
        });
    }
}

// editInMonaco('./t.php', '<?php \n echo "here we go!!!"');