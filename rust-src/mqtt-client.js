import mqtt from 'mqtt'

export function mqttPublish(topic, message, optionJSONString){
    const options = JSON.parse(optionJSONString)
    const mqttClient = mqtt.connect(options);
    let pubInterval

    mqttClient.on('connect', function () {
        mqttClient.subscribe('presence', function (err) {
            if (!err) {
                pubInterval = setInterval(()=> {mqttClient.publish(topic, message)}, 2000);
                console.log("MQTT connected")
            }
        })
    })

}

export function mqttSubscribe(topic, optionJSONString){
    const options = JSON.parse(optionJSONString)
    const mqttClient  = mqtt.connect(options);

    mqttClient.on('connect', function () {
        mqttClient.on('message', function (topic, message) {
            // message is Buffer
            console.log(message.toString())
        })
    })
}