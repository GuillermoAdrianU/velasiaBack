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
const { recuperaCatalogoVelas, recuperaDatosVelas } = require('./recuperaDatosProductos')
const { recuperaCategorias } = require('./recuperaCategorias');
const { enviarCorreo } = require('./enviarCorreo');
const { pagos } = require('./pagos');
const { getVelaisa } = require('./getVelaisa');

router.get('/', getVelaisa),
router.get('/recuperaDatosVelas/:codigoInterno', recuperaDatosVelas)
router.get('/recuperaCatalogoVelas', recuperaCatalogoVelas)
router.get('/recuperaCategorias', recuperaCategorias)

router.post('/enviarCorreo', enviarCorreo)
router.post('/cargaProducto', cargaProducto)
router.post('/pago', pagos)

module.exports = router;