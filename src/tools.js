
// export const WEB_URL = process.env.REACT_APP_WEB_URL;
// export const REST_URL = process.env.REACT_APP_REST_URL;

export const REST_URL = "https://trim.kab.sh/rest"
export const WEB_URL = "https://trim.kab.sh"

export const getData = (url, cb) => fetch(`${url}`,{
    headers: {'Content-Type': 'application/json'},
}).then((response) => {
    if (response.ok) {
        return response.json().then(data => cb(data));
    }
})
    .catch(ex => console.log(`get ${url}`, ex));

export const putData = (path, data, cb) => fetch(`${path}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body:  JSON.stringify(data)
})
    .then((response) => {
        if (response.ok) {
            return response.json().then(respond => cb(respond));
        }
    })
    .catch(ex => console.log("Put Data error:", ex));
