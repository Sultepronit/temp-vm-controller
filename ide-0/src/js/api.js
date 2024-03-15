const url = import.meta.env.VITE_API_URL;

const password = 'pass';

async function sendRequest(data) {
    data.password = password;
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const result = await resp.text();
    console.log(result);
    return result;
}

export default sendRequest;
