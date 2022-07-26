/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 23/Junio/2022
* @description Script para carga de productos de MariaDB.
*/

var dbVelaisa = require('../../conexiones/basesDeDatos').of('velaisa')
var f = require('../../funciones')
var fs = require('fs');
const funciones = require('../../funciones');

function saveImg(noProducto, indice, img) {
    return new Promise((resolve) => {
        fs.writeFile('C:/Users/guill/Desktop/imagenes/'+`${noProducto}_${indice}.png`, img, 'base64', async function(err) { 
            if(err) {
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

        let codigoInterno = req.body.codigoInterno
        let nombre = req.body.nombre
        let descCorta = req.body.descCorta
        let descLarga = req.body.descLarga
        let categoria = parseInt(req.body.categoria)
        let subcategoria = parseInt(req.body.subcategoria)
        let piedra = req.body.piedra
        let descEnvaseMaterial = req.body.descEnvaseMaterial
        let recomendaciones = req.body.recomendaciones
        let img_ruta = f.definido(req.files.img) === true ? await saveImg(codigoInterno, 1, req.files.img.data) : null
        let img_2_ruta = f.definido(req.files.img_2) === true ? await saveImg(codigoInterno, 2, req.files.img_2.data) : null
        let img_3_ruta = f.definido(req.files.img_3) === true ? await saveImg(codigoInterno, 3, req.files.img_3.data) : null
        let img_4_ruta = f.definido(req.files.img_4) === true ? await saveImg(codigoInterno, 4, req.files.img_4.data) : null
        let chico = boolean(parseInt(req.body.chico))
        let mediano = boolean(parseInt(req.body.mediano))
        let grande = boolean(parseInt(req.body.grande))
        let precioChico =  f.definido(req.body.precioChico) === true ? parseInt(req.body.precioChico) : null
        let precioMediano =f.definido(req.body.precioMediano) === true ? parseInt(req.body.precioMediano) : null
        let precioGrande = f.definido(req.body.precioGrande) === true ? parseInt(req.body.precioGrande) : null
        let gramageChico = f.definido(req.body.gramageChico) === true ? parseInt(req.body.gramageChico) : null
        let gramageMediano= f.definido(req.body.gramageMediano) === true ? parseInt(req.body.gramageMediano) : null
        let gramageGrande = f.definido(req.body.gramageGrande) === true ? parseInt(req.body.gramageGrande) : null
        let gramageCeraChico = f.definido(req.body.gramageCeraChico) === true ? parseInt(req.body.gramageCeraChico) : null
        let gramageCeraMediano= f.definido(req.body.gramageCeraMediano) === true ? parseInt(req.body.gramageCeraMediano) : null
        let gramageCeraGrande = f.definido(req.body.gramageCeraGrande) === true ? parseInt(req.body.gramageCeraGrande) : null
        let hrs_chico = f.definido(req.body.hrs_chico) === true ? parseInt(req.body.hrs_chico) : null
        let hrs_mediano = f.definido(req.body.hrs_mediano) === true ? parseInt(req.body.hrs_mediano) : null
        let hrs_grande = f.definido(req.body.hrs_grande) ===  true ? parseInt(req.body.hrs_grande) : null
        let alturaChico = f.definido(req.body.alturaChico) ===  true ? req.body.alturaChico : null
        let alturaMediano = f.definido(req.body.alturaMediano) === true ? req.body.alturaMediano : null
        let alturaGrande = f.definido(req.body.alturaGrande) === true ? req.body.alturaGrande : null
        let diametroChico = f.definido(req.body.diametroChico) === true ? req.body.diametroChico : null
        let diametroMediano = f.definido(req.body.diametroMediano) === true ? req.body.diametroMediano : null
        let diametroGrande = f.definido(req.body.diametroGrande) === true ? req.body.diametroGrande : null

        let query = `INSERT INTO VELAS (CODIGO_INTERNO, CATEGORIA, SUBCATEGORIA, NOMBRE, DESC_CORTA, DESC_LARGA, PIEDRA, 
                    DESC_ENVASE_MATERIAL, RECOMENDACIONES, IMG, IMG_2, IMG_3, IMG_4, 
                    CHICO, MEDIANO, GRANDE, PRECIO_CHICO, PRECIO_MEDIANO, PRECIO_GRANDE, GRAMAGE_CHICO, 
                    GRAMAGE_MEDIANO, GRAMAGE_GRANDE, GRAMAGE_CERA_CHICO, GRAMAGE_CERA_MEDIANO, GRAMAGE_CERA_GRANDE, 
                    HRS_CHICO, HRS_MEDIANO, HRS_GRANDE, ALTURA_CHICO, ALTURA_MEDIANO, ALTURA_GRANDE, DIAMETRO_CHICO, 
                    DIAMETRO_MEDIANO, DIAMETRO_GRANDE) 
                    VALUES ?`

        if(!f.definido(codigoInterno) || !f.definido(nombre) || !f.definido(descCorta) || !f.definido(descLarga) || !f.definido(categoria) || !f.definido(subcategoria)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let insertar = []
            insertar.push([
                codigoInterno,
                categoria,
                subcategoria ,
                nombre,
                descCorta ,
                descLarga ,
                piedra ,
                descEnvaseMaterial,
                recomendaciones ,
                img_ruta ,
                img_2_ruta ,
                img_3_ruta ,
                img_4_ruta ,
                chico ,
                mediano,
                grande ,
                precioChico,
                precioMediano ,
                precioGrande ,
                gramageChico ,
                gramageMediano ,
                gramageGrande ,
                gramageCeraChico,
                gramageCeraMediano,
                gramageCeraGrande,
                hrs_chico ,
                hrs_mediano ,
                hrs_grande,
                alturaChico,
                alturaMediano  ,
                alturaGrande ,
                diametroChico  ,
                diametroMediano,
                diametroGrande 
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