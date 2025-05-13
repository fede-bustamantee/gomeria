const MDB_USUARIOS = require("../database/schemas/admin-user");
const { hash, compareSync } = require("bcryptjs");

const registrarUsuario = async (req, res) => {
    const { body } = req;
    const { email, password, nombre, apellido } = body;

    // Validar el correo electrónico y la contraseña
    if (
        !email ||
        !email.includes("@") ||
        !email.includes(".com") ||
        !password ||
        password.trim().length < 8
    ) {
        return res.status(400).send({ error: "Correo o contraseña incorrectas" });
    }

    const alreadyExists = await MDB_USUARIOS.findOne({ email: email });

    if (alreadyExists) {
        return res.status(422).send({ message: "El usuario ingresado ya existe" });
    }

    const hashPassword = await hash(password, 12);

    const newUser = {
        email,
        password: hashPassword,
        nombre,
        apellido,
        fechaActivo: new Date(),
        activo: true,
    };

    const response = await MDB_USUARIOS.create(newUser);
    res.status(200).send(response);
};

const loginUsuario = async (req, res) => {
    const { body } = req;
    const { email, password } = body;

    const user = await MDB_USUARIOS.findOne({ email: email });

    if (!user) {
        return res.status(404).send({ error: "Usuario no encontrado" });
    }

    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) {
        return res.status(401).send({ error: "Contraseña incorrecta" });
    }

    res.status(200).send({ ...user._doc });
};

module.exports = { registrarUsuario, loginUsuario };
