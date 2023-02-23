# wasm-interface-capability-nodejs
Invetigation of Wasm's capability for heterogeneous interfaces like HTTP, MQTT, OPCUA, and more. 

## Exchange of String value between WASM and JavaScript
Passing String from WASM to JavaScript (and viceversa) requires compile with a option `--bindings`. This implementation uses `--bindings raw` option ([AssemblyScript official documentation](https://www.assemblyscript.org/compiler.html#compiler-options)). Compiler creates a JS-code automatically that instantiates WASM, and this experiment extends this generated code in `instantiate.js`. Usage is in the following.
1. Run `npm run bindbuild` or `asc assembly/index.ts --bindings raw -o build/main.wasm`
2. Copy code in `build/main.js` and paste to `instantiate.js`
3. Adjust Wasm file's directory and add `export` declaration  to the head of `async function instantiate`. If there are some WASM functions that do not need String exchange, you should add such functions in `adaptedExports`.

## OPCUA
Calling OPCUA functions based on `NodeOPCUA` from WASM is possible. The current implementation provides two functions: single read with a nodeID and subscription. 
