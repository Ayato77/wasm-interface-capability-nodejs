import {
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
    AttributeIds,
    makeBrowsePath,
    ClientSubscription,
    TimestampsToReturn,
    ClientMonitoredItem,
    DataValue
} from "node-opcua";

//OPCUA
const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
}

const options = {
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    endpointMustExist: false,
};

const client = OPCUAClient.create(options);
//const endpointUrl = __getString(getOpcEndpoint());
const endpointUrl = "opc.tcp://0.0.0.0:4840/freeopcua/server/" //local sample server url
let session

// step 1 : connect to
export async function connectOPCUA(nodeToBrowse){
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

export async function readOPCUAWithVarVal(nodeToBrowse, nodeId){
    console.log("readOPCUAWithVarVal is called!!")

    await connectOPCUA(nodeToBrowse)

    let ovenPowerStatus = await session.read({
        nodeId: nodeId,
        attributeId: AttributeIds.Value
    });
    console.log(" ovenPowerStatus = ", ovenPowerStatus.toString());
}