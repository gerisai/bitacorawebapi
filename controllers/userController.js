const User = require('../models/user');

exports.updateUser = async (req, res) => {
	const { id, name, password } = req.body
	try {
		const user = await User.findByIdAndUpdate(id,{ name, password });
		res.status(200).send('Done!');
	} catch(err) {
		console.log(err);
		res.status(500).send(err.message);
	}
}

exports.deleteUser = async (req,res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.numEmpl);

		if (!user) res.status(404).send('No user');
		res.status(200).send('Success!');
	} catch(err) {
		res.status(500).send(err.message);
	}
}