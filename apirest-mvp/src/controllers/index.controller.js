const { response } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'mvp_db',
    port: '5432'
});

const getPedidos = async (req, res) => {
    const response = await pool.query('SELECT * FROM tabla2');
    res.status(200).json(response.rows);
};

const getPedidoByObra = async (req, res) => {
    const values = req.params;
    console.log(values.fecha_inicio, values.obra_oc, values.fecha_fin);
    const response = await pool.query('SELECT * FROM tabla2 WHERE obra_oc = $1 AND fecha BETWEEN $2 AND $3', [values.obra_oc, values.fecha_inicio, values.fecha_fin]);
    res.json(response.rows)
};

const getSumaByObra = async (req, res) => {
    const values = req.params;
    console.log(values.fecha_inicio, values.obra_oc, values.fecha_fin);
    const response = await pool.query('SELECT SUM(tabla2.atraso) AS min_atraso, SUM(tabla2.adicionales) AS min_adicionales FROM tabla2 WHERE obra_oc = $1 AND fecha BETWEEN $2 AND $3', [values.obra_oc, values.fecha_inicio, values.fecha_fin]);
    res.json(response.rows)
};


module.exports = {
    getPedidos,
    getPedidoByObra,
    getSumaByObra
}