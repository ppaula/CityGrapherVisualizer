import { getCityDataUri } from './config/config.js';


export function drawGraph(city) {
    callEndpoint(city);
}

function callEndpoint(city) {
    const cityDataUri = getCityDataUri('Bochnia');
    //TODO impl
    foo();
}

async function foo() {
    var s = await bar();
    console.log(s);
}

function bar() {
    return "bar";
}