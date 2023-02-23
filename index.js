import {instantiate} from "./instantiate.js";
import {readFileSync} from "fs";

function addjs(a,b){
    console.log(a+b)
}

function logInteger(i){
    console.log("logInteger: " + i)
}

function logstringJS(s){
    console.log("logstring: " + s)
}

const wasmBuffer = readFileSync('./build/main.wasm')
const exports = await instantiate(await WebAssembly.compile(wasmBuffer));
import {add,logString, singleReadOPC, subscribeOPC} from './instantiate.js';
//logString('Hello from WASM');
//add(1,2);
subscribeOPC();
logString('Hello');