import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useReactToPrint } from 'react-to-print';

export function PurchaseList({regalos}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Lista de compras',
    onAfterPrint: ()=>handleClose()
  })

  return (
    <>
      <Button variant="secondary mt-1 w-100" onClick={handleShow}>
        Previsualizar
      </Button>

      <Modal id="plPreview" show={show} onHide={handleClose}>
        <Modal.Body ref={componentRef}>
          <p className='titulo'>Comprar:</p>
          <ul>
          {regalos.map(regalo => 
              <li key={regalo.id}>
              <div className="giftRow">
                  <div className="giftItem">
                      <img src={regalo.Img} className='imageList' alt={regalo.name}/>
                      <div>
                          <div>
                              {regalo.desc} {regalo.Qty>1?"("+regalo.Qty+")":""}
                          </div>
                          <div className="listOwner">
                              {regalo.Owner}
                          </div>
                      </div>
                  </div>
              </div>
              </li>
          )}    
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Imprimir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
