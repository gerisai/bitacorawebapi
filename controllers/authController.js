const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

//create token for authenticated user 
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createUserToken = async (user, code, req, res) => {
    const token = signToken(user._id);

    //set expiry to 1 minute 
    let d = new Date();
    d.setDate(d.getHours() + 24);

    //configure cookie in response
    res.cookie('jwt', token, {
        expires: d, 
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    //remove user password from output
    user.password = undefined; 
    res.status(code).send({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

//create new user
exports.registerUser = async (req, res, next) => {
    //pass in request data here to create user from user schema 
    try {
        const newUser = await User.create({
            name: req.body.name,
            numEmpl: req.body.numEmpl,
            password: req.body.password
        });
        createUserToken(newUser, 201, req, res);
    //if user can't be created, throw an error 
    } catch(err) {
        if (err.code === 11000) err.message = `¡Un usuario con el número de empleado ${req.body.numEmpl} ya existe!`;
        res.status(500).send(err.message);
    }
};

//log user in
exports.loginUser = async (req, res, next) => {
    const { numEmpl, password } = req.body;

    //check if email & password exist 
    if (!numEmpl || !password) {
        return res.status(404).send('Ingresa un usuario y contraseña');
    }

    //check if user & password are correct  
    const user = await User.findOne({ numEmpl }).select('password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).send('Usuario/Contraseña incorrectos');
    }

    createUserToken(user, 200, req, res);
}

//check if user is logged in 
exports.checkUser = async (req, res, next) => {
    let currentUser;
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
            currentUser = await User.findById(decoded.id);
        } catch(err) {
            return res.status(500).send(err.message);
        }
    } else {
        currentUser =  null;
    }    

    res.status(200).send({ currentUser });
};

//log user out 
exports.logoutUser = async (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true
    });
    res.status(200).send('user is logged out');
};