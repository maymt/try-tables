import './App.css';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Navbar from  './Navbar';
import {makeStyles} from '@material-ui/core/styles';

const baseUrl = 'postgres://mpdlwiymksjbbo:026c558a53f723dd0c07a2e4c2265c33f0574b9f66b0d53256e18cdcdb729c33@ec2-52-206-15-227.compute-1.amazonaws.com:5432/daokhr6d468c47'


const useStyles= makeStyles(()=>({
	container:{
		marginTop: '30px'
	}
}));

const columns = [
  // { name: "name", label: "Name", options: { filter: true, sort: true } },
  // { name: "company", label: "Company", options: { filter: true, sort: false } },
  // { name: "city", label: "City", options: { filter: true, sort: false } },
  // { name: "state", label: "State", options: { filter: true, sort: false } },

  //{ name: 'segmento', label: 'Segmento', type: 'numeric' , sortable: true, },
  { name: 'cliente', label:  'Rut Razón Social', type: 'numeric', options: { filter: false, sort: false }},
  { name: 'razon_social', label:  'Razón Social', options: { filter: true, sort: false }},
  { name: 'guia_despacho', label:  'Guía Despacho', options: { filter: false, sort: true }},
  { name: 'obra_oc', label:  'Obra', options: { filter: true, sort: true }},
  { name: 'fecha', label:  'Fecha', type: 'date', options: { filter: false, sort: true }},
  { name: 'pedido', label:  'Pedido', type:'numeric' , options: { filter: false, sort: true }},
  { name: 'mes', label:  'Mes', type:'numeric' , options: { filter: true, sort: true, filterType: 'multiselect' }},
  // { name: 'tren_pedido', label:  'tren_pedido', type: 'numeric', sortable: true, },
  // { name: 'posicion_en_tren', label:  'posicion_en_tren', type: 'numeric', sortable: true, },
  // { name: 'producto_codigo', label:  'producto_codigo', type: 'numeric', sortable: true, },
  { name: 'producto', label:  'Producto', options: { filter: false, sort: false }},
  { name: 'm3', label:  'Volumen', type: 'numeric', options: { filter: false, sort: true }},
  // { name: 'planta', label:  'planta', type: 'numeric', sortable: true, },
  // { name: 'hora_solicitada_cliente_primer_despacho_de_tren', label:  'hora_solicitada_cliente_primer_despacho_de_tren', sortable: true, },
  // { name: 'espaciamiento', label:  'espaciamiento', type: 'numeric', sortable: true, },
  { name: 'hora_solicitada_cliente_original', label:  'Hora Solicitada', options: { filter: false, sort: true }},
  // { name: 'hora_solicitada_cliente_corregida', label:  'hora_solicitada_cliente_corregida', sortable: true, },
  // { name: 'tiempo_ida_vuelta_proyectado', label:  'tiempo_ida_vuelta_proyectado', type: 'numeric', sortable: true, },
  // { name: 'tiempo_viaje_vuelta_proyectado', label:  'tiempo_viaje_vuelta_proyectado', type: 'numeric', sortable: true, },
  // { name: 'hora_tiquete', label:  'hora_tiquete', sortable: true, },
  // { name: 'hora_de_carga', label:  'hora_de_carga', sortable: true, },
  // { name: 'hora_fin_de_carga', label:  'hora_fin_de_carga', sortable: true, },
  // { name: 'hora_salida_de_planta', label:  'hora_salida_de_planta', sortable: true, },
  { name: 'hora_llegada_a_obra', label:  'Llegada Obra', options: { filter: false, sort: true }},
  { name: 'puntualidad', label:  '¿Puntual?', options: { filter: true, sort: false, filterType: 'checkbox' }},
  { name: 'atraso', label:  'Atraso', type:'time' , options: { filter: false, sort: true }},
  { name: 'estimada', label:  'Estadía Asignada', options: { filter: false, sort: false }},
  // { name: 'hora_inicio_descarga', label:  'hora_inicio_descarga', sortable: true, },
  { name: 'hora_vuelta_a_planta', label:  'Salida Obra', options: { filter: false, sort: false }},
  { name: 'real', label:  'Estadía Real', options: { filter: false, sort: false }},
  { name: 'adicionales', label:  'Minutos Adicionales', options: { filter: false, sort: false }},
  { name: 'diferencia_minutos', label:  'Minutos Diferencia' , options: { filter: false, sort: true }},
  // { name: 'hora_llegada_a_planta', label:  'hora_llegada_a_planta', sortable: true, },
  { name: 'tramos', label:  'Tramos SE', type: 'numeric', options: { filter: false, sort: false }},
  { name: 'monto', label:  'Monto (UF)' , type: 'numeric', options: { filter: false, sort: false }}
 ];
 
//  const data = [
//   { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
//   { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
//   { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
//   { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
//  ];
 
 const options = {
  rowsPerPage: 10,
  filterType: 'textField',
  download: 'false',
  print: 'false',
  search: 'false',
 };

function App() {
  const classes= useStyles();

  const [data, setData] = useState([]);

  const peticionGet = async () => {
    await axios.get(connectionString)
    .then(response => {
      setData(response.data);
      console.log(response.data);
    })
  }

  useEffect (() => {
    peticionGet();
  }, [])

  return (
    <div className="App">
      <Grid container spacing = {3}>
        <Grid item xs = {12}>
          <Navbar />
        </Grid>
        <Grid item xs = {12} className = {classes.container}>
          <MUIDataTable
            title={"Pedidos"}
            data={data}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;