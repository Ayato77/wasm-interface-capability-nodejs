// The wasm-pack uses wasm-bindgen to build and generate JavaScript binding file.
// Import the wasm-bindgen crate.
use wasm_bindgen::prelude::*;

// Our Add function
// wasm-pack requires "exported" functions
// to include #[wasm_bindgen]
/*#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}*/

const mqttOptionJSON: &str = "{\"clientId\":\"wasmNode\",\"port\":1883,\"host\":\"localhost\",\"rejectUnauthorized\":false,\"protocol\": \"mqtt\",\"reconnectPeriod\":1000}";
const interfaceList:&str = "{\"mqtt\":true, \"opcua\":false}";

#[wasm_bindgen(module = "mqtt-client.js")]
extern "C" {
    fn mqttPublish(topic: &str, message: &str, option: &str);
    fn mqttSubscribe(topic: &str, option:&str);
}


#[wasm_bindgen]
pub fn wasmMqttProcess() {
    mqttPublish("wasm", "Hello, I am Wasm module", mqttOptionJSON)
}

//#[wasm_bindgen]
//pub fn getUsedInterfaceList() -> &str {
//    return interfaceList;
//}