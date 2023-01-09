import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import './App.css';
import { useEffect, useState } from 'react';
import { GiftAdd } from './components/GiftAdd';

function App() {

  // Carga inicial de regalos desde localStorage cuando se inicia el componente
  const [regalos, setRegalos] = useState(JSON.parse(localStorage.getItem('giftsList')) || [{desc:'Medias',Qty:1, Img:''}, {desc:'Caramelos', Qty:1, Img:''}, {desc:'Vittel Tone', Qty:1, Img:''}])

  const handleDelete = (borrar) => {
    const result = regalos.filter(regalo => regalo !== borrar)
    setRegalos(result)
  }
  
  // Actualiza localStorage cuando cambia "regalos"
  useEffect(()=>{
    localStorage.setItem('giftsList', JSON.stringify(regalos))
  },[regalos])

  const ListaRegalos = () => {
    if(regalos.length===0) {
      return <h3>No hay regalos, suma uno</h3>
    }
    return <>
    <ul>
      {regalos.map(regalo => 
        <li key={regalo.desc}>
          <img src={regalo.Img} className='imageList' alt={regalo.name}/>
          {regalo.desc} {regalo.Qty>1?"x"+regalo.Qty:""}
          <button onClick={() => handleDelete(regalo)}>
            <img alt="trash" src="//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png"/>
          </button>
        </li>
      )}    
    </ul>
    </>
  }

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
        <button className="giftAdd" onClick={() => handleShow()}>
          Agregar Regalo
        </button>
        <ListaRegalos/>
        <BorrarLista/>
        <GiftAdd show={show} handleClose={handleClose} giftCollection={regalos} setGiftCollection={setRegalos}/>
      </header>
    </div>
  );
}

export default App;
