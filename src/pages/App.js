import '../assets/css/App.css';
import MUIDataTable from "mui-datatables";
//import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Grid, Modal } from '@material-ui/core';
import Navbar from  '../components/Navbar';
import {makeStyles} from '@material-ui/core/styles';
import Filters from '../components/Filters';


const baseUrl = 'http://localhost:4000/tabla2/'


const useStyles= makeStyles(()=>({
	container:{
		padding: '30px'
	}
}));

const columns = [
  { name: 'cliente', label:  'Rut Razón Social', type: 'numeric', options: { filter: false, sort: false }},
  { name: 'razon_social', label:  'Razón Social', options: { filter: true, sort: false }},
  { name: 'guia_despacho', label:  'Guía Despacho', options: { filter: false, sort: true }},
  { name: 'obra_oc', label:  'Obra', options: { filter: true, sort: true }},
  { name: 'fecha', label:  'Fecha', type: 'date', options: { filter: false, sort: true }},
  { name: 'pedido', label:  'Pedido', type:'numeric' , options: { filter: false, sort: true }},
  { name: 'mes', label:  'Mes', type:'numeric' , options: { filter: true, sort: true, filterType: 'multiselect' }},
  { name: 'producto', label:  'Producto', options: { filter: false, sort: false }},
  { name: 'm3', label:  'Volumen', type: 'numeric', options: { filter: false, sort: true }},
  { name: 'hora_solicitada_cliente_original', label:  'Hora Solicitada', options: { filter: false, sort: true }},
  { name: 'hora_llegada_a_obra', label:  'Llegada Obra', options: { filter: false, sort: true }},
  { name: 'puntualidad', label:  '¿Puntual?', options: { filter: true, sort: false, filterType: 'checkbox' }},
  { name: 'atraso', label:  'Atraso', type:'time' , options: { filter: false, sort: true }},
  { name: 'estimada', label:  'Estadía Asignada', options: { filter: false, sort: false }},
  { name: 'hora_vuelta_a_planta', label:  'Salida Obra', options: { filter: false, sort: false }},
  { name: 'real', label:  'Estadía Real', options: { filter: false, sort: false }},
  { name: 'adicionales', label:  'Minutos Adicionales', options: { filter: false, sort: false }},
  { name: 'diferencia_minutos', label:  'Minutos Diferencia' , options: { filter: false, sort: true }},
  { name: 'tramos', label:  'Tramos SE', type: 'numeric', options: { filter: false, sort: false }},
  { name: 'monto', label:  'Monto (UF)' , type: 'numeric', options: { filter: false, sort: false }}
 ];
 
 const options = {
  rowsPerPage: 10,
  filterType: 'textField',
  download: 'false',
  print: 'false',
  search: 'false',
  fixedColumns: 2
 };


function App() {

  const classes= useStyles();

  const [data, setData] = useState([]);

  // const peticionGet = async () => {
  //   await axios.get(baseUrl)
  //   .then(response => {
  //     setData(response.data);
  //   })
  // }

  useEffect (() => {
    async function fetchData() {
      const pedidosFetch = await fetch(
        baseUrl,
        { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          redirect: "follow",
        }
      );
  
      const data = await pedidosFetch.json();
      setData(data);
      //console.log(data);
    }
    window.scrollTo(0, 0);
    fetchData();
  }, [])


  return (
    <div className="App">
      <Grid container spacing = {3}>
        <Grid item xs = {12}>
          <Navbar />
        </Grid>
        <Grid item xs = {12}>
          <Filters />
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