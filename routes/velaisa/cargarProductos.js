/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 23/Junio/2022
* @description Script para carga de productos de MariaDB.
*/

var dbVelaisa = require('../../conexiones/basesDeDatos').of('velaisa')
var f = require('../../funciones')
var fs = require('fs');
const funciones = require('../../funciones');

function createImageBinary(img, noProducto, indice) {
    return new Promise((resolve) => {
        let imgData = fs.createWriteStream(noProducto.toString() + "_" + indice.toString()).write(img);
        resolve(imgData)
    })
}

function saveImg(noProducto, indice, img) {
    return new Promise((resolve) => {
        fs.writeFile('C:/Users/guill/Desktop/imagenes/'+`${noProducto}_${indice}.png`, img, 'base64', async function(err) { 
            if(err) {
                console.log(err)
                resolve(err)
            } else {
                resolve('C:/Users/guill/Desktop/imagenes/'+`${noProducto}_${indice}.png`)
            }
        })
    })
}

function boolean(valor) {
    if (valor === 1) {
        return true
    } else {
        return false
    }
}

module.exports = {
    cargaProducto: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Producto cargado con exito",
            data: []
        }

        let noProducto = req.body.noProducto
        let nombreProducto = req.body.nombreProducto
        let descCorta = req.body.descCorta
        let descLarga = req.body.descLarga
        let categoria = req.body.categoria
        let img = await createImageBinary(req.files.img.data, noProducto, 1)
        let img_2 = f.definido(req.files.img_2) === true ? await createImageBinary(req.files.img_2.data, noProducto, 2) : null
        let img_3 = f.definido(req.files.img_3) === true ? await createImageBinary(req.files.img_3.data, noProducto, 3) : null
        let img_4 = f.definido(req.files.img_4) === true ? await createImageBinary(req.files.img_4.data, noProducto, 4) : null
        let img_ruta = f.definido(req.files.img) === true ? await saveImg(noProducto, 1, req.files.img.data) : null
        let img_2_ruta = f.definido(req.files.img_2) === true ? await saveImg(noProducto, 2, req.files.img_2.data) : null
        let img_3_ruta = f.definido(req.files.img_3) === true ? await saveImg(noProducto, 3, req.files.img_3.data) : null
        let img_4_ruta = f.definido(req.files.img_4) === true ? await saveImg(noProducto, 4, req.files.img_4.data) : null
        let chico = boolean(parseInt(req.body.chico))
        let mediano = boolean(parseInt(req.body.mediano))
        let grande = boolean(parseInt(req.body.grande))
        let precioChico =  f.definido(req.body.precioChico) === true ? parseInt(req.body.precioChico) : null
        let precioMediano =f.definido(req.body.precioMediano) === true ? parseInt(req.body.precioMediano) : null
        let precioGrande = f.definido(req.body.precioGrande) === true ? parseInt(req.body.precioGrande) : null
        let gramageChico = f.definido(req.body.gramageChico) === true ? parseInt(req.body.gramageChico) : null
        let gramageMediano= f.definido(req.body.gramageMediano) === true ? parseInt(req.body.gramageMediano) : null
        let gramageGrande = f.definido(req.body.gramageGrande) === true ? parseInt(req.body.gramageGrande) : null
        let hrs_chico = f.definido(req.body.hrs_chico) === true ? parseInt(req.body.hrs_chico) : null
        let hrs_mediano = f.definido(req.body.hrs_mediano) === true ? parseInt(req.body.hrs_mediano) : null
        let hrs_grande = f.definido(req.body.hrs_grande) ===  true ? parseInt(req.body.hrs_grande) : null
        let sizeChico = f.definido(req.body.sizeChico) ===  true ? req.body.sizeChico : null
        let sizeMediano = f.definido(req.body.sizeMediano) === true ? req.body.sizeMediano : null
        let sizeGrande = f.definido(req.body.sizeGrande) === true ? req.body.sizeGrande : null

        let query = `INSERT INTO PRODUCTOS (NO_PRODUCTO, NOMBRE_PRODUCTO, DESC_CORTA, DESC_LARGA, CATEGORIA, 
                    IMG, IMG_BINARY, IMG_2, IMG_BINARY_2, IMG_3, IMG_BINARY_3, IMG_4, IMG_BINARY_4, CHICO, MEDIANO, 
                    GRANDE, PRECIO_CHICO, PRECIO_MEDIANO, PRECIO_GRANDE, GRAMAGE_CHICO, GRAMAGE_MEDIANO, GRAMAGE_GRANDE,
                    HRS_CHICO, HRS_MEDIANO, HRS_GRANDE, 
                    SIZE_CHICO, SIZE_MEDIANO, SIZE_GRANDE) 
                    VALUES ?`

        if(!f.definido(noProducto) || !f.definido(nombreProducto) || !f.definido(descCorta) || !f.definido(descLarga) || !f.definido(categoria) || !f.definido(img)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let insertar = []
            insertar.push([
                noProducto,
                nombreProducto,
                descCorta,
                descLarga,
                categoria,
                img_ruta,
                img,
                img_2_ruta,
                img_2,
                img_3_ruta,
                img_3,
                img_4_ruta,
                img_4,
                chico,
                mediano,
                grande,
                precioChico,
                precioMediano,
                precioGrande,
                gramageChico,
                gramageMediano,
                gramageGrande,
                hrs_chico,
                hrs_mediano,
                hrs_grande,
                sizeChico,
                sizeMediano,
                sizeGrande
            ])
            dbVelaisa.query(query, [insertar], async (err, data) => {
                if(err) {
                    console.log(err)
                    response.replyCode = 500;
                    response.replyText = 'Error en la consulta';
                    response.data = undefined;
                    res.status(500).send(response);
                } else {
                    response.replyCode = 200;
                    response.replyText = 'Producto cargado con exito';
                    response.data = [];
                    res.status(200).send(response);
                } 
            })
        }
    }
}