const express = require('express');
const cors = require('cors');
const connect = require('./utils/connect');
const routes = require('./routes/routes');
const LightModle = require('./model/lightModel');
const client = require('./utils/mqtt');

//mqtt variables start

//publish variables
let pub_topic = 'general';

//subscribe variables
let sub_topic = 'general';

//mqtt variables end



const app = express();
app.use(express.json());
app.use(cors());

//websocket 
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});





//start websocket.io Http server
server.listen(3008, async () => {
    console.log("Server is runningnow");
    //mongoDb
    connect();
    //routes
    routes(app);
});

//Mqtt connection Message
client.on("connect", async () => {
    console.log("MQTT is connected");
    client.subscribe(sub_topic);
});


//incoming message to MQTT PUBLISH
sendToDevice = async (topic, message) => {
    console.log('\n[MQTT Sending] data to Device message:', message)

    let data = JSON.stringify(message);
    // data = JSON.parse(data);
     client.publish(topic, data);
}


//socket.io incoming message to MQTT
io.on('connection',async client => {
    console.log("Client Connected");  

    client.on('client_light', async (data) => {
       
       console.log('[WS Received] Data:', data);
        // Send command to device
        await sendToDevice(pub_topic, data);
    }) 
});



//Save Message to MongoDB for latest Situation
const saveData = async (data) => {
    data = await LightModle.create(data);

    console.log("save Data", data);

    await sendData('client_light', JSON.stringify(data));
}

//Mqtt get Message
client.on("message", async (topic, message) => {
    console.log("MQTT recevied topci:", topic.toString(), "Message:", message.toString());

    let data = message.toString();
    data = JSON.parse(data);

    await saveData(data)
});


//send Message to Web Client
setInterval(() => {
    sendData('time', new Date().toTimeString());
},1000)

const sendData = async (topic,msg)=>{
    io.emit(topic,msg);
}

