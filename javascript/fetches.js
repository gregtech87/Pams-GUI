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
    sessionStorage.setItem("uploadResponse", null);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic "+credentials);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    };
    await fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then((result) => {
            sessionStorage.setItem("uploadResponse", result);
        })
        .catch((error) => {
            console.error(error);
            errorBox(error);
        });
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
