async function fetchDataGet(url, credentials) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${credentials}`
            }
        });
        if (!response.ok) {
            new Error(`HTTP error! Status: ${response.status}`);
        } else {
            return response;
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}

async function fetchDataGetUnAuth(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            new Error(`HTTP error! Status: ${response.status}`);
        } else {
            return response;
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}


async function fetchDataPost(url, credentials, formData) {

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function fetchDataPostFiles(url, credentials, data) {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", credentials);

    const formdata = new FormData();
    formdata.append("file", data, "/C:/Users/xxgregot/KravSpec/Bilder/Screenshot 2024-01-23 100832.png");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch("http://localhost:8586/api/v1/uploadFile?username=testGuy", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    // try {
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': undefined,
    //             'Authorization': `Basic ${credentials}`
    //         },
    //         body: data,
    //         redirect: "follow"
    //     });
    //     if (!response.ok) {
    //         new Error('Network response was not ok');
    //     }
    //     return await response;
    // } catch (error) {
    //     console.error('Error:', error);
    //     throw error;
    // }
}

async function fetchDataPut(url, credentials, formData) {

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function fetchDataDelete(url, credentials) {
    let deleteMessageFromBackend;
    try {
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${credentials}`
            }
        })
            .then(response => response.text())
            .then(data => {
                deleteMessageFromBackend = data;
            })
    } catch (error) {
        console.error('Error: ', error);
    }
    return deleteMessageFromBackend;
}
