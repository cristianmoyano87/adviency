import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const handleSubmit = (evt) => {
    evt.preventDefault()
    if(newRegalo!==''){
      if(!regalos.some((element)=>{return element.desc===newRegalo}))
      setRegalos([...regalos, {desc:newRegalo, Qty:newQty, Img:newImage}])
      setNewRegalo('')
      setNewQty(1)
      setNewImage('')
    }
  }
  
  // Carga inicial de regalos desde localStorage cuando se inicia el componente
  const [regalos, setRegalos] = useState(JSON.parse(localStorage.getItem('giftsList')) || [{desc:'Medias',Qty:1, Img:''}, {desc:'Caramelos', Qty:1, Img:''}, {desc:'Vittel Tone', Qty:1, Img:''}])
  const [newRegalo, setNewRegalo] = useState('')
  const [newQty, setNewQty] = useState(1)
  const [newImage, setNewImage] = useState('')

  const handleChange = (evt) => { setNewRegalo(evt.target.value) }
  const handleChangeQty = (evt) => { setNewQty(evt.target.value) }
  const handleDelete = (borrar) => {
    const result = regalos.filter(regalo => regalo !== borrar)
    setRegalos(result)
  }
  const handleImage = (evt) => { setNewImage(evt.target.value) }

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

  return (
    <div className="App">
      <header className="App-header">
        <img className='fondo' src='cuento-arbol-navidad.jpg' alt='fondo'/>
        <p className="titulo">Regalos</p>
        <form onSubmit={handleSubmit}>
          <input id="descripcion" onChange={handleChange} value={newRegalo}/>
          <input id="imagen" onChange={handleImage} value={newImage} />
          <input id="cantidad" onChange={handleChangeQty} value={newQty} type="number" min={1} size={3} />
          <button>Agregar</button>
        </form>
        {/* {regalos.map(regalo => <p>{regalo}<button onClick={() => handleDelete(regalo)}><img alt="recycle" src="//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png"/></button></p>)} */}
        <ListaRegalos/>
        <BorrarLista/>
      </header>
    </div>
  );
}

export default App;
