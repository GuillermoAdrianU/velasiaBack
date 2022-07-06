/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 23/Junio/2022
* @description Script para recuperar datos de los de productos de MariaDB.
*/

var dbVelaisa = require('../../conexiones/basesDeDatos').of('velaisa')
var f = require('../../funciones')

module.exports = {
    recuperaCatalogoProductos: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Productos recuperados",
            data: []
        }

        let categoria = parseInt(req.params.categoria)

        let query = `SELECT NO_PRODUCTO, NOMBRE_PRODUCTO, DESC_CORTA, IMG, IMG_BINARY, 
                     CHICO, MEDIANO, GRANDE, PRECIO_CHICO, PRECIO_MEDIANO, 
                     PRECIO_GRANDE, GRAMAGE_CHICO, GRAMAGE_MEDIANO, GRAMAGE_GRANDE,
                     HRS_CHICO, HRS_MEDIANO, HRS_GRANDE, SIZE_CHICO, SIZE_MEDIANO,
                     SIZE_GRANDE
                     FROM PRODUCTOS
                     WHERE CATEGORIA = ${categoria}`

        if(!f.definido(categoria)) {
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
                response.replyText = 'Productos recuperados con exito';
                response.data = [data];
                res.status(200).send(response);
            }
        })
    }, 

    recuperaDatosProducto: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Producto recuperado con exito",
            data: []
        }

        let noProducto = parseInt(req.params.noProducto)

        let query = `SELECT *
                    FROM PRODUCTOS
                    WHERE NO_PRODUCTO = ${noProducto}`

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