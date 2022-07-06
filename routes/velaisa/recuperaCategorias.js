/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 27/Junio/2022
* @description Script para recuperar datos de los de productos de MariaDB.
*/

var dbVelaisa = require('../../conexiones/basesDeDatos').of('velaisa')
var f = require('../../funciones')

module.exports = {
    recuperaCategorias: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Productos recuperados",
            data: []
        }

        let query = `SELECT * 
                     FROM CATEGORIAS`

        dbVelaisa.query(query, async(err, data) => {
            if(err) {
                console.log(err)
                response.replyCode = 500;
                response.replyText = 'Error en la solicitud de datos';
                response.data = undefined;
                res.status(500).send(response);
            } else {
                response.replyCode = 200;
                response.replyText = 'Categorias recuperadas con exito';
                response.data = [data];
                res.status(200).send(response);
            }
        })
    }, 

}