const User = require('../models/user');

exports.createLog = async (req,res) => {
    const { log , numEmpl } = req.body;
    try {
        const user = await User.findOne({ numEmpl });
        user.logs.push(log);
        await user.save();
        res.status(200).send('Depuración guardada con éxito');
    } catch(err) {
        res.status(500).send(err.message);
    }
}

exports.updateLog = async (req,res) => {
    const { log, id, numEmpl } = req.body;
    try {
        const user = await User.findOne({ numEmpl });
        let oldLog = await user.logs.id(id);
        console.log(oldLog);
        console.log(log);
        oldLog.set({...log});
        await user.save()
        res.status(200).send('Depuración editada con éxito');
    } catch(err) {
        res.status(500).send('Error editando la depuración');
    }
}

exports.deleteLog = async (req,res) => {
    const { id, numEmpl } = req.body;
    try {
        const user = await User.findOne({ numEmpl });
        user.logs.id(id).remove();
        await user.save()
        res.status(200).send('Depuración borrada con éxito');
    } catch(err) {
        console.log(err);
        res.status(500).send('Error borrando la depuración');
    }
}
