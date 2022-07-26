/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 23/Junio/2022
* @description Script para recuperar datos de los de productos de MariaDB.
*/

var dbVelaisa = require('../../conexiones/basesDeDatos').of('velaisa')
var f = require('../../funciones')

module.exports = {
    recuperaCatalogoVelas: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Productos recuperados",
            data: []
        }

        let query = `SELECT CODIGO_INTERNO, CATEGORIA, SUBCATEGORIA, NOMBRE,
                     DESC_CORTA, IMG
                     FROM VELAS`

        dbVelaisa.query(query, async(err, data) => {
            if(err) {
                console.log(err)
                response.replyCode = 500;
                response.replyText = 'Error en la solicitud de datos';
                response.data = undefined;
                res.status(500).send(response);
            } else {
                response.replyCode = 200;
                response.replyText = 'Productos recuperados con exito';
                response.data = [data];
                res.status(200).send(response);
            }
        })
    }, 

    recuperaDatosVelas: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Producto recuperado con exito",
            data: []
        }

        let noProducto = parseInt(req.params.codigoInterno)

        let query = `SELECT *
                    FROM VELAS
                    WHERE CODIGO_INTERNO = ${codigoInterno}`

        if(!f.definido(noProducto)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        }

        dbVelaisa.query(query, async(err, data) => {
            if(err) {
                console.log(err)
                response.replyCode = 500;
                response.replyText = 'Error en la solicitud de datos';
                response.data = undefined;
                res.status(500).send(response);
            } else {
                response.replyCode = 200;
                response.replyText = 'Producto recuperado con exito';
                response.data = [data];
                res.status(200).send(response);
            }
        })
    }
}