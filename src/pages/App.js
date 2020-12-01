import React, { useState, useEffect } from 'react';
import { CardContent, Grid , Card, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {FilterList, Receipt, Close} from '@material-ui/icons';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import Navbar from  '../components/Navbar';


const baseUrl="http://localhost:4000/tabla2";

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
  { name: 'atraso', label:  'Minutos Impuntualidad', type:'time' , options: { filter: false, sort: true }},
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

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    background: 'white',
    paddingBottom: '20px',
    alignContent: 'center'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 200,
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [sumas, setSumas] = useState([]);
  const [rows, setRows] = useState([]);
  const [obraSeleccionado, setObraSeleccionado]=useState({ //Datos que se ponen en los inputs
    fecha_inicio: "",
    fecha_fin: "",
    obra_oc: ""
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setObraSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }


  const peticionGet1=async()=>{
    await axios.get(baseUrl+"/"+obraSeleccionado.fecha_inicio+"/"+obraSeleccionado.fecha_fin+"/"+obraSeleccionado.obra_oc, obraSeleccionado)
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionSuma = async() => {
    await axios.get(baseUrl+"/"+obraSeleccionado.fecha_inicio+"/"+obraSeleccionado.fecha_fin+"/"+obraSeleccionado.obra_oc+"/9", obraSeleccionado)
    .then(response=>{
      setSumas(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  function createDatos () {
    if(sumas[0].min_atraso.hours === undefined || sumas[0].min_atraso.hours === NaN){
      var atraso_horas = 0;
    } else{
    var atraso_horas = sumas[0].min_atraso.hours;
  }

  if(sumas[0].min_adicionales.hours === undefined || sumas[0].min_adicionales.hours === NaN){
    var adicionales_horas = 0;
  } else{
  var adicionales_horas = sumas[0].min_adicionales.hours;
}

    var atraso_minutos = sumas[0].min_atraso.minutes;
    var adicionales_minutos = sumas[0].min_adicionales.minutes;

    var atraso_ = atraso_horas * 60 + atraso_minutos;
    var adicionales_ = adicionales_horas * 60 + adicionales_minutos;
    var diferencia_ = 0;
    var rango_ = 15;
    var tramos_ = 0;
    var monto_ = 0;

    if (adicionales_ > atraso_ ) {
      diferencia_ = adicionales_ - atraso_;
      tramos_ = Math.floor(diferencia_ / rango_);
      monto_ = 0.5 * tramos_;
    } else {
      diferencia_ = "Minutos a favor";
    }

    const rows = [ atraso_, adicionales_, diferencia_, tramos_, monto_ ];

    console.log(rows);

    setRows(rows);
  }

  useEffect(()=>{
    peticionGet();
  }, [])


  return (
    <div className={classes.root}>

      <Grid item xs = {12}>
        <Navbar/>
      </Grid>

    
      <Card className = {classes.root}>
        <CardContent className = {classes.root}>
        <Card className = {classes.root}>
        <CardContent className = {classes.root}>
          <h3>Resumen</h3>
          <Grid container>
          <Grid item xs={12}>
            <h3 align = "center">Obra: {obraSeleccionado.obra_oc}</h3>
            <h4 align = "center">Impuntualidad Melón: {rows[0]} Minutos</h4>
            <h4 align = "center">Sobrestadía: {rows[1]} Minutos</h4>
            <h4 align = "center">Diferencia: {rows[2]}. ({rows[0] - rows[1]})Minutos</h4>
            <h4 align = "center">Tramos de 15min: {rows[3]}</h4>
            <h4 align = "center">Monto: {rows[4]} UF</h4>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<Receipt />}
              onClick={()=> createDatos()}
            >
              Calcular
            </Button>
          </Grid>
          </Grid>
          </CardContent>
      </Card>
        </CardContent>
      </Card>


      <Card className={classes.root}>
      <CardContent className = {classes.root}>
      <Card className = {classes.root}>
        <CardContent className = {classes.root}>
        <h3 align = "left">Filtros</h3>
        <Grid container spacing = {3}>

          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <TextField className={classes.textField}
            name="obra_oc"
            label="Obra: "
            onChange={handleChange}
            value={obraSeleccionado&&obraSeleccionado.obra_oc} />
          </Grid>

          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <TextField
              name="fecha_inicio"
              label="Desde: "
              type="date"
              defaultValue="2019-09-13"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              value={obraSeleccionado&&obraSeleccionado.fecha_inicio}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <TextField
              name="fecha_fin"
              label="Hasta: "
              type="date"
              defaultValue=""
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              value={obraSeleccionado&&obraSeleccionado.fecha_fin}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <Grid xs = {6} sm = {6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<FilterList />}
                onClick={()=> (peticionGet1(), peticionSuma())}
              >
                Filtrar
              </Button>
            </Grid>
            
            <Grid xs = {6} sm = {6}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<Close />}
                onClick={()=> peticionGet()}
              >
                Limpiar
              </Button>
            </Grid>
           
          </Grid>
        </Grid>
        </CardContent>
        </Card>
    </CardContent>
    </Card>
  
      <Card className={classes.root}>
      <CardContent>
        <Grid item xs = {12}>
          <MUIDataTable
            title={"Pedidos"}
            data={data}
            columns={columns}
            options={options}
          />
        </Grid>
      </CardContent>
    </Card>
    </div>
  );
}

export default App;

