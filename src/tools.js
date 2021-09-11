
export const WEB_URL = process.env.REACT_APP_WEB_URL;
export const REST_URL = process.env.REACT_APP_REST_URL;

export const getData = (url, cb) => fetch(`${url}`,{
    headers: {'Content-Type': 'application/json'},
}).then((response) => {
    if (response.ok) {
        return response.json().then(data => cb(data));
    }
})
    .catch(ex => console.log(`get ${url}`, ex));
