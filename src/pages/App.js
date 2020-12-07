import React, { useState, useEffect } from 'react';
import { CardContent, Grid , Card, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {FilterList, Receipt, Close} from '@material-ui/icons';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import Navbar from  '../components/Navbar';
import moment from 'moment';



const baseUrl="http://localhost:3001/";


const columnas = [
  { name: 'Fecha', label: 'Fecha', options: { filter: false, sort: false } },
  { name: 'cliente', label: 'Rut', options: { filter: false, sort: false } }, 
  { name: 'cliente_name', label: 'Razón Social', options: { filter: false, sort: false } }, 
  { name: 'obra', label: 'Cod. Obra', options: { filter: false, sort: false } }, 
  { name: 'obra_name', label: 'Nombre Obra', options: { filter: false, sort: false } }, 
  { name: 'pedido', label: 'Pedida', options: { filter: false, sort: false } }, 
  { name: 'tren_pedido', label: 'Tren Pedido', options: { filter: false, sort: false } }, 
  { name: 'posicion_en_tren', label: 'Posición Tren', options: { filter: false, sort: false } }, 
  { name: 'Guia_despacho', label: 'Guía Despacho', options: { filter: false, sort: false } }, 
  { name: 'planta', label: 'Planta', options: { filter: false, sort: true } }, 
  { name: 'producto_codigo', label: 'Cod. Producto', options: { filter: false, sort: false } }, 
  { name: 'producto', label: 'Producto', options: { filter: false, sort: false } }, 
  { name: 'm3', label: 'Volumen', options: { filter: true, sort: false, filterType: 'multiselect' } }, 
  { name: 'camion', label: 'Camión', options: { filter: false, sort: false } }, 
  { name: 'contratista', label: 'Contratista', options: { filter: false, sort: false }}, 
  { name: 'hora_solicitada_cliente_original', label: 'Hora Solicitada', options: { filter: false, sort: false } }, 
  { name: 'hora_solicitada_cliente_primer_despacho_de_tren', label: 'Hora 1er Tren', options: { filter: false, sort: false } }, 
  { name: 'hora_solicitada_cliente_corregida', label: 'Hora Corregida', options: { filter: false, sort: false } }, 
  { name: 'espaciamiento', label: 'Espaciamiento', options: { filter: false, sort: false } }, 
  { name: 'tiempo_viaje_vuelta_proyectado', label: 'Tiempo Ida', options: { filter: false, sort: false } }, 
  { name: 'tiempo_ida_vuelta_proyectado', label: 'Tiempo Vuelta', options: { filter: false, sort: false } }, 
  { name: 'hora_tiquete', label: 'Hora Tiquete', options: { filter: false, sort: false } }, 
  { name: 'hora_de_carga', label: 'Hora Inicio Carga', options: { filter: false, sort: false } }, 
  { name: 'hora_fin_de_carga', label: 'Hora Fin Carga', options: { filter: false, sort: false } }, 
  { name: 'hora_salida_de_planta', label: 'Hora Salida Planta', options: { filter: false, sort: false } }, 
  { name: 'hora_llegada_a_obra', label: 'Hora Llegada Obra', options: { filter: false, sort: false } }, 
  { name: 'hora_inicio_descarga', label: 'Hora Inicio Descarga', options: { filter: false, sort: false } }, 
  { name: 'hora_salida_a_planta', label: ' Hora Salida Obra', options: { filter: false, sort: false } },
  { name: 'hora_llegada_a_planta', label: 'Hora Llegada Planta', options: { filter: false, sort: false } },
  { name: 'direccion', label: 'Dirección', options: { filter: false, sort: false } }, 
  { name: 'cuadrante', label: 'Cuadrante', options: { filter: false, sort: false } }, 
  { name: 'anillo', label: 'Anillo', options: { filter: false, sort: false } }, 
  { name: 'costo_produccion', label: 'Costo Producción', options: { filter: false, sort: false } }, 
  { name: 'codigo_remosion_pedido', label: 'Cod. Remosión Pedido', options: { filter: true, sort: false, filterType: 'multiselect' } },
  { name: 'codigo_remosion_tren', label: 'Cod. Remosión Tren', options: { filter: true, sort: false, filterType: 'multiselect' } }, 
  { name: 'codigo_remosion_tren', label: 'Cod. Remosión Tren', options: { filter: true, sort: false, filterType: 'multiselect' } }, 
  { name: 'codigo_remosion_linea', label: 'Cod. Remosión Línea', options: { filter: true, sort: false, filterType: 'multiselect' } }, 
  { name: 'codigo_remosion_fuera_plazo', label: 'Cod. Remosión FP', options: { filter: true, sort: false, filterType: 'multiselect' } }, 
  { name: 'm3_a_botadero', label: 'M3 Botadero', options: { filter: true, sort: false, filterType: 'multiselect' } }, 
  { name: 'm3_a_redestino', label: 'M3 Redestino', options: { filter: true, sort: false, filterType: 'multiselect' } }
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
  button:{
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '20px'
  },
  card:{
    textAlign: 'center',
    padding: '10px',
    margin: '20px'
  },
  texto:{
      fontSize: 16,
      textAlign: 'left',
      fontWeight: 'medium'
  },
  titulo:{
      fontWeight: 'bold',
      fontSize: 22,
      marginBottom: '10px'
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
    var hoy = moment().get('year')+"-"+(moment().get('month') + 1)+"-"+(moment().get('day') - 1);
    hoy = moment(hoy, 'YYYY-MM-dd');
    hoy = hoy._i;

    var inicio = moment().subtract(1, 'months');
    var inicio = moment(inicio).get('year')+"-"+moment(inicio).get('month')+"-"+moment(inicio).get('day');
    inicio = moment(inicio, 'YYYY-MM-dd');
    inicio = inicio._i;
    
    await axios.get(baseUrl+"datos")
    // await axios.get(baseUrl+"/"+inicio+"/"+hoy)
    .then(response=>{
      // console.log(response.data)
      setData(response.data);
      console.log(data);
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

  // function setearDatos (data) {
  //   let x,y;
  //   //recorriendo la matriz
  //   for (x in data) {
  //     for (y in data[x]){
  //       console.log(data[x][17]);
  //       }
  //     }
  //   }
  //   setData(data);
  // }

  function filtrarDatos(data, fecha_inicio, fecha_fin, obra) {
    let x;
    
    const rows = [];

    var puntual = 0;
    var atraso = 0;
    var estadia_esperada = 0;
    var estadia_real = 0;
    var min_adicionales = 0;
    var min_diferencia = 0;
    var tramos = 0;
    var monto = 0;

    var i = 0;

    for (x in data){
      var solicitada = data[x][17]; //hora solicitada corregida.
      var llegada = data[x][25]; //hora de llegada a la obra.
      var salida = data[x][27]; // hora de salida de la obra.
      var estadia_esperada = 15 + data[x][12] * 6 + 10; //estadia esperada calculada en base al volumen pedido + los 15 minutos de posicionamiento.

      if (llegada !== null && salida !== null){
        solicitada = parseInt(solicitada.substring(0,2)) * 3600 + parseInt(solicitada.substring(3,6)) * 60 + parseInt(solicitada.substring(7,8));
        llegada = parseInt(llegada.substring(0,2)) * 3600 + parseInt(llegada.substring(3,6)) * 60 + parseInt(llegada.substring(7,8));
        salida = parseInt(salida.substring(0,2)) * 3600 + parseInt(salida.substring(3,6)) * 60 + parseInt(salida.substring(7,8));

        var estadia_real = (salida - llegada) / 60;

                
      if (Math.abs(llegada - solicitada) > 1800) {
        atraso =  Math.abs((llegada - solicitada) - 1800 ) / 60 ; //1800 s = 30 minutos rango puntualidad
        atraso = Math.ceil(atraso);
        puntual = "No";
      } else{
        atraso = 0;
        puntual = "Si";
      };

      console.log(puntual, atraso);
      

      if (data[x][3].includes(obra) && data[x][0] >= fecha_inicio && data[x][0] <= fecha_fin) {
        rows.push(data[x]); 
      }
      }
    setData(rows);
  }
}

  


  useEffect(()=>{
    peticionGet();
  }, [])


  return (
    <div className={classes.root}>

      <Grid item xs = {12}>
        <Navbar/>
      </Grid>


      <Grid container spacing = {0}>
        
        <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
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

        <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
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
                onClick={()=> filtrarDatos(data, obraSeleccionado.fecha_inicio, obraSeleccionado.fecha_fin, obraSeleccionado.obra_oc)}
              >
                Filtrar
              </Button>

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
        <Card className={classes.root}>
          <CardContent>
            <MUIDataTable
              title={"Pedidos"}
              data={data}
              columns={columnas}
              options={options}
            />
          </CardContent>
        </Card>
      </Grid>
      
    </div>
  );
}

export default App;

