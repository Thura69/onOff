const LightModle = require('../model/lightModel');

function routes(app) {

    //healthCheck
    app.get('/healthcheck', (req, res) => {
        res.status(200).send("ok");
    });


// HTTP GET last events of all devices
app.get('/events', async (req, res) => {
    console.log('GET Request for Events');

    let events = [];


    let eventLight = await LightModle.findOne({ type: 'light' }).sort({ createdAt: -1 });
    if (eventLight) {
        events.push(eventLight);
    }

    console.log('events:', events)

    return res.status(200).json(events);
})


};

module.exports = routes;