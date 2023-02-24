// The entry file of your WebAssembly module.
import {
    addjs,
    logInteger,
    logstringJS,
    readOPCUAWithVarVal,
    subscribeOPCUAWithNodeId,
    mqttPublish,
    mqttSubscribe
} from "./env";

const mqttOptionJSON:string = "{\"clientId\":\"wasmNode\",\"port\":1883,\"host\":\"localhost\",\"rejectUnauthorized\":false,\"protocol\": \"mqtt\",\"reconnectPeriod\":1000}"
const interfaceList:string = "{\"mqtt\":true, \"opcua\":false}"

export function getUsedInterfaceList(): string {
    return interfaceList;
}

export function add(a: i32, b: i32): void {
  addjs(a,b);
}

export function logString(s:string): void {
  logstringJS(s);
}

export  function wasmOpcuaProcess():void{
    subscribeOPCUAWithNodeId("RootFolder", 'ns=3;s=\"QX_MPO_LightOven_Q9\"')
}
/*export function singleReadOPC():void{
    readOPCUAWithVarVal("RootFolder", 'ns=3;s=\"QX_MPO_LightOven_Q9\"')
}

export function subscribeOPC():void{
    subscribeOPCUAWithNodeId("RootFolder", 'ns=3;s=\"QX_MPO_LightOven_Q9\"')
}
*/

export function wasmMqttProcess():void{
    mqttPublish('wasm', 'Hello, I am Wasm module', mqttOptionJSON)
}
/*export function mqttPublishWasm():void{
    mqttPublish('wasm', 'Hello, I am Wasm module', mqttOptionJSON)
}

export function mqttSubscribeWasm():void{
    mqttSubscribe('wasm', mqttOptionJSON)
}*/

//add(1,2);//Works
//logString('Hello World');//Does not work with --binding option (string)!! ReferenceError: Cannot access 'memory' before initialization
//readOPCUAWithVarVal(session,'ns=3;s=\"QX_MPO_LightOven_Q9\"')