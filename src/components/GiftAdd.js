import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function GiftAdd({show, handleClose, giftCollection, setGiftCollection, action}) {
  const [newDesc, setNewDesc] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newQty, setNewQty] = useState(1)
  const [newOwner, setNewOwner] = useState('')

  const handleGiftAdd = (evt) => {
    evt.preventDefault()
    console.log("guardar")
    const searchGift = (item) => item.desc === action.editData.desc
    if(newDesc!==''){
      const newItem = {desc:newDesc, Qty:newQty, Img:newImage, Owner:newOwner}
      if (action.action==='add') {
        if(!giftCollection.some((element)=>{return element.desc===newDesc})){
          setGiftCollection([...giftCollection, newItem])
          handleClose()
        }
      }
      if (action.action==='edit') {
        if(!giftCollection.some((element)=>{return element.desc===newDesc}) || newDesc === action.editData.desc){
          const position = giftCollection.findIndex(searchGift)
          // setGiftCollection([...giftCollection].splice(position,1,newItem))
          const newGiftCollection = [...giftCollection]
          newGiftCollection.splice(position,1,newItem) // OJO no se puede asignar porque devuelve arreglo de eliminados
          setGiftCollection(newGiftCollection)
          handleClose()
        }
      }
    }
  }

  useEffect(()=>{
    if (action.action==='add' || action.action === undefined) {
      setNewDesc('')
      setNewImage('')
      setNewQty(1)
      setNewOwner('')
    } 
    if (action.action==='edit') {
      setNewDesc(action.editData.desc)
      setNewImage(action.editData.Img)
      setNewQty(action.editData.Qty)
      setNewOwner(action.editData.Owner || '')
    }
  },[action])


  const handleDescChg = (evt) => { setNewDesc(evt.target.value) }
  const handleImageChg = (evt) => { setNewImage(evt.target.value)}
  const handleQtyChg = (evt) => { setNewQty(evt.target.value)}
  const handleOwnerChg = (evt) => { setNewOwner(evt.target.value)}

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action.action==='edit'?'Editando ' + action.editData.desc:'Nuevo regalo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleGiftAdd}>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='form-group'>
                            <label htmlFor="modalDescripcion">Regalo</label>
                            <input 
                                id="modalDescripcion" 
                                className='form-control' 
                                onChange={handleDescChg} 
                                value={newDesc}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group'>
                            <label htmlFor="modalOwner">Destinatario</label>
                            <input 
                                id="modalOwner" 
                                className='form-control' 
                                onChange={handleOwnerChg} 
                                value={newOwner}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group'>
                            <label htmlFor="modalImagen">Imagen</label>
                            <input 
                                id="modalImagen" 
                                className='form-control' 
                                onChange={handleImageChg} 
                                value={newImage} 
                                />
                            </div>
                    </div>
                    <div className='row '>
                        <div className='col md-4'>
                            <div className='form-group'>
                                <label htmlFor="modalCantidad">Cantidad</label>
                                <input 
                                    id="modalCantidad" 
                                    className='form-control' 
                                    onChange={handleQtyChg} 
                                    value={newQty} 
                                    type="number" 
                                    min={1} 
                                    size={3} 
                                    />
                                </div>
                        </div>
                        <div className='col md-8'>
                            
                        </div>
                    </div>
                </div>
{/*                 <div className='form-group'>
                    <button className='btn btn-primary mb-2'>Agregar</button>
                </div>
 */}            
            </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGiftAdd}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

