const { Router } = require('express');
const router = Router();

const { getPedidos, getPedidoByObra, getSumaByObra} = require('../controllers/index.controller')

router.get('/tabla2', getPedidos);
router.get('/tabla2/:fecha_inicio/:fecha_fin/:obra_oc', getPedidoByObra);
router.get('/tabla2/:fecha_inicio/:fecha_fin/:obra_oc/9', getSumaByObra);

module.exports = router;