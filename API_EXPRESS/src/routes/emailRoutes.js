// Instala nodemailer en tu proyecto
// npm install nodemailer

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Configuración del transporte de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otro servicio como Outlook o SMTP
  auth: {
    user: 'monsecastanon023@gmail.com',
    pass: 'mon140104' // Usa variables de entorno para mayor seguridad
  }
});

// Ruta para enviar el correo
app.post('/send-email', (req, res) => {
  const { email, subject, text } = req.body;
  
  const mailOptions = {
    from: 'monsecastanon043@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado con éxito');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor funcionando en el puerto 3000');
});
