const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());

// Conectar a la base de datos MySQL
const sequelize = new Sequelize('proyecto', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql', //Creo que es la version de la base de datos
  port: 3000 // Puerto de la base de datos
});

// Definir el modelo para la Agencia
const Agencia = sequelize.define('Agencia', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'agencias', // Nombre de la tabla en la base de datos
  timestamps: false
});

app.post('/api/enviar-correo', async (req, res) => {
  const { hoteles, restaurantes, culturales, agencia } = req.body;

  try {
    // Buscar la agencia en la base de datos
    const agenciaData = await Agencia.findOne({ where: { nombre: agencia } });

    if (!agenciaData) {
      return res.status(400).send('Agencia no válida');
    }

    const email = agenciaData.correo;

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Puedes usar otros servicios
      auth: {
        user: 'explora.dolores.hidalgo@gmail.com', // correo desde el cual se enviaran los correos
        pass: 'Expl0r@Dolor3sH!dalgo#' // contraseña del correo
      }
    });

    const mailOptions = {
      from: 'explora.dolores.hidalgo@gmail.com', // email que aparecera como remitente
      to: email,
      subject: 'Paquete Turístico Personalizado Para Dolores Hidalgo C.I.N.',
      text: `Hoteles seleccionados: ${hoteles.map(h => h.nombre).join(', ')}\nRestaurantes seleccionados: ${restaurantes.map(r => r.nombre).join(', ')}\nAtractivos Culturales seleccionados: ${culturales.map(c => c.nombre).join(', ')}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Correo enviado exitosamente');
    });
  } catch (error) {
    res.status(500).send('Error al obtener la agencia de la base de datos');
  }
});

app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001');
});
