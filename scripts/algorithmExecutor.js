import { draw } from './graph.js';
import { validate } from './formValidator.js';

const algorithmStarterButton = document.getElementById("algorithmStarterButton");

algorithmStarterButton.onclick = function() {
    if (validate()) {
        const cityInput = document.getElementById("cityInput");
        const cityName = cityInput.value;
        console.log("run algorithm for city: " + cityName);
    } else {
        // TODO call here errorPrinter or sth else, most probably in another script file
    }
}