const mqtt = require('mqtt');

//connection variables
let broker_host = '64f045e5514042d9a76cb326c1ab0c7f.s1.eu.hivemq.cloud';
let broker_port = '8883';
let client_id = 'web-client-123';


//connection options
const connection_options = {
    port: broker_port,
    host: broker_host,
    clientId: client_id,
    protocol: 'mqtts',
    username: 'Meezi',
    password:"78782525",
    reconnectPeriod: 5000 // Try reconnecting in 5 seconds if connection is lost
};

const client = mqtt.connect(connection_options);

module.exports = client;