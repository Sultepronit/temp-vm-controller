const url = 'http://34.116.243.6/temp-vm-controller/get-file.php';

const password = 'pass';

async function manageFile(data) {
    data.password = password;
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const result = await resp.text();
    console.log(result);
    return result;
}

// export default manageFile;