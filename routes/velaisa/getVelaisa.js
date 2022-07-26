module.exports = {
    getVelaisa: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Producto cargado con exito",
            data: []
        }

        response.replyCode = 200;
        response.replyText = 'It work´s';
        response.data = undefined;
        res.status(200).send(response); 
    }
}
