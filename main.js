import {addjs, logInteger, logstringJS} from "./simple_func.js";
import {readOPCUAWithVarVal, subscribeOPCUAWithNodeId} from "./interfaceOPC.js";

export async function instantiate(module, imports = {}) {
  const adaptedImports = {
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      logstringJS(s) {
        // assembly/env/logstringJS(~lib/string/String) => void
        s = __liftString(s >>> 0);
        logstringJS(s);
      },
      readOPCUAWithVarVal(nodeToBrowse, nodeId) {
        // assembly/env/readOPCUAWithVarVal(~lib/string/String, ~lib/string/String) => void
        nodeToBrowse = __liftString(nodeToBrowse >>> 0);
        nodeId = __liftString(nodeId >>> 0);
        readOPCUAWithVarVal(nodeToBrowse, nodeId);
      },
      subscribeOPCUAWithNodeId(nodeToBrowse, nodeId) {
        // assembly/env/subscribeOPCUAWithNodeId(~lib/string/String, ~lib/string/String) => void
        nodeToBrowse = __liftString(nodeToBrowse >>> 0);
        nodeId = __liftString(nodeId >>> 0);
        subscribeOPCUAWithNodeId(nodeToBrowse, nodeId);
      },
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      }, addjs, logInteger
    }),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    logString(s) {
      // assembly/index/logString(~lib/string/String) => void
      s = __lowerString(s) || __notnull();
      exports.logString(s);
    },
  }, exports);
  function __liftString(pointer) {
    if (!pointer) return null;
    const
        end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
        memoryU16 = new Uint16Array(memory.buffer);
    let
        start = pointer >>> 1,
        string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  function __lowerString(value) {
    if (value == null) return 0;
    const
        length = value.length,
        pointer = exports.__new(length << 1, 2) >>> 0,
        memoryU16 = new Uint16Array(memory.buffer);
    for (let i = 0; i < length; ++i) memoryU16[(pointer >>> 1) + i] = value.charCodeAt(i);
    return pointer;
  }
  function __notnull() {
    throw TypeError("value must not be null");
  }
  return adaptedExports;
}
export const {
  memory,
  add,
  logString,
  singleReadOPC,
  subscribeOPC
} = await (async url => instantiate(
    await (async () => {
      try { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
      catch { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
    })(), {
    }
))(new URL("./build/main.wasm", import.meta.url));
