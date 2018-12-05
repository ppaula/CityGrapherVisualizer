

export function validate() {
    //TODO verify here inputs (not empty city etc)
    const otherRequirements = true;

    const inputToggleFirst = document.getElementById('inputToggleFirst');
    return otherRequirements && inputToggleFirst.checked;
}