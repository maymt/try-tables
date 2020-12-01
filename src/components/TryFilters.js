import React, { useState, useEffect } from 'react';
//import './App.css';
import MaterialTable from "material-table";
import axios from 'axios';
import {Grid, Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import FilterList from '@material-ui/icons/FilterList';

const columns= [
  { title: 'Obra', field: 'obra_oc' },
  { title: 'Fecha', field: 'fecha' },
  { title: 'Mes', field: 'mes', type: 'numeric'},
  { title: 'Atraso', field: 'atraso' },
  { title: 'Adicionales', field: 'adicionales'},
  { title: 'Monto', field: 'monto'}
];


const baseUrl="http://localhost:4000/tabla2";


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function TryFilters() {
  const styles= useStyles();
  const [data, setData]= useState([]);
  const [modalEditar, setModalEditar]= useState(false);
  const [obraSeleccionado, setObraSeleccionado]=useState({ //Datos que se ponen en los inputs
    obra_oc: "",
    mes: ""
  })

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
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionGet1 = async( ) => {
    await axios.get(baseUrl+"/"+obraSeleccionado.obra_oc, obraSeleccionado)
    .then(response => {
        setData(data.filter(mes=>data.mes!==obraSeleccionado.mes));
        abrirCerrarModalEditar();
      }).catch(error=>{
        console.log(error);
      })
  }
  
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  useEffect(()=>{
    peticionGet();
  }, [])


  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Obra</h3>
      <Grid>
        <TextField className={styles.inputMaterial} label="Obra" name="obra_oc" onChange={handleChange} value={obraSeleccionado&&obraSeleccionado.obra_oc}/>
      </Grid>
      <Grid>
        <TextField className={styles.inputMaterial} label="Mes" name="mes" type = 'numeric' onChange={handleChange} value={obraSeleccionado&&obraSeleccionado.mes}/>
      </Grid>
      <div align="right">
        <Button color="primary" onClick={()=> peticionGet1}>Buscar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button
            variant="contained"
            color="primary"
            className={styles.button}
            startIcon={<FilterList />}
            onClick = {() => abrirCerrarModalEditar()}
          > FILTRAR </Button>
      <br /><br />
        <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <MaterialTable
          columns={columns}
          data={data}
          title="Resumen Pedidos"  
        />

    </div>
  );
}

export default TryFilters;