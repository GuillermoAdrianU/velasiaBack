var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload')
router.use(fileUpload({
    limits: {
      fileSize: 1024*1024*50
    },
    abortOnLimit: true
}));

const { cargaProducto } = require('./cargarProductos')
const { recuperaCatalogoProductos, recuperaDatosProducto } = require('./recuperaDatosProductos')
const { recuperaCategorias } = require('./recuperaCategorias');
const { enviarCorreo } = require('./enviarCorreo');

router.get('/recuperaDatosProducto/:noProducto', recuperaDatosProducto)
router.get('/recuperaCatalogoProductos/:categoria', recuperaCatalogoProductos)
router.get('/recuperaCategorias', recuperaCategorias)

router.post('/enviarCorreo', enviarCorreo)
router.post('/cargaProducto', cargaProducto)

module.exports = router;