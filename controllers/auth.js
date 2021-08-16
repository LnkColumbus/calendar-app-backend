const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            });
        }

        user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        // TODO: Generar JWT
        const token = await generateJWT( user.id, user.name );
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error, hablar con el admin'
        });
    }


}

const userLogin = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                ok: false,
                msg: 'No existe ningún usuario con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password );
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generateJWT( user.id, user.name );
        
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error, hablar con el administrador'
        });
    }

}

const renewToken = async(req, res = response) => {

    const { uid, name } = req;

    try {
        // Generar nuevo token
        const token = await generateJWT( uid, name );
    
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error, hablar con el administrador'
        });
    }

}

module.exports = {
    createUser,
    userLogin,
    renewToken,
}