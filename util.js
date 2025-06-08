export function getTextAsset(url) {
    return fetch(url)
        .then(response => response.text())
        .catch(() => {
            return "";
        });
}

export function getJsonAsset(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(() => {
            return "";
        });
}