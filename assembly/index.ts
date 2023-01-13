// The entry file of your WebAssembly module.
import {addjs, logInteger, connectOPCUA, logstringJS} from "./env";

export function add(a: i32, b: i32): void {
  addjs(a,b);
}

export function logString(s:string): void {
  logstringJS(s);
}

export function connectOPC(nodeToBrowse:string):void{
  connectOPCUA(nodeToBrowse);
}

//connectOPC("RootFolder")


//connectOPCUA("RootFolder");
//readOPCUAWithVarVal(session,'ns=3;s=\"QX_MPO_LightOven_Q9\"')