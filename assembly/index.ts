// The entry file of your WebAssembly module.
import {addjs, logInteger, logstringJS, readOPCUAWithVarVal, subscribeOPCUAWithNodeId} from "./env";

export function add(a: i32, b: i32): void {
  addjs(a,b);
}

export function logString(s:string): void {
  logstringJS(s);
}

export function singleReadOPC():void{
    readOPCUAWithVarVal("RootFolder", 'ns=3;s=\"QX_MPO_LightOven_Q9\"')
}

export function subscribeOPC():void{
    subscribeOPCUAWithNodeId("RootFolder", 'ns=3;s=\"QX_MPO_LightOven_Q9\"')
}
//connectOPCUA("RootFolder");

//add(1,2);//Works
//logString('Hello World');//Does not work with --binding option (string)!! ReferenceError: Cannot access 'memory' before initialization
//readOPCUAWithVarVal(session,'ns=3;s=\"QX_MPO_LightOven_Q9\"')