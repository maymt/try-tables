import React, { useState, useEffect } from 'react';
import { CardContent, Grid , Card, Typography} from '@material-ui/core';
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
  card:{
    textAlign: 'center',
    padding: '50px',
    margin: '20px'
  },
  texto:{
      fontSize: 18,
      textAlign: 'left'
  },
  titulo:{
      fontWeight: 'bold',
      fontSize: 22,
  }
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

      <Grid container spacing = {3}>
        
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <Card className={classes.card}>
            <CardContent>

              <Typography className={classes.titulo}>
                Resumen
              </Typography>

              <br></br>
              
              <Typography className={classes.texto}>
                Obra:               {obraSeleccionado.obra_oc}
              </Typography>

              <Typography className={classes.texto}>
                Impuntualidad Melón: {rows[0]} Minutos
              </Typography>

              <Typography className={classes.texto}>
                Sobrestadía: {rows[1]} Minutos
              </Typography>

              <Typography className={classes.texto}>
                Diferencia: {rows[2]}. ({rows[0] - rows[1]})Minutos
              </Typography>

              <Typography className={classes.texto}>
                Tramos de 15min: {rows[3]}
              </Typography>

              <Typography className={classes.texto}>
                Monto: {rows[4]} UF
              </Typography>

                <br></br>
                <br></br>
              
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<Receipt />}
                  onClick={()=> createDatos()}
                  >
                  Calcular
              </Button>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
          <Card className={classes.card}>
            <CardContent>

              <Typography className={classes.titulo}>
                Filtros
              </Typography>
              
              <br></br>
              <br></br>
              <br></br>

            <Grid item xs={12}>
              <TextField className={classes.textField}
                name="obra_oc"
                label="Obra: "
                onChange={handleChange}
                value={obraSeleccionado&&obraSeleccionado.obra_oc}
              />

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

            <br></br>
            <br></br>
            <br></br>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<FilterList />}
                onClick={()=> (peticionGet1(), peticionSuma())}
              >
                Filtrar
              </Button>

              <h1>    </h1>

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

            </CardContent>
          </Card>
        </Grid>
        
      </Grid>

      <Grid item xs = {12}>
          <MUIDataTable
            title={"Pedidos"}
            data={data}
            columns={columns}
            options={options}
          />
      </Grid>
      
    </div>
  );
}

export default App;

