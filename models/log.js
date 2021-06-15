const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
    date: Date,
    service: {
        type: String,
        enum: ['','OS','ID','OT','CU','Soporte']
    },
    id: String,
    type: {
        type: String,
        enum: ['','Organica','Masiva','ZTE', 'NA']
    },
    numEmpl: String,
    idc: String,
    provider: String,
    district: String,
    address: String,
    coordinates: String,
    cluster: String,
    olt: String,
    splitters: [{
        f: Number,
        s: Number,
        p: Number,
        bw: Number,
        clients: Number,
        portNumber: Number,
        alarms: [{
            alarm: String,
            status: {
                type: String,
                enum: ['','Alarmada', 'Apagada']
            }
        }],
        ports: [{
            port: String,
            status: {
                type: String,
                enum: ['','Libre','Ocupado','Depurado','Asegurado','Fusionado', 'Empalmado', 'SinPigtail','Danado','Atenuado']
            }
        }]
    }],
    comment: String
});

const Log = mongoose.model("Log", LogSchema);

module.exports = {
    Log,
    LogSchema
};