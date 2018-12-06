import { validate } from './formValidator.js';
import { getCityGraphUri } from './config/config.js';
import { getJsonData } from './rest/get.js';
import { drawDataAsGraph } from './graph.js';

const algorithmStarterButton = document.getElementById("algorithmStarterButton");

algorithmStarterButton.onclick = function() {
    if (validate()) {
        const cityInput = document.getElementById("cityInput");
        const cityName = cityInput.value;
        const cityGraphDataUri = getCityGraphUri(cityName);
        getJsonData(cityGraphDataUri)
            .then(result => drawDataAsGraph(result))
            .catch(error => console.log(error));
    } else {
        // TODO call here errorPrinter or sth else, most probably in another script file
    }
}