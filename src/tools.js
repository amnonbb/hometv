
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

export const putData = (url, data, cb) => fetch(`${url}`, {
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

export const MDB_LANGUAGES = {
    en: 'eng',
    he: 'heb',
    ru: 'rus',
    es: 'spa',
    it: 'ita',
    de: 'ger',
    nl: 'dut',
    fr: 'fre',
    pt: 'por',
    tr: 'tur',
    pl: 'pol',
    ar: 'arb',
    hu: 'hun',
    fi: 'fin',
    lt: 'lit',
    ja: 'jpn',
    bg: 'bul',
    ka: 'geo',
    no: 'nor',
    sv: 'swe',
    hr: 'hrv',
    zh: 'chi',
    fa: 'far',
    ro: 'ron',
    hi: 'hin',
    mk: 'mkd',
    sl: 'slv',
    lv: 'lav',
    sk: 'slk',
    cs: 'cze',
    ua: 'ukr',
    zz: 'mlt',
    xx: 'unk',
};

export const WF_LANGUAGES = function() {
    let ret = {};
    for(let key in MDB_LANGUAGES) {
        ret[MDB_LANGUAGES[key]] = key;
    }
    return ret;
}()

export const LANGS = [{ key: 'he', value: 'heb', flag: 'il', label: 'Hebrew' },
    { key: 'ru', value: 'rus', flag: 'ru', label: 'Russian' },
    { key: 'en', value: 'eng', flag: 'us', label: 'English' },
    { key: 'es', value: 'spa', flag: 'es', label: 'Spanish' },
    { key: 'fr', value: 'fre', flag: 'fr', label: 'French' },
    { key: 'it', value: 'ita', flag: 'it', label: 'Italian' },
    { key: 'de', value: 'ger', flag: 'de', label: 'German' },
    { key: 'tr', value: 'trk', flag: 'tr', label: 'Turkish' },
    { key: 'pt', value: 'por', flag: 'pt', label: 'Portuguese' },
    { key: 'bg', value: 'bul', flag: 'bg', label: 'Bulgarian' },
    { key: 'ka', value: 'geo', flag: 'ge', label: 'Georgian' },
    { key: 'ro', value: 'ron', flag: 'ro', label: 'Romanian' },
    { key: 'hu', value: 'hun', flag: 'hu', label: 'Hungarian' },
    { key: 'sv', value: 'swe', flag: 'se', label: 'Swedish' },
    { key: 'lt', value: 'lit', flag: 'lt', label: 'Lithuanian' },
    { key: 'hr', value: 'hrv', flag: 'hr', label: 'Croatian' },
    { key: 'ja', value: 'jpn', flag: 'jp', label: 'Japanese' },
    { key: 'sl', value: 'slv', flag: 'si', label: 'Slovenian' },
    { key: 'pl', value: 'pol', flag: 'pl', label: 'Polish' },
    { key: 'no', value: 'nor', flag: 'no', label: 'Norwegian' },
    { key: 'lv', value: 'lav', flag: 'lv', label: 'Latvian' },
    { key: 'ua', value: 'ukr', flag: 'ua', label: 'Ukrainian' },
    { key: 'nl', value: 'dut', flag: 'nl', label: 'Dutch' },
    { key: 'cn', value: 'chn', flag: 'cn', label: 'Chinese' },
    { key: 'et', value: 'amh', flag: 'et', label: 'Amharic' },
    { key: 'in', value: 'hin', flag: 'in', label: 'Hindi' },
    { key: 'ir', value: 'per', flag: 'ir', label: 'Persian' },];
