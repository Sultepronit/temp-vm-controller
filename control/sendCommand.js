// const url = 'http://localhost:7979/';
// const url = 'http://34.116.243.6/remote.php';
const url = '/remote.php';

const password = 'pass';

async function sendCommand(command) {
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            password,
            command
        })
    });
    const result = await resp.text();
    console.log(result);
    return result;
}

// export default sendCommand;