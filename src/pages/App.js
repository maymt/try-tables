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



const baseUrl = "http://localhost:3001/";
// const baseUrl = "nobunaga:9999/apis_melon/data_despacho";

const urlGuardar="http://10.175.3.134:9999/apis_melon/ns_simulador/insertar/";
const urlSelect="http://10.175.3.134:9999/apis_melon/ns_simulador/select";


const columnas = [
  { name: 'Fecha', label: 'Fecha', options: { filter: false, sort: true } },
  { name: 'cliente', label: 'Rut', options: { filter: false, sort: false } }, 
  { name: 'cliente_name', label: 'Razón Social', options: { filter: false, sort: false } }, 
  { name: 'obra', label: 'Cod. Obra', options: { filter: false, sort: true } }, 
  { name: 'obra_name', label: 'Nombre Obra', options: { filter: false, sort: false } }, 
  { name: 'pedido', label: 'Pedido', options: { filter: false, sort: false } }, 
  // { name: 'tren_pedido', label: 'Tren Pedido', options: { filter: false, sort: false } }, 
  // { name: 'posicion_en_tren', label: 'Posición Tren', options: { filter: false, sort: false } }, 
  { name: 'Guia_despacho', label: 'Guía Despacho', options: { filter: false, sort: false } }, 
  { name: 'planta', label: 'Planta', options: { filter: false, sort: true } }, 
  // { name: 'producto_codigo', label: 'Cod. Producto', options: { filter: false, sort: false } }, 
  { name: 'producto', label: 'Producto', options: { filter: false, sort: false } }, 
  { name: 'm3', label: 'Volumen', options: { filter: true, sort: false, filterType: 'multiselect' } }, 
  // { name: 'camion', label: 'Camión', options: { filter: false, sort: false } }, 
  // { name: 'contratista', label: 'Contratista', options: { filter: false, sort: false }}, 
  { name: 'hora_solicitada_cliente_original', label: 'Hora Solicitada', options: { filter: false, sort: false } }, 
  { name: 'hora_solicitada_cliente_primer_despacho_de_tren', label: 'Hora 1er Tren', options: { filter: false, sort: false } }, 
  { name: 'hora_solicitada_cliente_corregida', label: 'Hora Corregida', options: { filter: false, sort: false } }, 
  { name: 'espaciamiento', label: 'Espaciamiento', options: { filter: false, sort: false } }, 
  // { name: 'tiempo_viaje_vuelta_proyectado', label: 'Tiempo Ida', options: { filter: false, sort: false } }, 
  // { name: 'tiempo_ida_vuelta_proyectado', label: 'Tiempo Vuelta', options: { filter: false, sort: false } }, 
  // { name: 'hora_tiquete', label: 'Hora Tiquete', options: { filter: false, sort: false } }, 
  // { name: 'hora_de_carga', label: 'Hora Inicio Carga', options: { filter: false, sort: false } }, 
  // { name: 'hora_fin_de_carga', label: 'Hora Fin Carga', options: { filter: false, sort: false } }, 
  // { name: 'hora_salida_de_planta', label: 'Hora Salida Planta', options: { filter: false, sort: false } }, 
  { name: 'hora_llegada_a_obra', label: 'Hora Llegada Obra', options: { filter: false, sort: false, filterType: 'multiselect'} }, 
  // { name: 'hora_inicio_descarga', label: 'Hora Inicio Descarga', options: { filter: false, sort: false } }, 
  { name: 'hora_salida_a_planta', label: ' Hora Salida Obra', options: { filter: false, sort: false } },
  // { name: 'hora_llegada_a_planta', label: 'Hora Llegada Planta', options: { filter: false, sort: false } },
  { name: 'direccion', label: 'Dirección', options: { filter: false, sort: false } }, 
  // { name: 'cuadrante', label: 'Cuadrante', options: { filter: false, sort: false } }, 
  // { name: 'anillo', label: 'Anillo', options: { filter: false, sort: false } }, 
  // { name: 'costo_produccion', label: 'Costo Producción', options: { filter: false, sort: false } }, 
  { name: 'codigo_remosion_pedido', label: 'Cod. Remosión Pedido', options: { filter: true, sort: false, filterType: 'multiselect' } },
  { name: 'codigo_remosion_tren', label: 'Cod. Remosión Tren', options: { filter: false, sort: false } }, 
  { name: 'codigo_remosion_tren', label: 'Cod. Remosión Tren', options: { filter: false, sort: false } }, 
  { name: 'codigo_remosion_linea', label: 'Cod. Remosión Línea', options: { filter: false, sort: false } }, 
  { name: 'codigo_remosion_fuera_plazo', label: 'Cod. Remosión FP', options: { filter: false, sort: false, filterType: 'multiselect' } }, 
  // { name: 'm3_a_botadero', label: 'M3 Botadero', options: { filter: false, sort: false } }, 
  // { name: 'm3_a_redestino', label: 'M3 Redestino', options: { filter: false, sort: true } },
  { name: 'puntual', label: '¿Puntual?', options: { filter: true, sort: false } }, 
  { name: 'atraso', label: 'Atraso', options: { filter: true, sort: false } }, 
  { name: 'estadia_esperada', label: 'Estadía Esperada', options: { filter: true, sort: false } }, 
  { name: 'estadia_real', label: 'Estadía Real', options: { filter: true, sort: false } },
  { name: 'min_adicionales', label: 'Minutos Sobrestadía', options: { filter: true, sort: false } }, 
  // { name: 'min_diferencia', label: 'Total Minutos', options: { filter: true, sort: false } }, 
  // { name: 'tramos', label: 'Tramos', options: { filter: true, sort: false } }, 
  // { name: 'monto', label: 'Monto', options: { filter: true, sort: false } }
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
  const [resumen, setResumen] = useState([]);
  const [facturado, setFacturado] = useState([]);
  
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
    inicio = moment(inicio).get('year')+"-"+moment(inicio).get('month')+"-"+moment(inicio).get('day');
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
    var resumen = [];
    setResumen(resumen);
  }

  function filtrarDatos(data, fecha_inicio, fecha_fin, obra) { //filtra los datos por obra y fecha, genera los datos del resumen
    let x;
    
    const rows = []; // pedidos de la obra y fechas seleccionadas
    var resumen = []; // datos tabla resumenº

    var adicionales_suma = 0; //suma de los minutos adicionales
    var atraso_suma = 0; //suma de los minutos de atraso
    var diferencia = 0; //diferencia entre atrasos y minutos adicionales.
    var tramos = 0; // tramos de 15 minutos en la diferencia
    var monto = 0; // monto que se debería facturar

    var puntual = 0;
    var atraso = 0;
    var estadia_esperada = 0;
    var estadia_real = 0;
    var min_adicionales = 0;
    var min_diferencia = 0;

    for (x in data){
      if (data[x][3] !== null) {
        
        if ((data[x][3].includes(obra) && data[x][0] >= fecha_inicio && data[x][0] <= fecha_fin) || (data[x][3].includes(obra) && data[x][0] === fecha_inicio)) {
          // console.log(data[x]);
          // data[x].splice(6,1);
          // console.log(data[x]);
          rows.push(data[x]);
          
          var solicitada = data[x][10]; //hora solicitada original.
          var llegada = data[x][14]; //hora de llegada a la obra.
          var salida = data[x][15]; // hora de salida de la obra.
          estadia_esperada = 15 + data[x][9] * 6 + 10; //estadia esperada calculada en base al volumen pedido + los 15 minutos de posicionamiento y 10 min de lavado.

          if (solicitada !== null && llegada !== null && salida !== null) {
            solicitada = parseInt(solicitada.substring(0,2)) * 3600 + parseInt(solicitada.substring(3,6)) * 60 + parseInt(solicitada.substring(7,8));
            llegada = parseInt(llegada.substring(0,2)) * 3600 + parseInt(llegada.substring(3,6)) * 60 + parseInt(llegada.substring(7,8));
            salida = parseInt(salida.substring(0,2)) * 3600 + parseInt(salida.substring(3,6)) * 60 + parseInt(salida.substring(7,8));

            estadia_real = Math.ceil((salida - llegada) / 60);

            if (Math.abs(llegada - solicitada) > 1800) {
              atraso =  Math.abs((llegada - solicitada) - 1800 ) ; //1800 s = 30 minutos rango puntualidad
              atraso = Math.ceil(atraso / 60);
              atraso_suma = atraso_suma + atraso;
              puntual = "No";
    
    
            } else{
              atraso = 0;
              puntual = "Si";
            };

            if (estadia_real > estadia_esperada && puntual === "Si"){
              min_adicionales = estadia_real - estadia_esperada;
              min_adicionales = Math.ceil(min_adicionales);
              adicionales_suma = adicionales_suma + min_adicionales;
            } else {
              min_adicionales = 0;
            }
      
            if (min_adicionales > atraso) {
              min_diferencia = min_adicionales - atraso;
            } else {
              min_diferencia = (atraso - min_adicionales);
              min_diferencia = min_diferencia + " Minutos a favor";
            }
      
            // console.log("Puntual? : ", puntual, " - Atraso: ", atraso, " - Adicionales: ", min_adicionales);      
          };
        };
      }

      if (estadia_real > estadia_esperada) {
        var sobrestadia = estadia_real - estadia_esperada;
      } else {
        var sobrestadia = 0;
      }
      data[x].push(puntual);  
      data[x].push(atraso);
      data[x].push(estadia_esperada);
      data[x].push(estadia_real);
      data[x].push(sobrestadia);
    };

    setData(rows);

    // console.log("Impuntualidad: ", atraso_suma, " - Sobrestadia: ", adicionales_suma, " - Tramos: ", tramos, " - Monto = ", monto);
    
    if (adicionales_suma > atraso_suma) {
      diferencia = (adicionales_suma - atraso_suma) + " Minutos";
      tramos = Math.floor((adicionales_suma - atraso_suma) / 15);
      monto = tramos * 0.5;
    } else {
      diferencia = "Acumula " + (atraso_suma - adicionales_suma) + " minutos en su próximo pedido";
      tramos = 0;
      monto = 0;
    }

    resumen = [ obra, atraso_suma, adicionales_suma, diferencia, tramos, monto ];
    
    setResumen(resumen);
    // console.log(resumen);
  }


  const guardarFacturado = async()=>{
    await axios.get(urlGuardar + resumen[0] + "/" + resumen[5] + "/" + resumen[3])
  }
  // console.log(urlGuardar + resumen[0] + "/" + resumen[5]);

  function getFacturado (obra) {
    const select = async()=>{
      await axios.get(urlSelect)
      .then(response=>{
        setFacturado(response.data);
      })
    }
    
    let x;
    var fechasObra = [];

    for (x in facturado) {
      if ( facturado[x][1] === obra ){
        fechasObra.push(facturado[x][1]);
      }
    }

    setFacturado(fechasObra[fechasObra.length -1]);
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
                Obra:               {resumen[0]}
              </Typography>

              <Typography className={classes.texto}>
                Impuntualidad Melón: {resumen[1]} Minutos
              </Typography>

              <Typography className={classes.texto}>
                Sobrestadía: {resumen[2]} Minutos
              </Typography>

              <Typography className={classes.texto}>
                Diferencia: {resumen[3]}
              </Typography>

              <Typography className={classes.texto}>
                Tramos de 15min: {resumen[4]}
              </Typography>

              <Typography className={classes.texto}>
                Monto: {resumen[5]} UF
              </Typography>
              
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<Receipt />}
                  onClick={()=> guardarFacturado()}
                  >
                  Facturado
              </Button>

              <Typography className={classes.texto}>
                Última Facturación: {()=> getFacturado(resumen[0])}
              </Typography>

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
                onClick={()=> (filtrarDatos(data, obraSeleccionado.fecha_inicio, obraSeleccionado.fecha_fin, obraSeleccionado.obra_oc), getFacturado(obraSeleccionado.obra_oc)) }
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