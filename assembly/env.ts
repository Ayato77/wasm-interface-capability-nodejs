export declare function addjs(a: i32, b:i32):void
export declare function logInteger(a: i32):void
export declare function logstringJS(s: string):void
//export declare function connectOPCUA(nodeToBrowse:string):boolean
export declare function readOPCUAWithVarVal(nodeToBrowse:string, nodeId:string):void
export declare function subscribeOPCUAWithNodeId(nodeToBrowse:string, nodeId:string):void
export declare function mqttPublish(topic:string, message:string, optionJSONString:string):void
export declare function mqttSubscribe(topic:string, optionJSONString:string):void