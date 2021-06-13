const userModel = require('../models/user');

exports.createUser = async (req,res) => {
	const user = new userModel(req.body);
    try {
        await user.save();
        res.status(200).send('Usuario creado con éxito');
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.readUser = async (req,res) => {
	const user = userModel.find({ numEmpl: req.params.numEmpl });
    if (!user) return res.status(404).send('No existe el usuario');
	
	try {
        res.status(200).send(user);
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.updateUser = async (req, res) => {
	try {
		const user = await userModel.findByIdAndUpdate(req.params.numEmpl, req.body);
		await userModel.save();
		response.status(200).send(user);
	} catch(err) {
		res.status(500).send(err);
	}
}

exports.deleteUser = async (req,res) => {
	try {
		const user = await userModel.findByIdAndDelete(req.params.numEmpl);

		if (!user) res.status(404).send('No user');
		res.status(200).send('Success!');
	} catch(err) {
		res.status(500).send(err);
	}
}