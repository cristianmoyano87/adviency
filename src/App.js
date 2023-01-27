import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Snowfall from "react-snowfall";
import './App.css';
import { useEffect, useState } from 'react';
import { Trash3 } from "react-bootstrap-icons"
import { GiftForm } from './components/GiftForm';
import { ListaRegalos } from "./components/ListaRegalos";
import { giftGetAll, giftDeleteItem, giftDeleteAll } from "./services/apiGifts";
import { PurchaseList } from "./components/PurchaseList";
import { Music } from "./components/Music";

import snowLogo from "./snowflake.png"
import snowLogo2 from "./snowflake2.png"
const snowFlake = document.createElement('img', undefined)
snowFlake.src = snowLogo
const snowFlake2 = document.createElement('img', undefined)
snowFlake2.src = snowLogo2

const snowImages = [snowFlake, snowFlake2]

function App() {

  const [regalos, setRegalos] = useState([])

  const handleDelete = (item) => {
    giftDeleteItem(item.id, setRegalos)
  }

  const [action, setAction] = useState({})
  const handleEdit = (item) => {
    setAction({action:'edit', editData:item})
    handleShow()
  }
  
  const handleDuplicate = (item) => {
    setAction({action:'duplicate', editData:item})
    handleShow()
  }
  
  const handleAdd = () => {
    setAction({action:'add'})
    handleShow()
  }

  // Carga datos desde la API
  useEffect(()=>{
    giftGetAll(setRegalos)
  }, [])
  
  const BorrarLista = () => {
    return <button className="borrarTodo" onClick={() => handleBorrarLista()}>
      <Trash3/> Borrar todo
    </button>
  }

  const handleBorrarLista = () => {
    giftDeleteAll(setRegalos)
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <Snowfall
        snowflakeCount={50} 
        radius={[10, 20]}
        speed={[0.2, 2.0]}
        rotationSpeed={[-1, 1]}
        images={snowImages}
      />
      <header className="App-header">
        <img className='fondo' src='cuento-arbol-navidad.jpg' alt='fondo'/>
        <div className="d-flex justify-content-between">
          <p className="titulo">Regalos</p>
          <Music/>
        </div>
        <button className="giftForm" onClick={handleAdd}>Agregar Regalo</button>
        <ListaRegalos regalos={regalos} handleDelete={handleDelete} handleEdit={handleEdit} handleDuplicate={handleDuplicate}/>
        <BorrarLista/>
        <PurchaseList regalos={regalos}/>
        <GiftForm show={show} handleClose={handleClose} giftCollection={regalos} setGiftCollection={setRegalos} action={action}/>
      </header>
    </div>
  );
}

export default App;
