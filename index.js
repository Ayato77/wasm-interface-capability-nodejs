const fs = require('fs');

const wasmBuffer = fs.readFileSync('./build/main.wasm');
WebAssembly.instantiate(wasmBuffer, {env:{addjs, logInteger}}).then(wasmModule => {
    // Exported function live under instance.exports
    const { add, logi } = wasmModule.instance.exports;
    add(5, 6);
    logi(2);
});

function addjs(a,b){
    console.log(a+b)
}

function logInteger(i){
    console.log("logInteger: " + i)
}