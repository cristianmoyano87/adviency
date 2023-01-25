import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup'
import { giftPropose, giftPutItem, giftPostItem } from '../services/apiGifts';

export function GiftForm({show, handleClose, giftCollection, setGiftCollection, action}) {
  const [newDesc, setNewDesc] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newQty, setNewQty] = useState(1)
  const [newOwner, setNewOwner] = useState('')
  const [newPriceUnit, setNewPriceUnit] = useState(0)

  const handleGiftProposal = () => {
    giftPropose((propose) => {
      setNewDesc(propose.desc)
      setNewImage(propose.Img)
    })
  }

  const handleGiftForm = (evt) => {
    evt.preventDefault()
    // const searchGift = (item) => item.desc === action.editData.desc
    if(newDesc!==''){
      const newItem = {desc:newDesc, Qty:newQty, Img:newImage, Owner:newOwner, PriceUnit:newPriceUnit}
      if (action.action==='add' || action.action==='duplicate') {
        if(!giftCollection.some((element)=>{return element.desc===newDesc})){
          //setGiftCollection([...giftCollection, newItem])
          giftPostItem(newItem, setGiftCollection)
          handleClose()
        }
      }
      if (action.action==='edit') {
        if(!giftCollection.some((element)=>{return element.desc===newDesc}) || newDesc === action.editData.desc){
          newItem['id'] = action.editData.id
          // const position = giftCollection.findIndex(searchGift)
          // const newGiftCollection = [...giftCollection]
          // newGiftCollection.splice(position,1,newItem) // OJO no se puede asignar el resultado del splice porque devuelve un arreglo de eliminados
          // setGiftCollection(newGiftCollection)
          giftPutItem(newItem, setGiftCollection)
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
      setNewPriceUnit(0)
    } 
    if (action.action==='edit' || action.action==='duplicate') {
      setNewDesc(action.editData.desc)
      setNewImage(action.editData.Img)
      setNewQty(action.editData.Qty)
      setNewOwner(action.editData.Owner || '')
      setNewPriceUnit(action.editData.PriceUnit || 0)
}
  },[action])

  const handleDescChg = (evt) => { setNewDesc(evt.target.value) }
  const handleImageChg = (evt) => { setNewImage(evt.target.value)}
  const handleQtyChg = (evt) => { setNewQty(evt.target.value)}
  const handleOwnerChg = (evt) => { setNewOwner(evt.target.value)}
  const handlePriceUnitChg = (evt) => { setNewPriceUnit(evt.target.value)}

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action.action==='edit'?'Editando ' + action.editData.desc:'Nuevo regalo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleGiftForm}>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='form-group'>
                          <label htmlFor="modalDescripcion">Regalo</label>
                          <InputGroup>
                              <input 
                                  id="modalDescripcion" 
                                  className='form-control' 
                                  onChange={handleDescChg} 
                                  value={newDesc}
                              />
                              <Button variant="outline-primary" onClick={handleGiftProposal}>
                                ¡ Sorprendeme !
                              </Button>
                          </InputGroup>
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
                    <div className='row'>
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
                    <div className='row'>
                        <div className='col md-4'>
                            <div className='form-group'>
                                <label htmlFor="modalPriceUnit">Precio Unitario</label>
                                <input 
                                    id="modalPriceUnit" 
                                    className='form-control' 
                                    onChange={handlePriceUnitChg} 
                                    value={newPriceUnit}
                                    type="number" 
                                    min={1} 
                                    step={0.1} 
                                    />
                                </div>
                        </div>
                        <div className='col md-8'>
                            
                        </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='form-group mark text-success'>
                        {newPriceUnit>0?`Subtotal: ${(newPriceUnit * newQty).toFixed(2)}`:''}
                      </div>
                    </div>
                    <div className='row text-muted mt-3'>
                      <div className='form-group'>
                        {action.action==='edit'?`id: ${action.editData.id}`:''}
                      </div>
                    </div>
                </div>
            </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGiftForm}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

