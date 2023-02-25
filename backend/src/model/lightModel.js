const { Schema, default: mongoose } = require('mongoose');

const LightSchema = new Schema({
    serialnumber: { type: String, required: true, uniqued: true },
    type: { type: String, required: true, uniqued: true },
    condition: { type: String, required: true, uniqued: true },
    
}, {
    timestamps:true
});

const LightModle = mongoose.model("light",LightSchema);

module.exports = LightModle;