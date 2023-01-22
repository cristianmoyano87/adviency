import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import './App.css';
import { useEffect, useState } from 'react';
import { GiftForm } from './components/GiftForm';
import { ListaRegalos } from "./components/ListaRegalos";
import { giftGetAll, giftDeleteItem } from "./services/apiGifts";


function App() {

  // Carga inicial de regalos desde localStorage cuando se inicia el componente
  const [regalos, setRegalos] = useState([]) // JSON.parse(localStorage.getItem('giftsList')) ||

  const handleDelete = (item) => {
    // const result = regalos.filter(regalo => regalo !== item)
    // setRegalos(result)
    giftDeleteItem(item.id, setRegalos)
  }

  const [action, setAction] = useState({})
  const handleEdit = (item) => {
    setAction({action:'edit', editData:item})
    handleShow()
  }
  const handleAdd = () => {
    setAction({action:'add'})
    handleShow()
  }

  // Actualiza localStorage cuando cambia "regalos"
  useEffect(()=>{
    localStorage.setItem('giftsList', JSON.stringify(regalos))
  },[regalos])

  // Carga datos desde la API
  useEffect(()=>{
    giftGetAll((giftsList)=>{
      setRegalos(giftsList)
    })
  }, [])
  
  const BorrarLista = () => {
    return <button className="borrarTodo" onClick={() => handleBorrarLista()}>
      <img alt="trash" src="//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png"/>
      Borrar todo
    </button>
  }

  const handleBorrarLista = () => {
    setRegalos([])
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <header className="App-header">
        <img className='fondo' src='cuento-arbol-navidad.jpg' alt='fondo'/>
        <p className="titulo">Regalos</p>
        <button className="giftForm" onClick={handleAdd}>Agregar Regalo</button>
        <ListaRegalos regalos={regalos} handleDelete={handleDelete} handleEdit={handleEdit}/>
        <BorrarLista/>
        <GiftForm show={show} handleClose={handleClose} giftCollection={regalos} setGiftCollection={setRegalos} action={action}/>
      </header>
    </div>
  );
}

export default App;
