import {instantiate} from "./instantiate.js";
import {initSync} from "./pkg/main.js"
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

//const wasmBuffer = readFileSync('./build/main.wasm')
//const exports = await instantiate(await WebAssembly.compile(wasmBuffer));

/*import {
    add,
    logString,
    getUsedInterfaceList,
    wasmMqttProcess,
    wasmOpcuaProcess
} from './instantiate.js';

logString('Hello');
const wasmInterfaceList = JSON.parse(getUsedInterfaceList());
console.log(wasmInterfaceList)

if(wasmInterfaceList['mqtt']){
    wasmMqttProcess();
}

if(wasmInterfaceList['opcua']){
    wasmOpcuaProcess();
}*/

const wasmBuffer = readFileSync('./pkg/main_bg.wasm')
const runWasm = await initSync(wasmBuffer);

runWasm.wasmMqttProcess();