import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function PurchaseList({regalos}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary mt-1 w-100" onClick={handleShow}>
        Previsualizar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title className="titulo">Comprar:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button className="w-100" variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Imprimir
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
