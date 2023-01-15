/*import {
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
    AttributeIds,
    makeBrowsePath,
    ClientSubscription,
    TimestampsToReturn,
    MonitoringParametersOptions,
    ReadValueIdOptions,
    ClientMonitoredItem,
    DataValue, ClientSession
} from "node-opcua";*/
/*const opcua = require('node-opcua');
const fs = require('fs');

const wasmBuffer = fs.readFileSync('./build/main.wasm');
WebAssembly.instantiate(wasmBuffer, {env:{addjs, logInteger, connectOPCUA, readOPCUAWithVarVal}}).then(wasmModule => {
    // Exported function live under instance.exports
    const { add, logi} = wasmModule.instance.exports;
    add(5, 6);
    logi(2);
});

function addjs(a,b){
    console.log(a+b)
}

function logInteger(i){
    console.log("logInteger: " + i)
}


//OPCUA
const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
}

const options = {
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: opcua.MessageSecurityMode.None,
    securityPolicy: opcua.SecurityPolicy.None,
    endpointMustExist: false,
};

const client = opcua.OPCUAClient.create(options);
//const endpointUrl = __getString(getOpcEndpoint());
const endpointUrl = "opc.tcp://0.0.0.0:4840/freeopcua/server/" //local sample server url
let session

// step 1 : connect to
async function connectOPCUA(nodeToBrowse){
    try{
        await client.connect(endpointUrl);
        console.log("connected !");
        // step 2 : createSession
        session = await client.createSession();//It's better if this created session can be returned to WASM module.
        console.log("session created !");

// step 3 : browsing root folder
        //const browseResult = await session.browse("RootFolder");
        const browseResult = await session.browse(nodeToBrowse);

        console.log("references of RootFolder :");
        for(const reference of browseResult.references) {
            console.log( "   -> ", reference.browseName.toString());
        }
    }
    catch (err){
        console.log("OPCUA connection:",err);
    }
}

// step 4 : read a variable with readVariableValue
async function readOPCUAWithVarVal(session, nodeId){
    let ovenPowerStatus = await session.read({
        nodeId: nodeId,
        attributeId: opcua.AttributeIds.Value
    });
    console.log(" ovenPowerStatus = ", ovenPowerStatus.toString());
}*/

import {instantiate} from "./main.js";
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
import {add,logString, connectOPC} from './main.js';
//logString('Hello from WASM');
//add(1,2);
connectOPC();
logString('Hello');