async function getJsonData(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
}

const _getJsonData = getJsonData;
export { _getJsonData as getJsonData };