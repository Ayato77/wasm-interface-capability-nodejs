// The entry file of your WebAssembly module.
import {addjs, logInteger, connectOPCUA, logstringJS} from "./env";

export function add(a: i32, b: i32): void {
  addjs(a,b);
}

export function logString(s:string): void {
  logstringJS(s);
}

export function connectOPC():void{
  connectOPCUA("RootFolder");
}

//connectOPC("RootFolder")

//add(1,2);//Works
//logString('Hello World');//Does not work with --binding option (string)!! ReferenceError: Cannot access 'memory' before initialization
//readOPCUAWithVarVal(session,'ns=3;s=\"QX_MPO_LightOven_Q9\"')