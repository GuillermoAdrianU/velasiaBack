/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 30/Junio/2022
* @description Script para enviar mensajes de contacto de WA.
*/

var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'guilleaua@gmail.com',
        pass: 'udjlnbbavqbaquwr'
    }
});

module.exports = {
    enviarCorreo: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Productos recuperados",
            data: []
        }

        let correo = req.body.correo
        
        var mailOptions = {
            from: 'guilleaua@gmail.com',
            to: correo,
            subject: 'Atención',
            text: `Correo de prueba`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
                response.replyCode = 500;
                response.replyText = 'El correo no pudo ser enviado';
                response.data = undefined;
                res.status(500).send(response);
            } else {
                response.replyCode = 200;
                response.replyText = 'Correo enviado con exito';
                response.data = [data];
                res.status(200).send(response);
            }
        });  
    } 
}