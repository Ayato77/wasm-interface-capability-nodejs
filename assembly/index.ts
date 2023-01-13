// The entry file of your WebAssembly module.
import {addjs, logInteger} from "./env";

export function add(a: i32, b: i32): void {
  addjs(a,b);
}

export function logi(val: i32): void {
  logInteger(val)
}
