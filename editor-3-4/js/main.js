"use strict";

const terminal = document.querySelector('.terminal');

const theLocation = window.location;
console.log(location);
const myHref = location.href;
console.log(myHref);

const lastSlash = myHref.substring(0, myHref.length - 1).lastIndexOf("/");
const fileRoot = myHref.substring(0, lastSlash);
console.log(fileRoot);

function toggleTerminal() {
    if(terminal.classList.contains('z-top')) {
        terminal.classList.remove('z-top');
    } else {
        terminal.classList.add('z-top');
    }
}

document.getElementById('toggle-terminal')
    .addEventListener('click', () => toggleTerminal());

createRoot('.', 'root');
// createRoot('./editor-3-2', 'editor-3-2');

setTimeout(() => {
    // terminal.src = `http://${location.hostname}:8080`;
    console.log(terminal);
}, 4000);

