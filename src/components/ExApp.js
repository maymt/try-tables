import '../assets/css/App.css';
import MUIDataTable from "mui-datatables";
import React, { useState, useEffect,TextField, Button } from 'react';
import { Grid, Card, CardContent} from '@material-ui/core';
import Navbar from  './Navbar';
import {makeStyles} from '@material-ui/core/styles';
import FilterList from '@material-ui/icons/FilterList';
import axios from 'axios';
import Filters from '../components/Filters';

const baseUrl = 'http://localhost:4000/tabla2'


const useStyles= makeStyles(()=>({
  root: {
    textAlign: 'center',
    background: 'white',
    paddingBottom: '20px'
  },
  container: {
    padding: '30px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
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
  const [obraSeleccionado, setObraSeleccionado]=useState({ //Datos que se ponen en los inputs
    fecha_inicio: "",
    obra_oc: ""
  })

  console.log(obraSeleccionado.fecha_inicio, obraSeleccionado.obra_oc)

  const handleChange=e=>{
    const {name, value}=e.target;
    setObraSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
    console.log(obraSeleccionado)
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    // +"/"+obraSeleccionado.fecha_inicio+"/"+obraSeleccionado.obra_oc, obraSeleccionado
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    peticionGet();
  }, [])

  // useEffect (() => {
  //   async function fetchData() {
  //     const pedidosFetch = await fetch(
  //       baseUrl,
  //       { 
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //         redirect: "follow",
  //       }
  //     );
  
  //     const data = await pedidosFetch.json();
  //     setData(data);
  //     //console.log(data);
  //   }
  //   window.scrollTo(0, 0);
  //   fetchData();
  // }, [])

  return (
    <div className="App">
      <Grid container spacing = {3}>
        <Grid item xs = {12}>
          <Navbar />
        </Grid>

        <Grid item xs = {12} className = {classes.container}>
          <Card className={classes.root}>
            <CardContent className = {classes.root}>
              <h3>Resumen</h3>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs = {12} className = {classes.container}>
          <Card className={classes.root}>
            <CardContent className = {classes.root}>
              <Filters/>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
}

export default App;